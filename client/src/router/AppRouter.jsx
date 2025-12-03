import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleWrapper = () => {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <LandingPage />
        </GoogleOAuthProvider>
    )
}

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/welcome" replace />} />
                <Route path="/welcome" element={<GoogleWrapper />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
