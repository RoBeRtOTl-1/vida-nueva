import React, { createContext, useState, useEffect } from "react";
import { getCounters } from "../components/firebase/Turnos/TURN_CRUD";

export const CountContext = createContext();

export const CountProvider = ({ children }) => {
    const [countServ, setCountServ] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const data = await getCounters();
        setCountServ( ...data);
    }
    return (
        <CountContext.Provider value={{ countServ, setCountServ }}>
            {children}
        </CountContext.Provider>
    );
};
