import React from 'react'
import { useUser } from '../context/UserContext'
import { FiUser, FiMail } from "react-icons/fi";
import Sessions from './Sessions';

const Sidebar = () => {

    const { user } = useUser();

    return (
        <main className="bg-[#1C1E22] min-h-screen max-h-screen text-white flex flex-col items-center border-l-[3px] border-[#2A2D31]">

            <header className="w-full py-6 flex justify-center">
                <div className="flex items-center space-x-2">
                    <span className="text-5xl font-extrabold tracking-widest text-indigo-300 uppercase">
                        UI
                    </span>
                    <span className="text-3xl font-light tracking-wide text-gray-200">
                        Smith
                    </span>
                </div>
            </header>

            <section className="relative w-full flex justify-center mt-4">
                <div className="group">
                    <p className="text-lg font-medium text-gray-200 cursor-pointer">
                        Welcome, <span className="text-indigo-300">{user?.user_name}</span>
                    </p>

                    <aside className="absolute left-1/2 -translate-x-1/2 mt-3
                hidden group-hover:flex flex-col items-center 
                bg-[#26292E] border border-[#3A3D41] rounded-xl p-5
                shadow-lg w-60 z-20">

                        <img
                            src={user?.userProfileURL}
                            alt="Profile"
                            className="w-16 h-16 rounded-full border border-[#3A3D41] object-cover"
                        />

                        <div className="mt-3 w-full space-y-2 text-left">
                            <div className="flex items-center gap-2 text-gray-100">
                                <FiUser className="text-indigo-300" />
                                <span className="text-sm">{user?.user_name}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-400">
                                <FiMail className="text-gray-400" />
                                <span className="text-xs break-all">{user?.user_email}</span>
                            </div>
                        </div>

                    </aside>
                </div>
            </section>

            <section>
                <Sessions />
            </section>

        </main>

    )
}

export default Sidebar
