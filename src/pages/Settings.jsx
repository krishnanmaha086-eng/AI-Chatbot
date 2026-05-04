import { useState } from "react";
import {
    ArrowLeft,
    Volume2,
    Trash2,
    Download,
    LogOut,
    Brain,
    Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
    const navigate = useNavigate();

    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [model, setModel] = useState("Smart");

    const models = ["Fast", "Smart", "Creative"];

    const clearChats = () => {
        localStorage.removeItem("thinkflow_chats");
        alert("Chats cleared");
    };

    const exportChats = () => {
        const chats =
            localStorage.getItem("thinkflow_chats") ||
            "No chats found";

        const blob = new Blob([chats], {
            type: "text/plain",
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "thinkflow-chat.txt";
        a.click();

        URL.revokeObjectURL(url);
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white px-4 md:px-8 py-6 md:py-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate("/chat")}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
                >
                    <ArrowLeft />
                </button>

                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Settings
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        Customize your ThinkFlow AI experience
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
                {/* Voice */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Volume2 className="text-cyan-400" />
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Voice Assistant
                                </h3>
                                <p className="text-sm text-gray-400">
                                    AI speaks responses aloud
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                setVoiceEnabled(!voiceEnabled)
                            }
                            className={`w-16 h-8 rounded-full transition relative ${voiceEnabled
                                    ? "bg-cyan-500"
                                    : "bg-gray-600"
                                }`}
                        >
                            <div
                                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition ${voiceEnabled
                                        ? "left-9"
                                        : "left-1"
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Model */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <Brain className="text-violet-400" />
                        <h3 className="font-semibold text-lg">
                            AI Model
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {models.map((item) => (
                            <button
                                key={item}
                                onClick={() => setModel(item)}
                                className={`p-4 rounded-2xl border transition ${model === item
                                        ? "border-cyan-400 bg-cyan-500/20"
                                        : "border-white/10 bg-white/5 hover:bg-white/10"
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span>{item}</span>
                                    {model === item && (
                                        <Check
                                            size={18}
                                            className="text-cyan-400"
                                        />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    <button
                        onClick={exportChats}
                        className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition"
                    >
                        <Download className="text-green-400" />
                        Export Chats
                    </button>

                    <button
                        onClick={clearChats}
                        className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition"
                    >
                        <Trash2 className="text-red-400" />
                        Clear All Chats
                    </button>

                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-2xl p-4 transition"
                    >
                        <LogOut className="text-red-400" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}