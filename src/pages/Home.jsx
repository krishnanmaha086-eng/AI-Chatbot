import {
    Sparkles,
    Bot,
    Zap,
    Brain,
    Mic,
    Shield,
    Menu,
    X,
    ArrowRight,
    Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
    {
        icon: <Bot className="text-cyan-400" size={34} />,
        title: "Real-Time AI Chat",
        desc: "Fast conversational responses with intelligent context awareness.",
    },
    {
        icon: <Brain className="text-violet-400" size={34} />,
        title: "Memory Engine",
        desc: "Remembers your conversation flow and adapts naturally.",
    },
    {
        icon: <Zap className="text-yellow-400" size={34} />,
        title: "Lightning Fast",
        desc: "Optimized for instant interaction and smooth responses.",
    },
    {
        icon: <Mic className="text-green-400" size={34} />,
        title: "Voice Assistant",
        desc: "Talk naturally and hear responses with voice mode.",
    },
    {
        icon: <Shield className="text-pink-400" size={34} />,
        title: "Private & Secure",
        desc: "Your chats remain protected with modern architecture.",
    },
    {
        icon: <Sparkles className="text-orange-400" size={34} />,
        title: "Creative AI",
        desc: "Generate code, ideas, content, and solve complex tasks.",
    },
];

const stats = [
    "24/7 AI Availability",
    "Voice Enabled",
    "Smart Memory",
    "Secure Chats",
];

export default function Home() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">
            {/* Glow */}
            <div className="absolute top-10 left-5 md:left-20 w-48 md:w-72 h-48 md:h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20" />
            <div className="absolute bottom-10 right-5 md:right-20 w-48 md:w-72 h-48 md:h-72 bg-violet-500 rounded-full blur-[120px] opacity-20" />

            {/* Navbar */}
            <nav className="relative z-20 flex justify-between items-center px-4 sm:px-6 md:px-10 py-5">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    ThinkFlow AI
                </h1>

                {/* Desktop buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-5 py-2 rounded-xl border border-cyan-400 hover:bg-cyan-500/20 transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="px-5 py-2 rounded-xl border border-violet-400 hover:bg-violet-500/20 transition"
                    >
                        Signup
                    </button>

                    <button
                        onClick={() => navigate("/chat")}
                        className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold"
                    >
                        Get Started
                    </button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X /> : <Menu />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 relative z-20">
                    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-4">
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate("/login")}
                                className="flex-1 py-3 rounded-xl border border-cyan-400 hover:bg-cyan-500/20 transition"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => navigate("/signup")}
                                className="flex-1 py-3 rounded-xl border border-violet-400 hover:bg-violet-500/20 transition"
                            >
                                Signup
                            </button>

                            <button
                                onClick={() => navigate("/chat")}
                                className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 relative z-20">
                    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-4 space-y-3">
                        <button
                            onClick={() => navigate("/login")}
                            className="w-full py-3 rounded-xl border border-cyan-400 hover:bg-cyan-500/20 transition"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => navigate("/chat")}
                            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            )}

            {/* Hero */}
            <section className="relative z-10 flex flex-col justify-center items-center text-center px-5 sm:px-8 md:px-6 py-16 md:min-h-[80vh]">
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Sparkles
                        size={56}
                        className="mx-auto text-cyan-400 mb-6"
                    />

                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-6 text-sm">
                        <Star size={14} className="text-yellow-400" />
                        Future-ready AI Platform
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
                        Build Smarter With <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                            ThinkFlow AI
                        </span>
                    </h1>

                    <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                        Real-time AI conversations, voice interaction,
                        memory-powered assistance, and intelligent code generation —
                        all in one futuristic workspace.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/chat")}
                            className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
                        >
                            Launch ThinkFlow
                            <ArrowRight size={18} />
                        </button>

                        <button
                            onClick={() => navigate("/chat")}
                            className="px-8 py-4 rounded-xl border border-violet-400 hover:bg-violet-500/20 transition font-semibold"
                        >
                            Live Demo
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Stats */}
            <section className="relative z-10 px-4 md:px-10 pb-14">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center font-medium"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="relative z-10 px-4 sm:px-6 md:px-10 pb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-14">
                    Powerful Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.03 }}
                            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-7 shadow-lg"
                        >
                            <div className="mb-5">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Showcase */}
            <section className="relative z-10 px-4 md:px-10 pb-24">
                <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
                        Experience the Future
                    </h2>

                    <div className="bg-[#0b1020] rounded-3xl border border-white/10 p-5 md:p-8 space-y-4">
                        <div className="bg-cyan-500 text-white p-4 rounded-2xl ml-auto max-w-md">
                            Create a modern React dashboard
                        </div>

                        <div className="bg-white/10 border border-white/10 p-4 rounded-2xl max-w-2xl">
                            Absolutely — I can generate a fully responsive dashboard with charts, cards, sidebar navigation, and clean UI.
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 py-8 px-4 text-center text-gray-400">
                © 2026 ThinkFlow AI — Intelligent conversation, redesigned.
            </footer>
        </div>
    );
}