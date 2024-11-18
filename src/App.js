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

const contractAddress = "0xb29fd8Cd1a724C8E97756f12D084c60c46c12648";


const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    // Initialize Web3
    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);

    // Request account access
    window.ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
      setAccount(accounts[0]);
    });

    // Initialize contract instance using ABI and contract address
    const contractInstance = new web3Instance.eth.Contract(IoPRegistrationABI, contractAddress);
    setContract(contractInstance);
  }, [web3]);

  const registerStakeholder = async () => {
    try {
      const IdStkA = "SupplierA";
      const PwStkA = "password123";
      const mXR = "random123";

      // Call the registerStakeholder function of the contract
      await contract.methods.registerStakeholder(IdStkA, PwStkA, mXR).send({ from: account });
      console.log("Stakeholder registered successfully!");
    } catch (error) {
      console.error("Error while registering: ", error);
    }
  };

  const verifyAndCreateSessionTokens = async () => {
    try {
      const stkaAddress = "ADDRESS_STKA";
      const stkbAddress = "ADDRESS_STKB";
      const authHashA = "AUTH_HASH_A";
      const authHashB = "AUTH_HASH_B";
      const timestamp = "TIMESTAMP";

      // Call the verifyAndCreateSessionTokens function of the contract
      const response = await contract.methods.verifyAndCreateSessionTokens(
        stkaAddress, stkbAddress, authHashA, authHashB, timestamp
      ).call();

      console.log("Session Tokens: ", response);
    } catch (error) {
      console.error("Error while verifying: ", error);
    }
  };

  return (
    <div className="container">
      <h1>IoP DApp</h1>
      <button onClick={registerStakeholder}>Register Stakeholder</button>
      <button onClick={verifyAndCreateSessionTokens}>Verify and Create Session Tokens</button>
    </div>
  );
};

export default App;
