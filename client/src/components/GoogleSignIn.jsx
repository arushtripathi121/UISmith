import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../hooks/api';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const GoogleSignIn = () => {

    const navigate = useNavigate();
    const responseGoogle = async (authResult) => {
        try {
            if (authResult['code']) {
                const result = await googleAuth(authResult['code']);
                console.log(result);
                navigate('/home')
            }
        }
        catch (err) {
            console.log('error in loging in', err);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
    })
    return (
        <div className='border border-1-black w-60 rounded-3xl px-5 py-2 text-center font-bold' onClick={googleLogin}>
            <p className='flex flex-row items-center justify-center gap-2 cursor-pointer'><span><FaGoogle /></span>Sign In Using Google</p>
        </div>
    )
}

export default GoogleSignIn
