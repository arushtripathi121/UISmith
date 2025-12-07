import React from 'react'
import { useSession } from '../context/SessionContext'

const Sessions = () => {

    const { sessions } = useSession();

    return (
        <div className="w-full px-4 mt-6 flex flex-col gap-3 overflow-y-auto max-h-[70vh]">

            <p className="text-sm font-semibold text-gray-300 tracking-wide uppercase text-center">
                Conversations
            </p>

            {sessions.length === 0 && (
                <p className="text-gray-500 text-sm">No sessions yet</p>
            )}

            {sessions.map((session, idx) => (
                <div
                    key={idx}
                    className="bg-[#26292E] border border-[#3A3D41] rounded-xl p-4 cursor-pointer 
                    hover:border-indigo-300 transition-all duration-200"
                >
                    {session.chats && session.chats.length > 0 ? (
                        <p className="text-gray-300 text-xs mt-1 line-clamp-1">
                            {session.chats[session.chats.length - 1].prompt}
                        </p>
                    ) : (
                        <p className="text-gray-500 text-xs mt-1">
                            No messages yet
                        </p>
                    )}
                </div>
            ))}

        </div>
    )
}

export default Sessions
