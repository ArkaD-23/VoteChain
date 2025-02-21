import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-gray-900 p-4">
      <div
        ref={containerRef}
        className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl rounded-lg p-8 border border-gray-600 text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-4">VoteChain</h1>
        <p className="text-gray-300 text-lg">
          A decentralized, secure, and transparent voting platform powered by blockchain technology.
        </p>
      </div>
    </div>
  );
};

export default Home;
