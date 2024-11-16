const { ethers } = require("ethers");
const IoPRegistration = require("../build/contracts/IoPRegistration.json");

const verifyStakeholder = async (idStkX, pwStkX, mXR) => {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
  const signer = provider.getSigner();
  const contractAddress = "DEPLOYED_CONTRACT_ADDRESS";
  const contract = new ethers.Contract(contractAddress, IoPRegistration.abi, signer);

  try {
    const isAuthenticated = await contract.authenticate(idStkX, pwStkX, mXR);
    console.log("Authentication result:", isAuthenticated);
  } catch (error) {
    console.error("Authentication failed:", error);
  }
};

module.exports = { verifyStakeholder };
