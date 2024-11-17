const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const IoPRegistration = await hre.ethers.getContractFactory("IoPRegistration");

    // Deploy the contract
    const contract = await IoPRegistration.deploy();

    // Wait for the deployment to complete
    await contract.deployed();

    console.log("IoPRegistration deployed to:", contract.address);
}

// Boilerplate to handle errors and run the script
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
