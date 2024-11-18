require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    holesky: {
      url: "https://holesky.infura.io/v3/c24d9a2ccf734e4a94ec82cea6e91e5e", // Replace with your Infura Project ID
      accounts: [
        "f4dcb8d86b7d2308d195cfff326cb75e10ed7633c80204a46e8bb8e608a84e0e", // Replace with your wallet's private key
      ],
      chainId: 17000, // Holesky Chain ID
    },
  },
};
