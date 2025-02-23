// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CreateVote {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Vote {
        uint id;
        string title;
        Candidate[] candidates;
        uint candidateCount;
        bool isActive;
        uint startDate;
        uint endDate;
    }

    mapping(uint => Vote) public votes;
    uint public voteCount;
    address public owner;

    event VoteCreated(uint voteId, string title);
    event CandidateAdded(uint voteId, uint candidateId, string name);

    constructor() {
        owner = msg.sender;
    }

    function createVote(
        string memory title,
        string[] memory candidateNames,
        uint startDate,
        uint endDate
    ) public {
        voteCount++;
        Vote storage newVote = votes[voteCount];
        newVote.id = voteCount;
        newVote.title = title;
        newVote.isActive = true;
        newVote.startDate = startDate;
        newVote.endDate = endDate;

        for (uint i = 0; i < candidateNames.length; i++) {
            newVote.candidateCount++;
            newVote.candidates[newVote.candidateCount] = Candidate(
                newVote.candidateCount,
                candidateNames[i],
                0
            );
            emit CandidateAdded(
                voteCount,
                newVote.candidateCount,
                candidateNames[i]
            );
        }

        emit VoteCreated(voteCount, title);
    }

    function endVote(uint voteId) public {
        require(voteId > 0 && voteId <= voteCount, "Invalid vote ID");
        require(
            block.timestamp >= votes[voteId].endDate,
            "Voting period has not ended yet"
        );

        votes[voteId].isActive = false;
    }

    function getCandidate(
        uint voteId,
        uint candidateId
    ) public view returns (string memory, uint) {
        require(voteId > 0 && voteId <= voteCount, "Invalid vote ID");
        require(
            candidateId > 0 && candidateId <= votes[voteId].candidateCount,
            "Invalid candidate ID"
        );

        Candidate memory candidate = votes[voteId].candidates[candidateId];
        return (candidate.name, candidate.voteCount);
    }

    function incrementVoteCount(uint voteId, uint candidateId) public {
        require(voteId > 0 && voteId <= voteCount, "Invalid vote ID");
        require(
            candidateId > 0 && candidateId <= votes[voteId].candidates.length,
            "Invalid candidate ID"
        );
        require(votes[voteId].isActive, "Voting has ended");
        require(
            block.timestamp >= votes[voteId].startDate,
            "Voting has not started yet"
        );
        require(
            block.timestamp <= votes[voteId].endDate,
            "Voting period has ended"
        );

        votes[voteId].candidates[candidateId - 1].voteCount++;
    }
}
