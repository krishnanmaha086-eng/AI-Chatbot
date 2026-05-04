import express from "express";
import { chatWithAI } from "../controllers/chatController.mjs";

const router = express.Router();

router.post("/", chatWithAI);

export default router;