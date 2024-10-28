import { ConnectKitButton } from "connectkit";
import { motion } from "framer-motion";
import truncateEthAddress from "truncate-eth-address";

export const ConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        return (
          <motion.div
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <button
              onClick={show}
              className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 
                        px-8 py-4 rounded-lg font-bold text-xl shadow-lg 
                        transform hover:scale-105 transition-transform"
            >
              {isConnected ? truncateEthAddress(address) : "🎅 Connect Wallet "}
            </button>
          </motion.div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
