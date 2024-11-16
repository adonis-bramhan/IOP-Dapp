module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*", // Match any network id
      },
      rinkeby: { // Example for a testnet
        provider: () =>
          new HDWalletProvider(
            "YOUR_MNEMONIC", // Replace with your mnemonic
            "https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID"
          ),
        network_id: 4, // Rinkeby's id
        gas: 5500000, // Gas limit
      },
    },
    compilers: {
      solc: {
        version: "0.8.0",
      },
    },
  };
  