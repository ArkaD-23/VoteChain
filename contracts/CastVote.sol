// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CastVote {
    address public owner;
    address public createVoteContract;
    mapping(address => mapping(uint => bool)) public hasVoted;

    event Voted(address indexed voter, uint voteId, uint candidateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(address _createVoteContract) {
        owner = msg.sender;
        createVoteContract = _createVoteContract;
    }

    function vote(uint voteId, uint candidateId) public {
        require(!hasVoted[msg.sender][voteId], "You have already voted");

        // Call CreateVote contract to increment vote count
        (bool success, ) = createVoteContract.call(
            abi.encodeWithSignature("incrementVoteCount(uint256,uint256)", voteId, candidateId)
        );
        require(success, "Vote count update failed");

        hasVoted[msg.sender][voteId] = true;
        emit Voted(msg.sender, voteId, candidateId);
    }
}
