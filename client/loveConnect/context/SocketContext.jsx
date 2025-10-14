// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useGlobalContext } from "./Context";



const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user,baseURL } = useGlobalContext();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user && user?.id) {
      console.log("user exist");
      
      const newSocket = io(baseURL, { withCredentials: true });
      setSocket(newSocket);

      newSocket.emit("addUser", user.id);
      newSocket.on("getUsers", (users) => setOnlineUsers(users));

      return () => newSocket.disconnect();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
