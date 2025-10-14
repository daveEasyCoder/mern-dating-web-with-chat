import express from "express";
import { createConversation, getUserConversations, sendMessage, getMessages } from "../controllers/chatController.js";

const router = express.Router();
router.post("/conversation", createConversation);
router.get("/conversation/:userId", getUserConversations);
router.post("/message", sendMessage);
router.get("/message/:conversationId", getMessages);

export default router;