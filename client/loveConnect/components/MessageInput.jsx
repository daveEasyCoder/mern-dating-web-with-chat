// src/components/MessageInput.jsx
import React from "react";
import { FiSend } from "react-icons/fi";

const MessageInput = ({ value, setValue, onSend }) => {
  return (
    <div className="p-3 border-t flex items-center bg-white">
      <input
        type="text"
        placeholder="Type a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        onClick={onSend}
        className="ml-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
      >
        <FiSend />
      </button>
    </div>
  );
};

export default MessageInput;
