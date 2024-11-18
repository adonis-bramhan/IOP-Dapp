import React, { useEffect, useState } from "react";
import Web3 from "web3";
import './App.css';  // Import the CSS file for styling

// Manually include the ABI from the contract
const IoPRegistrationABI = [{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "stkX",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "bytes32",
      "name": "pStkX",
      "type": "bytes32"
    },
    {
      "indexed": false,
      "internalType": "bytes32",
      "name": "skStkX",
      "type": "bytes32"
    },
    {
      "indexed": false,
      "internalType": "bytes32",
      "name": "pidStkX",
      "type": "bytes32"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "mXR",
      "type": "uint256"
    }
  ],
  "name": "StakeholderRegistered",
  "type": "event"
},
{
  "inputs": [
    {
      "internalType": "string",
      "name": "idStkX",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "pwStkX",
      "type": "string"
    }
  ],
  "name": "registerStakeholder",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "stakeholders",
  "outputs": [
    {
      "internalType": "bytes32",
      "name": "pStkX",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "skStkX",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "pidStkX",
      "type": "bytes32"
    },
    {
      "internalType": "bytes32",
      "name": "cStkX",
      "type": "bytes32"
    },
    {
      "internalType": "uint256",
      "name": "mXR",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "string",
      "name": "idStkX",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "pwStkX",
      "type": "string"
    }
  ],
  "name": "verifyStakeholder",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
  
];

// Replace with your contract address







const App = () => {
  const [account, setAccount] = useState("");
  const contractAddress = "0xb29fd8Cd1a724C8E97756f12D084c60c46c12648"; // Replace with deployed contract address
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(IoPRegistrationABI, contractAddress);

  // Connect Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("Please install Metamask!");
    }
  };

  // Function Handlers
  const registerStakeholder = async () => {
    // Example call for registering a stakeholder
    const id = "SupplierA";
    const password = "password123";
    const random = "random123";

    try {
      await contract.methods.registerStakeholder(id, password, random).send({ from: account });
      alert("Stakeholder Registered!");
    } catch (error) {
      console.error(error);
      alert("Registration Failed!");
    }
  };

  const registerISP = async () => {
    // Example call for registering an intermediate service provider
    try {
      await contract.methods.registerIntermediateServiceProvider().send({ from: account });
      alert("ISP Registered!");
    } catch (error) {
      console.error(error);
      alert("Registration Failed!");
    }
  };

  const startAuthentication = async () => {
    try {
      await contract.methods.initiateAuthentication().send({ from: account });
      alert("Authentication Started!");
    } catch (error) {
      console.error(error);
      alert("Authentication Failed!");
    }
  };

  const verifyAuthentication = async () => {
    try {
      await contract.methods.verifyAuthentication().call({ from: account });
      alert("Authentication Verified!");
    } catch (error) {
      console.error(error);
      alert("Verification Failed!");
    }
  };

  const createSessionTokens = async () => {
    try {
      await contract.methods.verifyAndCreateSessionTokens().send({ from: account });
      alert("Session Tokens Created!");
    } catch (error) {
      console.error(error);
      alert("Token Creation Failed!");
    }
  };

  const viewBlockchainLogs = async () => {
    try {
      const logs = await contract.methods.getAllLogs().call({ from: account });
      console.log(logs);
      alert("Logs retrieved. Check console for details.");
    } catch (error) {
      console.error(error);
      alert("Failed to fetch logs!");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button className="connect-wallet" onClick={connectWallet}>
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
        </button>
        <h1>IoP Registration Dashboard</h1>
        <div className="grid-container">
          <div className="grid-item" onClick={registerStakeholder}>
            Register Stakeholder
          </div>
          <div className="grid-item" onClick={registerISP}>
            Register ISP
          </div>
          <div className="grid-item" onClick={startAuthentication}>
            Start Authentication
          </div>
          <div className="grid-item" onClick={verifyAuthentication}>
            Verify Authentication
          </div>
          <div className="grid-item" onClick={createSessionTokens}>
            Create Session Tokens
          </div>
          <div className="grid-item" onClick={viewBlockchainLogs}>
            View Blockchain Logs
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
