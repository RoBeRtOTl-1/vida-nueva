import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider  = ({ children }) =>{
    const [currenUser, setCurrentUser] = useState({
        ID: '',
        NOMBRE: '',
        AP_MATERNO: '',
        AP_PATERNO: '',
        ID_ESPECIALIDAD: '',
        ID_TDU: '',
    })
    return(
        <DataContext.Provider value={{currenUser, setCurrentUser}} >
            { children }
        </DataContext.Provider>
    )
}
