import { createContext, useContext, useState } from "react";

export const DisplayContext = createContext();

export const DisplayModeProvider = ({ children }) => {
    const [mode, setMode] = useState('dark');

    return (
        <DisplayContext.Provider value={{ mode, setMode }}>
            {children}
        </DisplayContext.Provider>
    )
}

export const useMode = () => useContext(DisplayContext);