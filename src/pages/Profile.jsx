import { useState } from "react";
import {
    ArrowLeft,
    Mail,
    Calendar,
    MessageSquare,
    Bot,
    Edit3,
    Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("Maha Krishnan");
    const [email, setEmail] = useState("maha@example.com");

    const totalChats = 12;
    const totalMessages = 148;

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
                        Profile
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        Manage your ThinkFlow account
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Profile card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 flex items-center justify-center text-3xl font-bold">
                            {name.charAt(0)}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            {editing ? (
                                <input
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-xl font-bold outline-none w-full md:w-auto"
                                />
                            ) : (
                                <h2 className="text-2xl font-bold">
                                    {name}
                                </h2>
                            )}

                            <div className="mt-3 flex items-center justify-center md:justify-start gap-2 text-gray-400">
                                <Mail size={16} />
                                {editing ? (
                                    <input
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="bg-white/10 border border-white/10 rounded-xl px-3 py-2 outline-none"
                                    />
                                ) : (
                                    <span>{email}</span>
                                )}
                            </div>

                            <div className="mt-3 flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm">
                                <Calendar size={16} />
                                Joined May 2026
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                setEditing(!editing)
                            }
                            className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition flex items-center gap-2"
                        >
                            {editing ? <Save /> : <Edit3 />}
                            {editing ? "Save" : "Edit"}
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <MessageSquare className="text-cyan-400" />
                            <h3 className="font-semibold text-lg">
                                Total Chats
                            </h3>
                        </div>

                        <p className="text-4xl font-bold">
                            {totalChats}
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Bot className="text-violet-400" />
                            <h3 className="font-semibold text-lg">
                                Messages Sent
                            </h3>
                        </div>

                        <p className="text-4xl font-bold">
                            {totalMessages}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}