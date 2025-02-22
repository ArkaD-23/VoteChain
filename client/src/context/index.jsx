import { createContext, useState, useContext, useEffect } from "react";
import Web3 from "web3";
import {
  CREATE_VOTE_ADDRESS,
  CREATE_VOTE_ABI,
  CAST_VOTE_ADDRESS,
  CAST_VOTE_ABI,
  REGISTER_ADDRESS,
  REGISTER_ABI,
} from "../contracts/contractConfig.js";
import toast, { Toaster } from "react-hot-toast";
import { set } from "react-hook-form";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState({
    Create_Vote: "",
    Cast_Vote: "",
    Register: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const updateRegistrationStatus = async () => {
    try {
      const result = await contracts.Register.methods
      .getUser(accounts[0])
      .call();
      const [username, email, isRegistered] = Object.values(result);
      setIsRegistered(isRegistered);
    } catch (error) {
      console.error("Error fetching user registration status:", error);
      toast.error("Failed to fetch user registration status");
    }
  };

  useEffect(() => {
    try {
      const web3 = new Web3(window.ethereum);
      const Create_Vote_Contract = new web3.eth.Contract(
        CREATE_VOTE_ABI,
        CREATE_VOTE_ADDRESS
      );
      const Cast_Vote_Contract = new web3.eth.Contract(
        CAST_VOTE_ABI,
        CAST_VOTE_ADDRESS
      );
      const Register_Contract = new web3.eth.Contract(
        REGISTER_ABI,
        REGISTER_ADDRESS
      );
      setContracts({
        Create_Vote: Create_Vote_Contract,
        Cast_Vote: Cast_Vote_Contract,
        Register: Register_Contract,
      });
      console.log("Contracts: ", contracts);
      const getAccounts = async () => {
        await window.eth_requestAccounts;
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        console.log("Accounts connected:", accounts);
      };
      getAccounts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        accounts,
        setAccounts,
        contracts,
        isRegistered,
        setIsRegistered,
        updateRegistrationStatus,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
