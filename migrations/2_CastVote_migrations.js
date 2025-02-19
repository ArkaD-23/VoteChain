const CastVote = artifacts.require("CastVote");
const CreateVote = artifacts.require("CreateVote");

module.exports = async function (deployer) {

    const createVoteInstance = await CreateVote.deployed();

    await deployer.deploy(CastVote, createVoteInstance.address);
};
