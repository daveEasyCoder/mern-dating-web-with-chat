// src/pages/ChatPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useGlobalContext } from "../context/Context";
import { useSocketContext } from "../context/SocketContext";

const ChatPage = () => {
  const { receiverId } = useParams(); // user you're chatting with
  const { user, baseURL } = useGlobalContext();
  const { socket, onlineUsers } = useSocketContext();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messageEndRef = useRef();
  const [receiverDetail,setReceiverDetail] = useState({})
  


      const getRecieverDetail = async () => {
          try {
              const res = await axios.get(`${baseURL}/api/users/get-single-user/${receiverId}`,{withCredentials:true})
              if(res.data.success){
                 setReceiverDetail(res.data.user)
                 console.log(res.data.user);
                 
              }
          } catch (err) {
              console.log(err);
              
          }
      }

    useEffect(() => {
        window.scrollTo(0,0)
        getRecieverDetail()
    },[])

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await axios.post(`${baseURL}/api/chat/create-conversation`, {
          senderId: user?.id,
          receiverId,
        });
        setConversation(res.data.conv);
      } catch (err) {
        console.log(err);
      }
    };
    fetchConversation();
  }, [receiverId, user]);

 
  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversation?._id) return;
      try {
        const res = await axios.get(
          `${baseURL}/api/chat/get-messages/${conversation._id}`
        );
        setMessages(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, [conversation]);

  
  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("getMessage");
  }, [socket]);


  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(`${baseURL}/api/chat/send-message`, {
        conversationId: conversation._id,
        sender: user.id,
        text,
      });

      setMessages([...messages, res.data]);

      // send message via socket
      const receiverSocket = onlineUsers.find((u) => u.userId === receiverId);
      if (receiverSocket) {
        socket.emit("sendMessage", {
          senderId: user.id,
          receiverId,
          text,
        });
      }

      setText("");
    } catch (err) {
      console.log(err);
    }
  };


  // useEffect(() => {
  //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
     <div className="pt-5 min-h-screen bg-gray-100">
        <div className="max-w-4xl m-auto flex flex-col h-[calc(100vh-80px)] bg-white rounded-lg shadow-sm">
  
        <div className="p-4 border-b border-b-gray-300 flex items-center gap-3">
          <img className='h-10 w-10 border rounded-full object-cover' src={`${baseURL}/uploads/${receiverDetail?.profilePicture}`} alt="Image" />
          <span>{receiverDetail?.fullname}</span>
        </div>

  
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === user.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === user.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

     
        <div className="p-3 border-t border-t-gray-300 flex items-center gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-400 rounded-full px-4 py-2 outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 cursor-pointer text-white rounded-full px-4 py-2 hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
     </div>
  );
};

export default ChatPage;
