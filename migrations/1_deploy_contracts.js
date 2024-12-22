const BondContract = artifacts.require("BondContract");

module.exports = function(deployer) {
  deployer.deploy(BondContract);
};
