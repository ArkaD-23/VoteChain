import { createContext } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState("");

  return (
    <GlobalContext.Provider
      value={{ accounts, setAccounts, contracts, setContracts }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
