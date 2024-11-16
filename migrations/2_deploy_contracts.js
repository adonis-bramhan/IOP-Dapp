const IoPRegistration = artifacts.require("IoPRegistration");

module.exports = function (deployer) {
  deployer.deploy(IoPRegistration);
};
