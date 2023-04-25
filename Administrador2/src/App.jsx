import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import Recepcionista from "./components/Recepcionista/ContPrincipal";

import { Routes, Route, Link } from "react-router-dom";
import UserCurrRol from "./components/UserCurrRol";

import Login from "./components/Login/Login"
import Condicional from "./components/SOCKETS/Condicional"
import Turnos from "./components/Turnos/Turnos"
import Asidebar from "./components/Administrador/Asidebar";
import Especialista from "./components/MEspecialista/Esp"
import General from "./components/MGeneral/Principal"
import Servicios from "./components/Recepcionista/Servicios/Servicios"
//import Recepcionista from "./components/Recepcionista/ContPrincipal"


//import { io } from "socket.io-client"
//const socket = io('http://localhost:4000')

export default function App() {
    const [user, setUser] = useState(false)

    const login = () => {
        setUser(true)
    }

    const logout = () => {
        setUser(null)
    }



    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Ventanas" element={<UserCurrRol />} />
                <Route path="/Condicional" element={<Condicional />} />
                <Route path="/Turnos" element={<Turnos />} />
                <Route path="/Especialista" element={<Especialista />} />
                <Route path="/General" element={<General />} />
                <Route path="/Administrador" element={<Asidebar />} />
                <Route path="/Recepcionista" element={<Recepcionista />} />
                <Route path="/Recepcionista/Servicios" element={<Servicios />} />


                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </>

    )
}


