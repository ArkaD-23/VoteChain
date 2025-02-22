import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const { isRegistered , accounts, setAccounts } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
    gsap.fromTo(
      paragraphRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const firstMount = () => {
      console.log("Home: ", isRegistered);
      if (!isRegistered) {
        navigate("/");
        return(<div>...</div>)
      }
    };
    firstMount();
  }, [accounts]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-gray-900 p-4 text-center">
      <h1 ref={headingRef} className="text-5xl font-bold text-white mb-6">
        VoteChain
      </h1>
      <p ref={paragraphRef} className="text-gray-300 text-2xl max-w-3xl">
        A decentralized, secure, and transparent voting platform powered by
        blockchain technology.
      </p>
    </div>
  );
};

export default Home;
