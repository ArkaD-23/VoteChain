import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import { gsap } from 'gsap';
import { useGlobalContext } from '../context';

const Register = () => {
  const formRef = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isRegistered , accounts, setAccounts } = useGlobalContext();
  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    );
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const firstMount = () => {
      if (accounts.length > 0) {
        navigate('/home');
      }
    };
    firstMount();
  }, [accounts])
  


  const connectWallet = async () => {
    try {
      const acc = await window.ethereum.request({ 
        method: "eth_requestAccounts",
       });
       setAccounts(acc);
       console.log("Account connected: ", acc[0]);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    connectWallet();
  }, []);

  const onSubmit = async (data) => {
    if (!contract) {
      console.error("Contract is not connected");
      return;
    }

    try {
      const tx = await contract.registerUser(
        data.username,
        data.email,
        data.password
      );
      await tx.wait();
      console.log("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-gray-900 p-4">
      <div
        ref={formRef}
        className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl rounded-lg p-8 border border-gray-600"
      >
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className={`w-full px-4 py-2 bg-gray-800 text-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                errors.username ? 'border-red-500' : 'border-gray-700'
              }`}
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 bg-gray-800 text-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              }`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 bg-gray-800 text-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                errors.password ? 'border-red-500' : 'border-gray-700'
              }`}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 text-white py-2 rounded-md shadow-md hover:from-purple-700 hover:via-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
