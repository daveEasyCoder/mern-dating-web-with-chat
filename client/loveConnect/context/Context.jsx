// src/context/ApiContext.jsx
import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { io } from "socket.io-client";
import { toastSuccess } from '../utility/toast';
import axios from 'axios';

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

    const handleLike = async (id) => {
    
       try {
         const res = await axios.post(`${baseURL}/api/users/like-user`, {id}, {withCredentials:true});
         if(res.data.success){
          setPeople(res.data.users)
          toastSuccess(res.data.msg)
         }
       } catch (err) {
        if(err.response){
          if(err.response.data.message){
            toastError(err.response.data.message)
          }
        }else{
           console.log(err);
        }
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
    <Context.Provider value={{ baseURL,user,setUser,people,setPeople,handleLike }}>
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
