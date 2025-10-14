import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import { Server } from "socket.io";
import http from "http";

import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'

dotenv.config()
const app = express()

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,                
}));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', chatRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));


const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true }
});
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("addUser", (userId) => {
    const isUserExist = onlineUsers.find(u => u.userId === userId);
    if (!isUserExist) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
    io.emit("getUsers", onlineUsers);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiver = onlineUsers.find(u => u.userId === receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", { senderId, text });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(u => u.socketId !== socket.id);
    io.emit("getUsers", onlineUsers);
  });
});


const PORT = process.env.PORT || 301;
server.listen(PORT, () => {
  console.log("🚀 Server and Socket.io running on port", PORT);
});