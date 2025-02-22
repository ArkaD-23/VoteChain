import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CreateVote from "./pages/CreateVote";
import CastVote from "./pages/CastVote";
import Home from "./pages/Home";

const App = () => {
  console.log("App is rendering!");

  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateVote />} />
          <Route path="/cast" element={<CastVote />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
