import { createContext, useState, useContext , useEffect } from "react";
import {
  CREATE_VOTE_ADDRESS,
  CREATE_VOTE_ABI,
  CAST_VOTE_ADDRESS,
  CAST_VOTE_ABI,
  REGISTER_ADDRESS,
  REGISTER_ABI,
} from "../contracts/contractConfig.js";

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
    const name = await contracts.Register.methods
      .getUser()
      .call({ from: accounts[0] });

    setIsRegistered(!!name);
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

      const Register = new web3.eth.Contract(
        REGISTER_ABI,
        REGISTER_ADDRESS
      );

      setContracts({
        Create_Vote: Create_Vote_Contract,
        Cast_Vote: Cast_Vote_Contract,
        Register: Register,
      });

      console.log(contracts);

      const getAccounts = async () => {
        await window.eth_requestAccounts;
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        console.log(accounts);
      };

      getAccounts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{ accounts, setAccounts, contracts, setContracts , isRegistered, updateRegistrationStatus, setIsRegistered}}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
