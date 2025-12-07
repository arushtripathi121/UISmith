import { createContext, useContext, useState } from "react";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
    const [sessions, setSessions] = useState([]);

    return (
        <SessionContext.Provider value={{sessions, setSessions}}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);