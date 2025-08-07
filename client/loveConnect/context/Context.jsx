// src/context/ApiContext.jsx
import { createContext, useContext } from 'react';

const Context = createContext();

export const ApiProvider = ({ children }) => {
  const baseURL = 'http://localhost:302'; 

  return (
    <Context.Provider value={{ baseURL }}>
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
