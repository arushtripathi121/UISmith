import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { api } from '../hooks/api';
import { useUser } from '../context/UserContext';
import { useSession } from '../context/SessionContext';


const GoogleWrapper = () => {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <LandingPage />
        </GoogleOAuthProvider>
    )
}

const AppRouter = () => {
    const { user, setUser } = useUser();
    const { sessions, setSessions } = useSession();

    async function getSessions() {
        const response = await api.get('/sessions/user');
        setSessions(response.data.sessions);
    }

    async function verifyAuth() {
        const response = await api.get('/authVerify');
        setUser(response.data.user);
    }

    useEffect(() => {
        verifyAuth();
        getSessions();
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/welcome" replace />} />
                {user && <Route path="/welcome" element={<Navigate to="/home" replace />} />}
                <Route path="/welcome" element={<GoogleWrapper />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
