import React, { useState } from 'react'
import { api } from '../hooks/api';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';

const HomePage = () => {

    const [prompt, setPrompt] = useState();
    const [response, setResponse] = useState();

    const handleSumbit = () => {
        getResponse();
    }

    const getResponse = async () => {
        const response = api.post('/response', {
            prompt: prompt
        });
        setResponse(response.data);
    }
    return (
        <main className='grid grid-cols-[2fr_7fr]'>
            <Sidebar />
            <ChatContainer />
        </main>
    )
}

export default HomePage
