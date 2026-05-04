import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.mjs";
const app = express();

console.log(
  "OpenRouter key loaded:",
  !!process.env.OPENROUTER_API_KEY
);
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ThinkFlow AI Backend Running 🚀",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});