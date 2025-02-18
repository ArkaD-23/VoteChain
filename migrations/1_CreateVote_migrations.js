const CreateVote = artifacts.require("CreateVote");

module.exports = function (deployer) {
    deployer.deploy(CreateVote);
};