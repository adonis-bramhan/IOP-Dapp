import Web3 from 'web3';
import IoPRegistration from './artifacts/contracts/IoPRegistration.sol/IoPRegistration.json';

const web3 = new Web3(window.ethereum);
const contractAddress = "0xb29fd8Cd1a724C8E97756f12D084c60c46c12648"; // Replace with deployed contract address


const contract = new web3.eth.Contract(IoPRegistration.abi, contractAddress);

// Register function
export const register = async (stkaAddress, passwordHash, mXR) => {
  try {
    const response = await contract.methods.register(stkaAddress, passwordHash, mXR).send({ from: stkaAddress });
    console.log("Registration successful:", response);
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

// Authenticate function
export const authenticate = async (stkaAddress, stkbAddress, authHashA, authHashB) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp
    const response = await contract.methods.authenticate(stkaAddress, stkbAddress, authHashA, authHashB).call();
    console.log("Authentication successful:", response);
    return response; // Returns session tokens
  } catch (error) {
    console.error("Error during authentication:", error);
  }
};
