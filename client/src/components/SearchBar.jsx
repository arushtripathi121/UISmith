import React, { useState, useRef } from "react";
import { FiMic, FiSquare } from "react-icons/fi";
import { api } from "../hooks/api";
import { useSession } from "../context/SessionContext";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [interim, setInterim] = useState("");
    const [listening, setListening] = useState(false);
    const [loading, setLoading] = useState(false);

    const { currentSession, setCurrentSession } = useSession();

    const textareaRef = useRef(null);
    const recognitionRef = useRef(null);

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognitionRef.current = recognition;
        setListening(true);
        setInterim("");
        recognition.start();

        recognition.onresult = (e) => {
            let finalText = "";
            let interimText = "";

            for (let i = e.resultIndex; i < e.results.length; i++) {
                const result = e.results[i];
                if (result.isFinal) finalText += result[0].transcript + " ";
                else interimText += result[0].transcript;
            }

            if (finalText) {
                setQuery((prev) => {
                    const updated = (prev + " " + finalText).trim();
                    setTimeout(() => {
                        if (textareaRef.current) {
                            textareaRef.current.style.height = "auto";
                            textareaRef.current.style.height =
                                Math.min(textareaRef.current.scrollHeight, 160) + "px";
                        }
                    }, 10);
                    return updated;
                });
            }

            setInterim(interimText);
        };

        recognition.onerror = () => setListening(false);
        recognition.onend = () => setListening(false);
    };

    const stopListening = () => {
        if (recognitionRef.current) recognitionRef.current.stop();
        setListening(false);
        setInterim("");
    };

    const handleResponse = async () => {
        if (!query.trim() || loading) return;

        setLoading(true);

        try {
            const res = await api.post("/response", {
                prompt: query,
                sessionId: currentSession?._id || null
            });

            const newSessionId = currentSession?._id || res.data.chat.sessionId;

            const newChat = {
                prompt: res.data.chat.prompt,
                response: res.data.chat.response
            };

            setCurrentSession(prev => ({
                _id: newSessionId,
                chats: [...(prev?.chats || []), newChat]
            }));

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full relative">
            <div className="w-full flex items-center gap-3 bg-[#17181C] border border-[#2A2B30] rounded-2xl px-4 py-3 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden">

                <textarea
                    ref={textareaRef}
                    rows={1}
                    placeholder="Type or speak..."
                    value={
                        listening && interim
                            ? query + (interim ? " " + interim : "")
                            : query
                    }
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent resize-none text-gray-100 placeholder-gray-500 focus:outline-none text-[15px] leading-relaxed z-10 no-scrollbar"
                    style={{
                        maxHeight: "160px",
                        overflow: "hidden",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none"
                    }}
                    onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height =
                            Math.min(e.target.scrollHeight, 160) + "px";
                    }}
                />

                {listening ? (
                    <button
                        onClick={stopListening}
                        className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition transform hover:scale-105 shadow-[0_0_12px_#EF4444] cursor-pointer"
                    >
                        <FiSquare className="text-xl text-white" />
                    </button>
                ) : (
                    <button
                        onClick={startListening}
                        className="p-2 rounded-full bg-[#1A1B1F] border border-[#3C3D42] hover:bg-[#222329] hover:scale-105 transition shadow-[0_0_10px_rgba(99,102,241,0.6)] cursor-pointer"
                    >
                        <FiMic className="text-xl text-gray-100" />
                    </button>
                )}

                <button
                    onClick={handleResponse}
                    disabled={loading || !query.trim()}
                    className={`px-5 py-2 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 transition shadow-sm border ${loading || !query.trim()
                        ? "bg-[#202125] text-gray-500 border-[#2A2B30] cursor-not-allowed"
                        : "bg-[#F9FAFB] text-black border-transparent hover:scale-105 cursor-pointer"
                        }`}
                >
                    {loading ? (
                        <>
                            <span className="inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-black animate-spin" />
                            <span>Designing...</span>
                        </>
                    ) : (
                        "Design"
                    )}
                </button>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default SearchBar;
