import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { _, Grid } from 'gridjs-react';


import { io } from "socket.io-client";
import { BD_Turnos_Actuales, actualizarTurno } from "../../firebase/Turnos/TURN_CRUD";

export default function SigTurno() {
    const socket = io("http://localhost:4000"); // Cambiar la URL por la del servidor Socket.io
    const [turno, setTurno] = useState('');
    const [btn1, setBtn1] = useState(false)
    const [btn2, setBtn2] = useState(true)
    const [btn3, setBtn3] = useState(true)
    const [btn4, setBtn4] = useState(true)



    useEffect(() => {
        BD_Turnos_Actuales().then((data) => {
            socket.emit("DatosActuales", data);
          })

        socket.on("setNextTurno", (nuevturno) => {
            if (nuevturno) {
                actualizarTurno(nuevturno.ID, 6)
                setBtn1(true)
                setBtn2(false)
                setBtn3(false)
                setBtn4(false)
                setTurno(nuevturno);
            }

        });

    }, []);

    const avanzarTurno = () => {
        socket.emit("avanzarTurno"); // Enviar evento al servidor para avanzar el turno
        setBtn1(true)
        setBtn2(false)
        setBtn3(false)
        setBtn4(false)

    };

    const hanndleTurno = (estado) => {
        actualizarTurno(turno.ID, estado)

        setTurno("")

        setBtn1(false)
        setBtn2(true)
        setBtn3(true)
        setBtn4(true)

    }
    return (
        <div className="rounded-4 pt-3 mt-5 border-gray shadow-custom h-100"
            style={{ width: "1250px" }}>
            <Button disabled={btn1} onClick={avanzarTurno}>Avanzar turno</Button>

            <p>Turno llamado: {turno ? turno.ID_TURNO : null}</p>

            <Button disabled={btn2} onClick={() => hanndleTurno(3)}>Atendido</Button>

            <Button disabled={btn3} onClick={() => hanndleTurno(5)}>Cancelado</Button>

            <Button disabled={btn4} >Volver a llamar</Button>



        </div>
    );
}
