import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-chatbot-flpw.onrender.com/",
});

export default api;