import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateVote from "./pages/CreateVote";
import CastVote from "./pages/CastVote";

const App = () => {
  console.log("App is rendering!");

  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateVote />} />
          <Route path="/cast" element={<CastVote />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
