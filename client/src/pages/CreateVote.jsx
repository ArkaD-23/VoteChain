import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { useGlobalContext } from "../context";
import { ethers } from "ethers";

const CreateVote = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [candidates, setCandidates] = useState([]);
  const [contract, setContract] = useState(null);
  const formRefCreate = useRef(null);
  const formRefCandidates = useRef(null);
  const { contracts, accounts } = useGlobalContext();

  useEffect(() => {
    gsap.fromTo(
      formRefCreate.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(
      formRefCandidates.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
  }, []);

  const addCandidate = (data) => {
    setCandidates([...candidates, data]);
    reset({ candidateName: "", candidatePhoto: "" });
  };

  const onSubmitVote = async (data) => {
    if (!accounts[0]) {
      alert("Please connect your wallet first");
      return;
    }

    if (candidates.length === 0) {
      alert("Please add at least one candidate before creating the vote.");
      return;
    }

    const startDate = Math.floor(new Date(data.startDate).getTime() / 1000);
    const endDate = Math.floor(new Date(data.endDate).getTime() / 1000);

    if (startDate >= endDate) {
      alert("End date must be after the start date.");
      return;
    }

    try {
      const candidateNames = candidates.map((c) => c.candidateName);

      const tx = await contracts.Create_Vote.methods
        .createVote(data.title, candidateNames, startDate, endDate)
        .send({ from: accounts[0] });
      console.log("Transaction Hash:", tx.transactionHash);
    } catch (err) {
      console.error("Error creating vote:", err);
      alert("Failed to create vote: " + err.message);
    }
  };

  const endVote = async (voteId) => {
    try {
      const tx = await contract.endVote(voteId);
      await tx.wait();
      alert("Vote ended successfully!");
    } catch (err) {
      console.error("Error ending vote:", err);
      alert("Failed to end vote: " + err.message);
    }
  };

  const getCandidate = async (voteId, candidateId) => {
    try {
      const [name, voteCount] = await contract.getCandidate(
        voteId,
        candidateId
      );
      return { name, voteCount: voteCount.toNumber() };
    } catch (err) {
      console.error("Error getting candidate:", err);
      throw err;
    }
  };

  const incrementVoteCount = async (voteId, candidateId) => {
    try {
      const tx = await contract.incrementVoteCount(voteId, candidateId);
      await tx.wait();
      alert("Vote counted successfully!");
    } catch (err) {
      console.error("Error incrementing vote:", err);
      alert("Failed to increment vote: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-700 via-indigo-800 to-gray-900 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Create a Vote</h1>

      <form
        ref={formRefCreate}
        onSubmit={handleSubmit(onSubmitVote)}
        className="w-full max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl rounded-lg p-8 border border-gray-600 mb-8"
      >
        <div className="mb-4">
          <label className="block text-white mb-2">Vote Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 bg-gray-800 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2">Vote Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-4 py-2 bg-gray-800 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2">Voting Start Date</label>
          <input
            type="date"
            {...register("startDate", { required: "Start date is required" })}
            className="w-full px-4 py-2 bg-gray-800 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2">Voting End Date</label>
          <input
            type="date"
            {...register("endDate", { required: "End date is required" })}
            className="w-full px-4 py-2 bg-gray-800 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 text-white py-2 rounded-md shadow-md hover:from-purple-700 hover:via-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
        >
          Create Vote
        </button>
      </form>

      <div
        ref={formRefCandidates}
        className="w-full max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl rounded-lg p-8 border border-gray-600"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Add Candidates</h2>

        <form onSubmit={handleSubmit(addCandidate)} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Candidate Name</label>
            <input
              type="text"
              {...register("candidateName")}
              className="w-full px-4 py-2 bg-gray-800 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.candidateName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.candidateName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white mb-2">Candidate Photo</label>
            <input
              type="file"
              {...register("candidatePhoto")}
              className="w-full text-white bg-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.candidatePhoto && (
              <p className="text-red-500 text-sm mt-1">
                {errors.candidatePhoto.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-md shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
          >
            Add Candidate
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-white mb-4">Candidates List</h3>
          <ul className="space-y-2">
            {candidates.map((candidate, index) => (
              <li
                key={index}
                className="text-white bg-gray-800 px-4 py-2 rounded-md shadow-md"
              >
                {candidate.candidateName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateVote;
