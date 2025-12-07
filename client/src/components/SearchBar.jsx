import React, { useState, useRef } from "react";
import { FiMic, FiSquare } from "react-icons/fi";
import { api } from "../hooks/api";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [interim, setInterim] = useState("");
    const [listening, setListening] = useState(false);

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
        const response = await api.post('/response', {
            prompt: query
        });
    }

    return (
        <div className="w-full relative">
            <div className="w-full flex items-center gap-3 bg-[#26292E] border border-[#3A3D41] rounded-2xl px-4 py-3 shadow-[0_0_12px_rgba(0,0,0,0.4)] relative overflow-hidden">

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
                    className="flex-1 bg-transparent resize-none text-white placeholder-gray-500 focus:outline-none text-base leading-relaxed z-10 no-scrollbar"
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
                        className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition transform hover:scale-105 shadow-[0_0_10px_#EF4444]"
                    >
                        <FiSquare className="text-xl text-white" />
                    </button>
                ) : (
                    <button
                        onClick={startListening}
                        className="p-2 rounded-full bg-[#26292E] border border-[#3A3D41] hover:scale-105 transition shadow-[0_0_10px_#6366F1]"
                    >
                        <FiMic className="text-xl text-white" />
                    </button>
                )}

                <button
                    onClick={handleResponse}
                    className="px-5 py-2 bg-white text-black font-semibold rounded-xl hover:scale-105 transition shadow-sm"
                >
                    Design
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
