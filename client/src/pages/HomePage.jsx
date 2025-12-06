import React, { useState } from 'react'
import { api } from '../hooks/api';

const HomePage = () => {

    const [prompt, setPrompt] = useState();
    const [response, setResponse] = useState();

    const handleSumbit = () => {
        getResponse();
    }

    const getResponse = async () => {
        const response = api.post('/response',{
            prompt: prompt
        });
        setResponse(response.data);
    }
    return (
        <div>
            <div>
                <input onChange={(e) => setPrompt(e.target.value)} type='text' placeholder='prompt' />
            </div>
            <div onClick={handleSumbit}>
                ask
            </div>
            <div>
                {response}
            </div>
        </div>
    )
}

export default HomePage
