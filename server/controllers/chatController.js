import Conversation from "../Model/conversation.js";
import Message from '../Model/message.js'

export const createConversation = async (req, res) => {
  const { receiverId,senderId } = req.body;

  try {
    let conv = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });
    if (!conv) {
      conv = await Conversation.create({ members: [senderId, receiverId] });
    }
    res.status(200).json({conv,message:"Conversation created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ members: { $in: [req.params.userId] } });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendMessage = async (req, res) => {
  const { conversationId, sender, text } = req.body;
  try {
    const message = await Message.create({ conversationId, sender, text });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
