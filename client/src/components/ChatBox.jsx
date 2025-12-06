import React from 'react'
import SearchBar from './SearchBar'

const ChatBox = () => {
  return (
    <main className="grid grid-rows-[8fr_1fr] h-screen bg-[#1C1E22] text-white">

      <section className="px-6 py-4 overflow-y-auto"></section>

      <section className="px-20 border-t-[3px] border-[#2A2D31] bg-[#1C1E22] pt-4">
        <SearchBar onSearch={(value) => console.log("Search:", value)} />
      </section>

    </main>
  )
}

export default ChatBox
