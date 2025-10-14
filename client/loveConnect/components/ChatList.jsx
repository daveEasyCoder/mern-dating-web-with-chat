// src/components/ChatList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/Context";
import { useSocketContext } from "../context/SocketContext";


const ChatList = ({ onSelectChat }) => {
  const { baseURL, user } = useGlobalContext();
  const { onlineUsers } = useSocketContext();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`${baseURL}/api/chat/conversation/${user.id}`, { withCredentials: true })
        .then((res) => setConversations(res.data))
        .catch(console.error);
    }
  }, [user]);

  return (
    <div className="w-full md:w-1/3 border-r border-gray-300 p-3">
      <h2 className="text-lg font-semibold mb-4">Chats</h2>
      {conversations.map((conv) => {
        const receiverId = conv.members.find((id) => id !== user.id);
        const isOnline = onlineUsers.some((u) => u.userId === receiverId);
        return (
          <div
            key={conv._id}
            onClick={() => onSelectChat(conv)}
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer mb-2"
          >
            <span className="font-medium text-gray-700">
              {receiverId.slice(0, 6)}...
            </span>
            <span className={`text-xs ${isOnline ? "text-green-500" : "text-gray-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
