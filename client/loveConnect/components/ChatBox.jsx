// src/components/ChatBox.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import MessageInput from "./MessageInput";
import { useGlobalContext } from "../context/Context";
import { useSocketContext } from "../context/SocketContext";

const ChatBox = ({ conversation }) => {
  const { baseURL, user } = useGlobalContext();
  const { socket } = useSocketContext();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [receiverId, setReceiverId] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (conversation) {
      const other = conversation.members.find((m) => m !== user.id);
      setReceiverId(other);
      axios
        .get(`${baseURL}/api/chat/message/${conversation._id}`, { withCredentials: true })
        .then((res) => setMessages(res.data))
        .catch(console.error);
    }
  }, [conversation]);

  // Receive message from socket
  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (data) => {
      if (data.senderId === receiverId) {
        setMessages((prev) => [...prev, { sender: data.senderId, text: data.text }]);
      }
    });
    return () => socket.off("getMessage");
  }, [socket, receiverId]);

  // Scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim()) return;

    const message = {
      conversationId: conversation._id,
      sender: user._id,
      text: newMsg,
    };

    try {
      const res = await axios.post(`${baseURL}/api/chat/message`, message, { withCredentials: true });
      setMessages((prev) => [...prev, res.data]);
      socket.emit("sendMessage", { senderId: user._id, receiverId, text: newMsg });
      setNewMsg("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b bg-gray-50 flex justify-between">
        <h3 className="font-semibold">Chat with {receiverId?.slice(0, 6)}...</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-100">
        {messages.map((m, idx) => (
          <div
            key={idx}
            ref={scrollRef}
            className={`flex ${m.sender === user._id ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`px-3 py-2 rounded-2xl text-sm max-w-xs ${
                m.sender === user._id ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <MessageInput value={newMsg} setValue={setNewMsg} onSend={handleSend} />
    </div>
  );
};

export default ChatBox;
