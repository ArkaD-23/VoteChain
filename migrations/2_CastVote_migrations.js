const CastVote = artifacts.require("CastVote");

module.exports = function (deployer) {
    deployer.deploy(CastVote);
};