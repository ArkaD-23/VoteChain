// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CreateVote {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Vote {
        uint id;
        string title;
        mapping(uint => Candidate) candidates;
        uint candidateCount;
        bool isActive;
    }

    mapping(uint => Vote) public votes;
    uint public voteCount;
    address public owner;

    event VoteCreated(uint voteId, string title);
    event CandidateAdded(uint voteId, uint candidateId, string name);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createVote(string memory title, string[] memory candidateNames) public onlyOwner {
        voteCount++;
        Vote storage newVote = votes[voteCount];
        newVote.id = voteCount;
        newVote.title = title;
        newVote.isActive = true;

        for (uint i = 0; i < candidateNames.length; i++) {
            newVote.candidateCount++;
            newVote.candidates[newVote.candidateCount] = Candidate(newVote.candidateCount, candidateNames[i], 0);
            emit CandidateAdded(voteCount, newVote.candidateCount, candidateNames[i]);
        }

        emit VoteCreated(voteCount, title);
    }

    function endVote(uint voteId) public onlyOwner {
        require(voteId > 0 && voteId <= voteCount, "Invalid vote ID");
        votes[voteId].isActive = false;
    }

    function getCandidate(uint voteId, uint candidateId) public view returns (string memory, uint) {
        require(voteId > 0 && voteId <= voteCount, "Invalid vote ID");
        require(candidateId > 0 && candidateId <= votes[voteId].candidateCount, "Invalid candidate ID");

        Candidate memory candidate = votes[voteId].candidates[candidateId];
        return (candidate.name, candidate.voteCount);
    }

    function incrementVoteCount(uint voteId, uint candidateId) public {
        require(voteId > 0 && voteId <= voteCount, "Invalid vote ID");
        require(candidateId > 0 && candidateId <= votes[voteId].candidateCount, "Invalid candidate ID");
        require(votes[voteId].isActive, "Voting has ended");

        votes[voteId].candidates[candidateId].voteCount++;
    }
}
