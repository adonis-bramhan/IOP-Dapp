// src/utils/connectWallet.js

import getWeb3 from './web3';

const connectMetaMask = async () => {
  const web3Instance = await getWeb3();
  return web3Instance;
};

export default connectMetaMask;
