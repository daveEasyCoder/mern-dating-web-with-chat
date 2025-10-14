// src/context/ApiContext.jsx
import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { io } from "socket.io-client";

const Context = createContext();

export const ApiProvider = ({ children }) => {
  const baseURL = 'http://localhost:301'; 

  const [user,setUser] = useState(null);
   const [people,setPeople] = useState([])

  const getUser = () => {
    let storedUser = localStorage.getItem("user")
    if(storedUser){
       storedUser = JSON.parse(storedUser)
       setUser(storedUser)
    }
  }


  const socket = io("http://localhost:301");

  useEffect(() => {
    if(user && user.id){
      socket.emit("addUser", user.id);
      socket.on("getUsers", (users) => console.log(users));
    }
    return () => {
      socket.off("getUsers");
    };
  }, []);
  

  useEffect(() => {
     getUser()
  },[])

  return (
    <Context.Provider value={{ baseURL,user,setUser,people,setPeople }}>
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
