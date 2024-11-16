const { ethers } = require("ethers");
const IoPRegistration = require("../build/contracts/IoPRegistration.json");

const registerStakeholder = async (idStkX, pwStkX, mXR) => {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
  const signer = provider.getSigner();
  const contractAddress = "DEPLOYED_CONTRACT_ADDRESS";
  const contract = new ethers.Contract(contractAddress, IoPRegistration.abi, signer);

  try {
    const tx = await contract.register(idStkX, pwStkX, mXR);
    await tx.wait();
    console.log("Stakeholder registered successfully!");
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

module.exports = { registerStakeholder };
