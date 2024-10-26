import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStaking } from '../context/StakingContext';
import { useStakingOperations } from '../hooks/useStaking';

const StakingForm = () => {
  const { state } = useStaking();
  const { stake, unstake, loading, error } = useStakingOperations();
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('stake');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokenAmount = parseFloat(amount);
    
    if (isNaN(tokenAmount) || tokenAmount <= 0) return;

    if (action === 'stake') {
      await stake(tokenAmount);
    } else {
      await unstake(tokenAmount);
    }

    setAmount('');
  };

  const predefinedAmounts = [100, 250, 500];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#243b55] p-6 rounded-lg border border-[#2a4665]"
    >
      <h2 className="text-2xl font-bold mb-6 text-green-400">🎄 Stake Your Tokens</h2>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span>Current Stake:</span>
          <span className="font-mono text-yellow-400">
            {state.stakedAmount} Tokens
          </span>
        </div>
        <div className="flex justify-between">
          <span>Your Tier:</span>
          <span className={`font-bold ${
            state.stakingTier === 'vip' 
              ? 'text-yellow-400' 
              : state.stakingTier === 'premium'
                ? 'text-green-400'
                : 'text-white'
          }`}>
            {state.stakingTier.toUpperCase()}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setAction('stake')}
            className={`flex-1 py-2 rounded-lg ${
              action === 'stake' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Stake
          </button>
          <button
            type="button"
            onClick={() => setAction('unstake')}
            className={`flex-1 py-2 rounded-lg ${
              action === 'unstake' 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Unstake
          </button>
        </div>

        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            className="w-full bg-[#1a2f4c] border border-[#2a4665] rounded-lg px-4 py-2 text-white placeholder-gray-400"
            min="0"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {predefinedAmounts.map((presetAmount) => (
            <button
              key={presetAmount}
              type="button"
              onClick={() => setAmount(presetAmount.toString())}
              className="bg-[#1a2f4c] hover:bg-[#2a4665] px-4 py-2 rounded-lg transition-colors"
            >
              {presetAmount}
            </button>
          ))}
        </div>

        {error && (
          <div className="text-red-400 text-sm mt-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !amount}
          className={`w-full py-3 rounded-lg font-bold transition-all ${
            loading || !amount
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
          }`}
        >
          {loading ? 'Processing...' : `${action === 'stake' ? 'Stake' : 'Unstake'} Tokens`}
        </button>
      </form>
    </motion.div>
  );
};

export default StakingForm;