import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../hooks/api';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {

    const navigate = useNavigate();

    const responseGoogle = async (authResult) => {
        try {
            if (authResult.code) {
                const result = await googleAuth(authResult.code);
                console.log(result);
                navigate('/home');
            }
        } catch (err) {
            console.log('error in logging in', err);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
    });

    return (
        <div
            className="w-[230px] rounded-full border border-gray-300 bg-white shadow-sm cursor-pointer
                       transform transition-all duration-300 ease-in-out
                       hover:scale-[1.03] hover:shadow-md
                       active:scale-[0.98] active:bg-gray-100 active:shadow-none"
            onClick={() => googleLogin()}
        >
            <p className="flex items-center justify-center py-2 px-2 text-center text-gray-950">
                <span className="mr-2 shrink-0">
                    <img src="/google.png" alt="Google logo" className="h-8 w-8" />
                </span>
                <span className="font-bold text-lg">Sign In Using Google</span>
            </p>
        </div>
    );
}

export default GoogleSignIn;
