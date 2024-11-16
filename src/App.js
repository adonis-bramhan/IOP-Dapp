import React, { useState } from "react";
import { ethers } from "ethers";
import IoPRegistration from "../build/contracts/IoPRegistration.json";

const App = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("");

  const connectBlockchain = async () => {
    if (window.ethereum) {
      const _provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = _provider.getSigner();
      const networkId = await _provider.getNetwork();
      const deployedNetwork = IoPRegistration.networks[networkId.chainId];

      if (deployedNetwork) {
        const _contract = new ethers.Contract(
          deployedNetwork.address,
          IoPRegistration.abi,
          signer
        );

        setProvider(_provider);
        setContract(_contract);
        setAddress(await signer.getAddress());
      } else {
        alert("Smart contract not deployed on this network");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div>
      <h1>IoP-DApp</h1>
      <button onClick={connectBlockchain}>Connect Wallet</button>
      {address && <p>Connected as: {address}</p>}
    </div>
  );
};

export default App;
