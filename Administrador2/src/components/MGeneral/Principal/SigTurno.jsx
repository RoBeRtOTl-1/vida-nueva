import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { _, Grid } from 'gridjs-react';


import { io } from "socket.io-client";

export default function SigTurno() {
    const socket = io("http://localhost:4000"); // Cambiar la URL por la del servidor Socket.io
    const [turno, setTurno] = useState('');

    useEffect(() => {
        socket.on("setNextTurno", (nuevturno) => {
            setTurno("");
            setTurno(nuevturno);
        });

    }, []);

    const avanzarTurno = () => {
        socket.emit("avanzarTurno"); // Enviar evento al servidor para avanzar el turno
    };

    return (
        <div className="rounded-4 pt-3 mt-5 border-gray shadow-custom h-100"
            style={{ width: "1250px" }}>
            <Button onClick={avanzarTurno}>Avanzar turno</Button>
            <p>Turno llamado: {turno}</p>


        </div>
    );
}
