/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getRandomFloat(min, max) {
  const randomFloat = (Math.random() * (max - min) + min).toFixed(1);
  return parseFloat(randomFloat);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rewards = [
  { label: "50 Tokens", probability: 0.5, color: "#D42C2C" },
  { label: "Basic NFT", probability: 0.2, color: "#2C8A3D" },
  { label: "150 Tokens", probability: 0.15, color: "#D42C2C" },
  { label: "Rare NFT", probability: 0.1, color: "#2C8A3D" },
  { label: "500 Tokens", probability: 0.04, color: "#D42C2C" },
  { label: "Ultra NFT", probability: 0.01, color: "#2C8A3D" },
];

const getRandomReward = () => {
  const rand = Math.random();
  let cumulativeProbability = 0;

  for (const reward of rewards) {
    cumulativeProbability += reward.probability;
    if (rand < cumulativeProbability) {
      return reward;
    }
  }
  return rewards[0]; // Fallback
};

export default function SpinWheel({
  selectedReward,
  setSelectedReward,
  isSpinning,
  setIsSpinning,
  wheelRotation,
  setWheelRotation,
  setHasWon,
}) {
  const controls = useAnimation();

  const spinWheel = useCallback(async () => {
    setHasWon(false);
    setSelectedReward(null);
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedReward(null);
    const reward = getRandomReward();
    const index = rewards.findIndex((r) => r.label === reward.label);
    const segmentAngle = 360 / rewards.length;
    const rewardAngle =
      index * segmentAngle + segmentAngle / getRandomFloat(1.1, 9.9);
    const cycles = getRandomInt(4, 11);
    const fullRotation = 360 * cycles;
    const stopRotation = fullRotation + rewardAngle;
    await controls.start({
      rotate: stopRotation,
      transition: { duration: 5, ease: "easeOut" },
    });
    setWheelRotation(stopRotation % 360);
    setSelectedReward(reward);
    setIsSpinning(false);
    setHasWon(true);
    toast.success(`🎄 Congrats you won ${reward.label}`);
  }, [
    isSpinning,
    controls,
    setIsSpinning,
    setSelectedReward,
    setWheelRotation,
    setHasWon,
  ]);

  return (
    <motion.div
      className="relative"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <div className="relative w-80 h-80 mx-auto">
        {/* Wheel with Conic Gradient Background */}
        <motion.div
          className="w-full h-full rounded-full relative shadow-xl"
          style={{
            background: `conic-gradient(${rewards
              .map(
                (reward, index) =>
                  `${reward.color} ${(index * 100) / rewards.length}% ${
                    ((index + 1) * 100) / rewards.length
                  }%`
              )
              .join(", ")})`,
          }}
          animate={controls}
          initial={{ rotate: wheelRotation }}
        >
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="absolute w-full h-full flex items-center justify-center"
              style={{
                transform: `rotate(${(index * 360) / rewards.length}deg)`,
                transformOrigin: "center",
              }}
            >
              <span
                className="inline-block transform origin-center text-sm font-bold"
                style={{
                  color: "#fff",
                  transform: `rotate(${
                    180 / rewards.length
                  }deg) translateY(-60px)`,
                  writingMode: "vertical-rl",
                  textAlign: "center",
                }}
              >
                {reward.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
          <div className="w-4 h-8 bg-yellow-400 rounded-b-lg" />
        </div>

        {/* Spin Button */}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          w-24 h-24 rounded-full font-bold text-lg text-center
          ${
            isSpinning
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-green-500 cursor-pointer"
          }
          shadow-lg border-4 border-white transition-transform duration-200`}
          style={{ position: "absolute" }}
        >
          {isSpinning ? "🎄" : "SPIN!"}
        </button>
      </div>
      {selectedReward && (
        <div className="text-center mt-4 text-lg font-semibold">
          You won: {selectedReward.label}
        </div>
      )}
    </motion.div>
  );
}
