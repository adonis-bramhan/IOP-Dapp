// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract IoPRegistration {
    struct Stakeholder {
        bytes32 pid;    // Hashed PidStkX
        bytes32 pHash;  // Hashed PStkX
        bytes32 skHash; // Hashed SkStkX
        uint256 mXR;    // Random number
    }

    address public serviceProvider; // Address of the service provider
    mapping(address => Stakeholder) private stakeholders; // Map to store stakeholder details

    event Registered(address indexed stakeholder, bytes32 pid);
    event Authenticated(address indexed stakeholder);

    modifier onlyServiceProvider() {
        require(msg.sender == serviceProvider, "Access restricted to the service provider.");
        _;
    }

    constructor() {
        serviceProvider = msg.sender; // Set the contract deployer as the service provider
    }

    // Registration function
    function register(
        string memory idStkX,
        string memory pwStkX,
        uint256 mXR
    ) external {
        require(stakeholders[msg.sender].pid == 0, "Stakeholder already registered.");

        // Calculate hashes for PidStkX and PStkX
        bytes32 pidStkX = keccak256(abi.encodePacked(idStkX, mXR));
        bytes32 pStkX = keccak256(abi.encodePacked(pidStkX ^ uint256(keccak256(abi.encodePacked(pwStkX)))));

        // Service Provider's secret key (for demo purposes, hardcoded here)
        bytes32 skSP = keccak256(abi.encodePacked("secret_key")); // Replace with an actual key management solution
        bytes32 skStkX = keccak256(abi.encodePacked(pStkX ^ uint256(skSP)));

        // Save the stakeholder details
        stakeholders[msg.sender] = Stakeholder(pidStkX, pStkX, skStkX, mXR);

        emit Registered(msg.sender, pidStkX);
    }

    // Authentication function
    function authenticate(
        string memory idStkX,
        string memory pwStkX,
        uint256 mXR
    ) external view returns (bool) {
        Stakeholder memory stk = stakeholders[msg.sender];
        require(stk.pid != 0, "Stakeholder not registered.");

        // Recalculate PidStkX and PStkX
        bytes32 pidStkX = keccak256(abi.encodePacked(idStkX, mXR));
        bytes32 pStkX = keccak256(abi.encodePacked(pidStkX ^ uint256(keccak256(abi.encodePacked(pwStkX)))));

        // Verify the values against stored data
        require(stk.pid == pidStkX, "Invalid identity or random number.");
        require(stk.pHash == pStkX, "Invalid password.");

        emit Authenticated(msg.sender);
        return true;
    }

    // Retrieve stored details (for service provider only)
    function getStakeholder(address stakeholder) external view onlyServiceProvider returns (Stakeholder memory) {
        return stakeholders[stakeholder];
    }
}
