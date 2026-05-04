import {
    useState,
    useEffect,
    useRef,
} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    Send,
    Plus,
    Settings,
    User,
    Menu,
    X,
    Copy,
    Check,
    Mic,
    MicOff,
    Volume2,
    Square,
    Trash2,
    Pencil,
} from "lucide-react";

export default function Chat() {
    const navigate = useNavigate();
    const recognitionRef = useRef(null);
    const bottomRef = useRef(null);

    const welcomeMessage = {
        sender: "ai",
        text: "Hello! I'm ThinkFlow AI. How can I help you today?",
    };

    const [chats, setChats] = useState(() => {
        const saved =
            localStorage.getItem("thinkflow_chats");
        return saved
            ? JSON.parse(saved)
            : [
                {
                    id: 1,
                    title: "New Chat",
                    messages: [welcomeMessage],
                },
            ];
    });

    const [activeChatId, setActiveChatId] =
        useState(() => {
            return Number(
                localStorage.getItem(
                    "thinkflow_active_chat"
                )
            ) || 1;
        });

    const [copied, setCopied] = useState("");
    const [input, setInput] = useState("");
    const [sidebarOpen, setSidebarOpen] =
        useState(false);
    const [serverMessage, setServerMessage] =
        useState("");
    const [listening, setListening] =
        useState(false);
    const [speaking, setSpeaking] =
        useState(false);
    const [thinking, setThinking] =
        useState(false);

    const activeChat = chats.find(
        (chat) => chat.id === activeChatId
    );

    const messages =
        activeChat?.messages || [];

    useEffect(() => {
        localStorage.setItem(
            "thinkflow_chats",
            JSON.stringify(chats)
        );

        localStorage.setItem(
            "thinkflow_active_chat",
            activeChatId
        );
    }, [chats, activeChatId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, thinking]);

    useEffect(() => {
        const checkServer = async () => {
            try {
                const res = await api.get("/");
                setServerMessage(res.data.message);
            } catch {
                setServerMessage(
                    "Backend not connected"
                );
            }
        };

        checkServer();
    }, []);

    const createNewChat = () => {
        const newChat = {
            id: Date.now(),
            title: "New Chat",
            messages: [welcomeMessage],
        };

        setChats((prev) => [
            newChat,
            ...prev,
        ]);

        setActiveChatId(newChat.id);
        setSidebarOpen(false);
    };

    const deleteChat = (id) => {
        const updated = chats.filter(
            (chat) => chat.id !== id
        );

        if (!updated.length) {
            const fresh = {
                id: Date.now(),
                title: "New Chat",
                messages: [welcomeMessage],
            };

            setChats([fresh]);
            setActiveChatId(fresh.id);
            return;
        }

        setChats(updated);

        if (activeChatId === id) {
            setActiveChatId(updated[0].id);
        }
    };

    const renameChat = (id) => {
        const name = prompt(
            "Rename chat:"
        );

        if (!name) return;

        setChats((prev) =>
            prev.map((chat) =>
                chat.id === id
                    ? {
                        ...chat,
                        title: name,
                    }
                    : chat
            )
        );
    };

    const copyCode = async (text) => {
        await navigator.clipboard.writeText(
            text
        );
        setCopied(text);

        setTimeout(() => {
            setCopied("");
        }, 2000);
    };

    const speakText = (text) => {
        window.speechSynthesis.cancel();

        const utterance =
            new SpeechSynthesisUtterance(
                text
            );

        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () =>
            setSpeaking(true);

        utterance.onend = () =>
            setSpeaking(false);

        window.speechSynthesis.speak(
            utterance
        );
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
    };

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert(
                "Speech recognition not supported"
            );
            return;
        }

        if (!recognitionRef.current) {
            const recognition =
                new SpeechRecognition();

            recognition.lang = "en-IN";
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = (event) => {
                const transcript =
                    event.results[0][0].transcript;

                setListening(false);

                if (transcript.trim()) {
                    sendVoiceMessage(transcript);
                }
            };

            let finalTranscript = "";

            recognition.onresult = (event) => {
                let transcript = "";

                for (
                    let i = event.resultIndex;
                    i < event.results.length;
                    i++
                ) {
                    transcript +=
                        event.results[i][0].transcript;

                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    }
                }

                setInput(finalTranscript || transcript);
            };

            recognition.onstart = () =>
                setListening(true);

            recognition.onresult = (
                event
            ) => {
                const transcript =
                    event.results[0][0]
                        .transcript;

                setListening(false);

                if (transcript.trim()) {
                    sendVoiceMessage(
                        transcript
                    );
                }
            };

            recognition.onerror = () =>
                setListening(false);

            recognition.onend = () => {
                setListening(false);

                if (input.trim()) {
                    sendVoiceMessage(input);
                    setInput("");
                }
            };

            recognitionRef.current =
                recognition;
        }

        recognitionRef.current.start();
    };


    const sendVoiceMessage =
        async (voiceText) => {
            const userMessage = {
                sender: "user",
                text: voiceText,
            };

            setChats((prev) =>
                prev.map((chat) =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: [
                                ...chat.messages,
                                userMessage,
                            ],
                        }
                        : chat
                )
            );

            setThinking(true);

            try {
                const res =
                    await api.post(
                        "/api/chat",
                        {
                            message: voiceText,
                        }
                    );

                const aiMessage = {
                    sender: "ai",
                    text: res.data.reply,
                };

                setChats((prev) =>
                    prev.map((chat) =>
                        chat.id ===
                            activeChatId
                            ? {
                                ...chat,
                                messages: [
                                    ...chat.messages,
                                    aiMessage,
                                ],
                            }
                            : chat
                    )
                );
            } finally {
                setThinking(false);
            }
        };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {
            sender: "user",
            text: input,
        };

        setChats((prev) =>
            prev.map((chat) =>
                chat.id === activeChatId
                    ? {
                        ...chat,
                        title:
                            chat.title ===
                                "New Chat"
                                ? userMessage.text.slice(
                                    0,
                                    25
                                )
                                : chat.title,
                        messages: [
                            ...chat.messages,
                            userMessage,
                        ],
                    }
                    : chat
            )
        );

        const text = input;
        setInput("");
        setThinking(true);

        try {
            const res =
                await api.post(
                    "/api/chat",
                    {
                        message: text,
                    }
                );

            const aiMessage = {
                sender: "ai",
                text: res.data.reply,
            };

            setChats((prev) =>
                prev.map((chat) =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: [
                                ...chat.messages,
                                aiMessage,
                            ],
                        }
                        : chat
                )
            );
        } catch {
            const errorMessage = {
                sender: "ai",
                text: "Something went wrong.",
            };

            setChats((prev) =>
                prev.map((chat) =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: [
                                ...chat.messages,
                                errorMessage,
                            ],
                        }
                        : chat
                )
            );
        } finally {
            setThinking(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter")
            sendMessage();
    };
    return (
        <div className="flex h-screen bg-[#050816] text-white overflow-hidden relative">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed md:static z-40 h-full w-72
          border-r border-white/10
          bg-[#0b1020]
          backdrop-blur-xl
          p-5 flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
            >
                <div className="flex justify-between items-center md:block">
                    <button
                        onClick={createNewChat}
                        className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 transition rounded-xl py-3 px-4 w-full font-semibold"
                    >
                        <Plus size={18} />
                        New Chat
                    </button>

                    <button
                        className="md:hidden ml-3"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X />
                    </button>
                </div>

                {/* Chat list */}
                <div className="mt-8 space-y-3 flex-1 overflow-auto">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`p-3 rounded-xl transition ${activeChatId === chat.id
                                ? "bg-cyan-500/20 border border-cyan-400"
                                : "bg-white/5 hover:bg-white/10"
                                }`}
                        >
                            <div
                                onClick={() => {
                                    setActiveChatId(chat.id);
                                    setSidebarOpen(false);
                                }}
                                className="cursor-pointer"
                            >
                                {chat.title}
                            </div>

                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() =>
                                        renameChat(chat.id)
                                    }
                                    className="text-xs hover:text-cyan-400"
                                >
                                    <Pencil size={14} />
                                </button>

                                <button
                                    onClick={() =>
                                        deleteChat(chat.id)
                                    }
                                    className="text-xs hover:text-red-400"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() =>
                            navigate("/settings")
                        }
                        className="w-full flex items-center gap-2 p-3 rounded-xl hover:bg-white/10"
                    >
                        <Settings size={18} />
                        Settings
                    </button>

                    <button
                        onClick={() =>
                            navigate("/profile")
                        }
                        className="w-full flex items-center gap-2 p-3 rounded-xl hover:bg-white/10"
                    >
                        <User size={18} />
                        Profile
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col w-full">
                <div className="border-b border-white/10 p-4 md:p-5 bg-white/5 flex items-center gap-3">
                    <button
                        className="md:hidden"
                        onClick={() =>
                            setSidebarOpen(true)
                        }
                    >
                        <Menu />
                    </button>

                    <div>
                        <h1 className="text-lg md:text-xl font-semibold">
                            ThinkFlow AI
                        </h1>
                        <p className="text-xs text-gray-400 mt-1">
                            {serverMessage}
                        </p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto px-3 md:px-6 py-6 space-y-6">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[85%] md:max-w-3xl px-4 md:px-5 py-3 rounded-2xl whitespace-pre-wrap overflow-auto ${msg.sender === "user"
                                    ? "bg-cyan-500"
                                    : "bg-white/10 border border-white/10"
                                    }`}
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({
                                            children,
                                        }) {
                                            const codeText =
                                                String(
                                                    children
                                                ).trim();

                                            return (
                                                <div className="relative mt-3">
                                                    <button
                                                        onClick={() =>
                                                            copyCode(
                                                                codeText
                                                            )
                                                        }
                                                        className="absolute top-2 right-2 flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg"
                                                    >
                                                        {copied ===
                                                            codeText ? (
                                                            <>
                                                                <Check
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                                Copied
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy
                                                                    size={
                                                                        14
                                                                    }
                                                                />
                                                                Copy
                                                            </>
                                                        )}
                                                    </button>

                                                    <pre className="bg-black/40 p-4 rounded-xl overflow-x-auto pt-12">
                                                        <code>
                                                            {
                                                                codeText
                                                            }
                                                        </code>
                                                    </pre>
                                                </div>
                                            );
                                        },
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>

                                {msg.sender === "ai" && (
                                    <div className="mt-3">
                                        <button
                                            onClick={() =>
                                                speaking
                                                    ? stopSpeaking()
                                                    : speakText(
                                                        msg.text
                                                    )
                                            }
                                            className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl"
                                        >
                                            {speaking ? (
                                                <>
                                                    <Square
                                                        size={
                                                            14
                                                        }
                                                    />
                                                    Stop
                                                </>
                                            ) : (
                                                <>
                                                    <Volume2
                                                        size={
                                                            14
                                                        }
                                                    />
                                                    Read aloud
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {thinking && (
                        <div className="flex justify-start">
                            <div className="bg-white/10 border border-white/10 px-4 py-3 rounded-2xl animate-pulse">
                                ThinkFlow is thinking...
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="p-3 md:p-5 border-t border-white/10">
                    <div className="flex items-center gap-2 md:gap-3 bg-white/5 border border-white/10 rounded-2xl px-3 md:px-4 py-3">
                        <input
                            type="text"
                            placeholder="Message ThinkFlow AI..."
                            value={input}
                            onChange={(e) =>
                                setInput(
                                    e.target.value
                                )
                            }
                            onKeyDown={
                                handleKeyDown
                            }
                            className="flex-1 bg-transparent outline-none text-sm md:text-base text-white placeholder-gray-400"
                        />

                        <button
                            onClick={startListening}
                            className={`p-3 rounded-xl transition ${listening
                                ? "bg-red-500 animate-pulse"
                                : "bg-white/10 hover:bg-white/20"
                                }`}
                        >
                            {listening ? (
                                <Mic
                                    size={18}
                                />
                            ) : (
                                <MicOff
                                    size={18}
                                />
                            )}
                        </button>

                        <button
                            onClick={
                                sendMessage
                            }
                            className="bg-cyan-500 hover:bg-cyan-400 p-3 rounded-xl"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}