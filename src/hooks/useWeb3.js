import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useStaking } from '../context/StakingContext';

export const useWeb3 = () => {
  const { dispatch } = useStaking();
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to use this feature');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setProvider(provider);
      setSigner(signer);
      dispatch({ type: 'CONNECT_WALLET', payload: address });
      
      return { provider, signer, address };
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    dispatch({ type: 'DISCONNECT_WALLET' });
  };

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        dispatch({ type: 'CONNECT_WALLET', payload: accounts[0] });
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  return {
    provider,
    signer,
    connectWallet,
    disconnectWallet,
    error,
  };
};