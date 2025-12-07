import React from "react";
import { useSession } from "../context/SessionContext";

const Sessions = () => {
    const { sessions, currentSession, setCurrentSession } = useSession();
    console.log(sessions);


    return (
        <div className="w-full mt-4 flex flex-col gap-1 overflow-y-auto max-h-[70vh] custom-scroll px-1">

            <p className="text-[12px] font-semibold text-gray-300 tracking-wider uppercase px-3 mb-2">
                Conversations
            </p>

            {sessions.length === 0 && (
                <p className="text-gray-600 text-sm text-center py-2">No sessions yet</p>
            )}

            {sessions.map((session, idx) => {
                const isActive = currentSession?.sessionId === session.sessionId;

                return (
                    <div
                        key={idx}
                        onClick={() => setCurrentSession(session)}
                        className={`relative cursor-pointer rounded-lg px-4 py-3 transition-all duration-150
                ${isActive
                                ? "bg-[#1F2024]"
                                : "hover:bg-[#1A1B1F]"
                            }`}
                    >

                        {isActive && (
                            <div className="absolute left-0 top-0 h-full w-[3px] bg-indigo-400 rounded-r-md" />
                        )}

                        {session.chats && session.chats.length > 0 ? (
                            <p className="text-gray-200 text-[14px] leading-snug line-clamp-1">
                                {session.chats[session.chats.length - 1].prompt}
                            </p>
                        ) : (
                            <p className="text-gray-500 text-[13px]">No messages yet</p>
                        )}
                    </div>
                );
            })}

            <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #222327;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
        </div>
    );
};

export default Sessions;
