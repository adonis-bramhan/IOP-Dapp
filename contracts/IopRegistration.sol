// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IoPRegistration {

    // Struct to hold stakeholder information
    struct Stakeholder {
        bytes32 pStkX; // Encrypted identity
        bytes32 skStkX; // Session key for secure communication
        bytes32 pidStkX; // Stakeholder identity hash
        bytes32 cStkX; // The complete encrypted identity
        uint256 mXR; // Random number generated during registration
    }

    // Mapping to store stakeholder data
    mapping(address => Stakeholder) public stakeholders;

    // Secret key of the service provider (SP)
    bytes32 private constant skSP = 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef;

    // Event to emit the registration details (for frontend use)
    event StakeholderRegistered(address indexed stkX, bytes32 pStkX, bytes32 skStkX, bytes32 pidStkX, uint256 mXR);

    // Register Stakeholder
    function registerStakeholder(string memory idStkX, string memory pwStkX) public {
        uint256 mXR = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, idStkX)));
        bytes32 pidStkX = keccak256(abi.encodePacked(idStkX, mXR)); // PidStkX = H(IdStkX || mXR)
        bytes32 pStkX = keccak256(abi.encodePacked(pidStkX ^ keccak256(abi.encodePacked(pwStkX)))); // PStkX = H(PidStkX ⊕ H(PwStkX))

        // Generate session key SkStkX using secret key SkSP
        bytes32 skStkX = keccak256(abi.encodePacked(pStkX ^ skSP)); // SkStkX = H(PStkX ⊕ SkSP)

        // Generate complete encrypted identity CStkX
        bytes32 cStkX = keccak256(abi.encodePacked(idStkX, pwStkX, mXR)); // CStkX = H(IdStkX || PwStkX || mXR)

        // Store data in the stakeholders mapping
        stakeholders[msg.sender] = Stakeholder(pStkX, skStkX, pidStkX, cStkX, mXR);

        // Emit event for frontend use
        emit StakeholderRegistered(msg.sender, pStkX, skStkX, pidStkX, mXR);
    }

    // Function to verify Stakeholder identity during authentication
    function verifyStakeholder(string memory idStkX, string memory pwStkX) public view returns (bool) {
        Stakeholder memory stk = stakeholders[msg.sender];
        bytes32 pidStkX = keccak256(abi.encodePacked(idStkX, stk.mXR)); // Recalculate PidStkX

        // Recalculate PStkX and compare with stored value
        bytes32 calculatedPStkX = keccak256(abi.encodePacked(pidStkX ^ keccak256(abi.encodePacked(pwStkX))));

        if (calculatedPStkX == stk.pStkX) {
            return true; // Identity is verified
        }
        return false; // Identity verification failed
    }
}
