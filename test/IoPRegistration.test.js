const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IoPRegistration Contract", function () {
  let IoPRegistration, iopRegistration, serviceProvider, stakeholder;

  beforeEach(async function () {
    [serviceProvider, stakeholder] = await ethers.getSigners();

    // Deploy the contract
    IoPRegistration = await ethers.getContractFactory("IoPRegistration");
    iopRegistration = await IoPRegistration.connect(serviceProvider).deploy();
    await iopRegistration.deployed();
  });

  it("Should register a stakeholder successfully", async function () {
    const idStkX = "stakeholder1";
    const pwStkX = "password123";
    const mXR = 12345;

    // Register the stakeholder
    await iopRegistration.connect(stakeholder).register(idStkX, pwStkX, mXR);

    // Retrieve stored details
    const registeredData = await iopRegistration
      .connect(serviceProvider)
      .getStakeholder(stakeholder.address);

    // Compute expected values
    const pidStkX = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(["string", "uint256"], [idStkX, mXR])
    );
    const pStkX = ethers.utils.keccak256(
      ethers.BigNumber.from(pidStkX).xor(
        ethers.BigNumber.from(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes(pwStkX))
        )
      )
    );

    expect(registeredData.pid).to.equal(pidStkX);
    expect(registeredData.pHash).to.equal(pStkX);
  });

  it("Should authenticate a stakeholder successfully", async function () {
    const idStkX = "stakeholder1";
    const pwStkX = "password123";
    const mXR = 12345;

    // Register the stakeholder
    await iopRegistration.connect(stakeholder).register(idStkX, pwStkX, mXR);

    // Authenticate with correct credentials
    const isAuthenticated = await iopRegistration
      .connect(stakeholder)
      .authenticate(idStkX, pwStkX, mXR);

    expect(isAuthenticated).to.be.true;
  });

  it("Should fail authentication with incorrect credentials", async function () {
    const idStkX = "stakeholder1";
    const pwStkX = "password123";
    const mXR = 12345;

    // Register the stakeholder
    await iopRegistration.connect(stakeholder).register(idStkX, pwStkX, mXR);

    // Attempt to authenticate with wrong password
    await expect(
      iopRegistration
        .connect(stakeholder)
        .authenticate(idStkX, "wrongpassword", mXR)
    ).to.be.revertedWith("Invalid password.");

    // Attempt to authenticate with wrong random number
    await expect(
      iopRegistration.connect(stakeholder).authenticate(idStkX, pwStkX, 99999)
    ).to.be.revertedWith("Invalid identity or random number.");
  });
});
