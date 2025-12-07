import { createContext, useContext, useState } from "react";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState();

    return (
        <SessionContext.Provider value={{sessions, setSessions, currentSession, setCurrentSession}}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);