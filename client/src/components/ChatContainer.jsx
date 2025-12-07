import React from 'react'
import ChatBox from './ChatBox'
import SearchBar from './SearchBar'
import { useSession } from '../context/SessionContext'

const ChatContainer = () => {
  const { currentSession } = useSession();

  return (
    <main className="bg-[#121317] h-screen text-white border-l-[3px] border-[#2A2B30] grid grid-rows-[8fr_1fr]">

      {currentSession ? (
        <ChatBox />
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-[#121317]">
          <p className="text-6xl font-bold text-gray-300 mb-4">UISmith</p>
          <p className="text-gray-400 text-lg">Start a new session to begin chatting</p>
        </div>
      )}

      <section className="px-20 border-t-[3px] border-[#2A2B30] bg-[#17181C] pt-4 pb-6 shadow-[0_-6px_20px_rgba(0,0,0,0.4)]">
        <SearchBar />
      </section>
    </main>
  )
}

export default ChatContainer
