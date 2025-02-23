import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { gsap } from "gsap";
import { ethers } from "ethers";
import { useGlobalContext } from "../context";

const CastVote = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [contract, setContract] = useState(null);
  const [voteId, setVoteId] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const { contracts, accounts } = useGlobalContext();

  const formRef = useRef(null);
  const candidatesRef = useRef([]);
  // const candidates = [
  //   { id: 1, name: 'Alice', photo: 'https://via.placeholder.com/150' },
  //   { id: 2, name: 'Bob', photo: 'https://via.placeholder.com/150' },
  //   { id: 3, name: 'Charlie', photo: 'https://via.placeholder.com/150' },
  //    ];

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
    candidatesRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1, delay: index * 1, ease: "power3.out" }
      );
    });
  }, []);

  const checkIfVoted = async () => {
    try {
      if (!contract || !accounts[0] || !voteId) return false;
      const hasVoted = await contract.hasVoted(accounts[0], voteId);
      return hasVoted;
    } catch (err) {
      console.error("Error checking vote status:", err);
      return false;
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate) {
      toast.error("Please select a candidate before voting.");
      return;
    }

    if (!accounts[0]) {
      toast.error("Please connect your wallet to vote.");
      return;
    }

    try {
      setLoading(true);

      const alreadyVoted = await checkIfVoted();
      if (alreadyVoted) {
        toast.error("You have already voted in this election.");
        setLoading(false);
        return;
      }
      const toastId = toast.loading("Casting your vote...");
      const tx = await contracts.Cast_Vote.methods
        .vote(voteId, selectedCandidate)
        .send({ from: accounts[0] });
      toast.success("Vote cast successfully!", { id: toastId });

      setSelectedCandidate(null);
    } catch (err) {
      console.error("Error casting vote:", err);
      toast.error(err.message || "Failed to cast vote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const endVote = async () => {
      await contractsCast_Vote.methods.endVote().call({ from: accounts[0] });
    };
    endVote();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-700 via-indigo-800 to-gray-900 p-6">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-3xl font-bold text-white mb-6">
        Vote for Your Candidate
      </h1>

      <div
        ref={formRef}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-4">Vote Title</h2>
        <p className="text-white">
          This is where you can cast your vote for the upcoming election. Select
          your preferred candidate and submit your vote securely.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-8 w-full max-w-3xl">
        {candidates.map((candidate, index) => (
          <div
            key={candidate.id}
            ref={(el) => (candidatesRef.current[index] = el)}
            className={`p-4 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 rounded-lg shadow-md text-center cursor-pointer border-2 transition-transform transform hover:scale-105 duration-300 ${
              selectedCandidate === candidate.id
                ? "border-green-500"
                : "border-transparent"
            }`}
            onClick={() => setSelectedCandidate(candidate.id)}
          >
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-gray-500"
            />
            <h2 className="text-xl font-bold text-white">{candidate.name}</h2>
          </div>
        ))}
      </div>

      <button
        onClick={handleVote}
        disabled={loading}
        className={`w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-md shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Submitting..." : "Submit Vote"}
      </button>
    </div>
  );
};

export default CastVote;
