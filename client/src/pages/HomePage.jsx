import React, { useState } from 'react'
import { api } from '../hooks/api';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';

const HomePage = () => {
    return (
        <main className='grid grid-cols-[2fr_7fr]'>
            <Sidebar />
            <ChatContainer />
        </main>
    )
}

export default HomePage
