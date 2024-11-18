// src/utils/web3.js

import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

let web3;

const getWeb3 = async () => {
  const provider = await detectEthereumProvider();

  if (provider) {
    web3 = new Web3(provider);
    // Request account access if needed
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('User denied account access');
      }
    }
  } else {
    console.error('MetaMask not detected. Please install MetaMask.');
  }
  return web3;
};

export default getWeb3;
