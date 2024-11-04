import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
export const ConnectButton = () => {
  return (
    <motion.div
      className="text-center"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <WalletMultiButton />
    </motion.div>
  );
};
