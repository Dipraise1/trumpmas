/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConnectButton } from "../components/ConnectButton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import SpinWheel from "../components/SpinWheel";
import TestSpin from "../components/TestSpin";
import "@solana/wallet-adapter-react-ui/styles.css";

const SnowflakeBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-white opacity-50"
        initial={{
          top: -20,
          left: Math.random() * 100 + "vw",
        }}
        animate={{
          top: "100vh",
          left: `${Math.random() * 100}vw`,
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        ❄
      </motion.div>
    ))}
  </div>
);

const TrumpMascot = ({ isSpinning, hasWon }) => (
  <motion.div
    className="absolute bottom-4 right-4 w-32 h-32"
    animate={
      hasWon
        ? {
            y: [-10, 10],
            rotate: [-5, 5],
            scale: [1, 1.1],
          }
        : isSpinning
        ? { rotate: [0, 10, -10, 10, 0] }
        : { y: [-5, 5] }
    }
    transition={{
      duration: hasWon ? 0.5 : 2,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    <img
      src="/1 (1)@2x.png"
      alt="Trump Mascot"
      className="w-full h-full object-contain"
    />
  </motion.div>
);

const HomePage = () => {
  const [stakedAmount, setStakedAmount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [userTier, setUserTier] = useState("standard");
  const [hasWon, setHasWon] = useState(false);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const isConnected = useMemo(
    () => (!connection || !publicKey ? false : true),
    [connection, publicKey]
  );

  const rewards = useMemo(
    () => [
      { label: "50 Tokens", probability: 0.5, color: "#D42C2C" },
      { label: "Basic NFT", probability: 0.2, color: "#2C8A3D" },
      { label: "150 Tokens", probability: 0.15, color: "#D42C2C" },
      { label: "Rare NFT", probability: 0.1, color: "#2C8A3D" },
      { label: "500 Tokens", probability: 0.04, color: "#D4AF37" },
      { label: "Ultra NFT", probability: 0.01, color: "#D4AF37" },
    ],
    []
  );

  const handleStake = (amount) => {
    setStakedAmount(amount);
    if (amount >= 500) setUserTier("vip");
    else if (amount >= 250) setUserTier("premium");
    else setUserTier("standard");

    toast.success(`🎄 Successfully staked ${amount} tokens!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2f4c] to-[#17263b] text-white p-6 relative overflow-hidden">
      <SnowflakeBackground />
      <ToastContainer theme="dark" />

      {/* Christmas Decorations */}
      <div className="absolute top-0 left-0 w-full h-16 bg-[url('/api/placeholder/1920/64')] opacity-50" />
      {/* <TestSpin /> */}
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-green-500 to-red-500">
            Trumpmas Spin & Win
          </h1>
          <div className="text-xl text-green-400">
            🎄 Make Christmas Great Again! 🎄
          </div>
        </motion.div>

        {!isConnected ? (
          <ConnectButton />
        ) : (
          <div>
            <div className="mb-8">
              <ConnectButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-[#243b55] p-6 rounded-lg shadow-xl border border-[#2a4665]"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-green-400">
                  🎄 Stake Your Tokens
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-[#1a2f4c] p-4 rounded-lg">
                    <span>Current Stake:</span>
                    <span className="font-mono text-yellow-400">
                      {stakedAmount} Tokens
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-[#1a2f4c] p-4 rounded-lg">
                    <span>Your Tier:</span>
                    <span className="capitalize font-bold">
                      {userTier === "vip" && "🌟 "}
                      <span
                        className={
                          userTier === "vip"
                            ? "text-yellow-400"
                            : userTier === "premium"
                            ? "text-green-400"
                            : "text-white"
                        }
                      >
                        {userTier}
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[100, 250, 500].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleStake(amount)}
                        className={`bg-gradient-to-r ${
                          amount === 500
                            ? "from-yellow-500 to-yellow-600"
                            : amount === 250
                            ? "from-green-500 to-green-600"
                            : "from-blue-500 to-blue-600"
                        } hover:from-opacity-80 hover:to-opacity-80 
                      px-4 py-3 rounded-lg font-bold transform hover:scale-105 transition-transform`}
                      >
                        {amount === 500 && "🌟 "}
                        Stake {amount}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              <SpinWheel
                setHasWon={setHasWon}
                isSpinning={isSpinning}
                setIsSpinning={setIsSpinning}
              />
            </div>
          </div>
        )}

        <motion.div
          className="mt-8 bg-[#243b55] p-6 rounded-lg shadow-xl border border-[#2a4665]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-red-400">
            🎁 Reward Chances
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <motion.div
                key={reward.label}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: reward.color + "22" }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-semibold">{reward.label}</span>
                <span className="bg-black bg-opacity-30 px-2 py-1 rounded ml-1">
                  {(reward.probability * 100).toFixed(1)}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <TrumpMascot isSpinning={isSpinning} hasWon={hasWon} />
    </div>
  );
};

export default HomePage;
