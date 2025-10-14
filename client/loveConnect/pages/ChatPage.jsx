// src/pages/ChatPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const { userId } = useParams(); 
  const [selectedChat, setSelectedChat] = useState(null);

 
  useEffect(() => {
    if (userId) {
      setSelectedChat(userId);
    }
  }, [userId]);

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white rounded-lg shadow-md overflow-hidden">
      <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      {selectedChat ? (
        <ChatBox conversation={selectedChat} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default ChatPage;
