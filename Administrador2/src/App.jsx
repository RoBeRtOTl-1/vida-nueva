import React, { createContext, useState } from "react"
import ReactDOM from "react-dom/client"
import Recepcionista from "./components/Recepcionista/ContPrincipal";

import { Routes, Route, Link } from "react-router-dom";
import UserCurrRol from "./components/UserCurrRol";

import Login from "./components/Login/Login"
import Condicional from "./components/SOCKETS/Condicional"
import Turnos from "./components/Turnos/Turnos"
import Asidebar from "./components/Administrador/Asidebar";
import Especialista from "./components/MEspecialista/Principal"
import General from "./components/MGeneral/Principal"
import Servicios from "./components/Recepcionista/Servicios/Servicios"
import Especialidad from "./components/Recepcionista/Especialidad/Especialidades"
//import Recepcionista from "./components/Recepcionista/ContPrincipal"

//import { io } from "socket.io-client"
//const socket = io('http://localhost:4000')

import { DataProvider } from "./context/UserContext";
import { CountProvider } from "./context/CountContext";
import Expediente from "./components/View-pdf/viewPDF";

export default function App() {
    return (
        <DataProvider>
            <CountProvider>

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
                    <Route path="/Recepcionista/Especialidad" element={<Especialidad />} />
                    <Route path="/Expediente" element={<Expediente />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </CountProvider>
        </DataProvider>

    )
}


