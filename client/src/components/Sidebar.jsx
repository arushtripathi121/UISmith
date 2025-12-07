import React from "react";
import { useUser } from "../context/UserContext";
import { FiUser, FiMail } from "react-icons/fi";
import Sessions from "./Sessions";
import { useSession } from "../context/SessionContext";

const Sidebar = () => {
    const { user } = useUser();
    const { currentSession, setCurrentSession } = useSession();

    return (
        <main className="bg-[#0E0F12] min-h-screen max-h-screen w-full text-white flex flex-col border-r border-[#1E1F23] shadow-[3px_0_18px_rgba(0,0,0,0.35)]">

            <header className="w-full py-8 flex justify-center border-b border-[#1E1F23] bg-[#16171B] shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-extrabold tracking-widest text-[#A6B4FF] uppercase">
                        UI
                    </span>
                    <span className="text-2xl font-light tracking-wide text-gray-300">
                        Smith
                    </span>
                </div>
            </header>

            <section className="relative flex justify-center mt-6">
                <div className="group text-center">
                    <p className="text-lg font-medium text-gray-200 cursor-pointer">
                        Welcome, <span className="text-[#A6B4FF]">{user?.user_name}</span>
                    </p>

                    <aside className="absolute left-1/2 -translate-x-1/2 mt-4 hidden group-hover:flex flex-col items-center bg-[#1A1C20] border border-[#2A2B30] rounded-2xl p-6 shadow-[0_6px_20px_rgba(0,0,0,0.35)] w-64 z-20">

                        <img
                            src={user?.userProfileURL}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-2 border-[#2A2B30] object-cover shadow-[0_0_12px_rgba(0,0,0,0.35)]"
                        />

                        <div className="mt-4 w-full space-y-3 text-left">

                            <div className="flex items-center gap-3 text-gray-100">
                                <FiUser className="text-[#A6B4FF] text-lg" />
                                <span className="text-sm">{user?.user_name}</span>
                            </div>

                            <div className="flex items-center gap-3 text-gray-400">
                                <FiMail className="text-gray-400 text-lg" />
                                <span className="text-xs break-all">{user?.user_email}</span>
                            </div>

                        </div>

                    </aside>
                </div>
            </section>

            <section className="px-6 mt-4">
                <button
                    onClick={() => currentSession && setCurrentSession(null)}
                    disabled={!currentSession}
                    className={`w-full py-3 rounded-xl font-semibold tracking-wide 
                        transition-all shadow-[0_3px_10px_rgba(0,0,0,0.35)]
                        cursor-pointer
                        ${currentSession
                            ? "bg-[#6F7DFF] hover:bg-[#5D6BFF] text-white"
                            : "bg-[#3A3B40] text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Start New Conversation
                </button>
            </section>

            <section className="flex-1 overflow-hidden px-4 mt-4 text-center">
                <div className="bg-[#0E0F12] rounded-2xl px-4 h-full">
                    <Sessions />
                </div>
            </section>

        </main>
    );
};

export default Sidebar;
