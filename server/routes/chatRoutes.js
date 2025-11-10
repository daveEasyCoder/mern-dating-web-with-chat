import express from "express";
import { createConversation, getUserConversations, sendMessage, getMessages } from "../controllers/chatController.js";

const router = express.Router();
router.post("/create-conversation", createConversation);
router.get("/get-conversations/:userId", getUserConversations);
router.post("/send-message", sendMessage);
router.get("/get-messages/:conversationId", getMessages);

export default router;