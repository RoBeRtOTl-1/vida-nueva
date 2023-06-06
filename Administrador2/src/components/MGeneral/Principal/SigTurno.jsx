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

        <div className="rounded-4 pt-3 mt-4 border-gray shadow-custom" style={{ width: "111%", height: "630px" }} >
            <div className="container-fluid mt-4 d-flex justify-content-evenly" >
                <div className="col-12" >

                    <div className="row justify-content-evenly">
                        <div className="col-5">

                            <Button disabled={btn1}
                                onClick={avanzarTurno}
                                className=""
                                color="secondary"
                                style={{ fontSize: '20px' }}
                                variant="contained"
                            >
                                <img src="\src\css\img\Medico\Turnos\Bocina.png" style={{ width: "15%" }} />
                                &nbsp; Avanzar turno
                            </Button>
                        </div>
                    </div>


                    <div className="row justify-content-evenly">
                        <div className=" col-sm-5 bg-success h-50 mt-5">
                            <p>Turno llamado: {turno ? turno.ID_TURNO : null}</p>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-12 d-flex  mt-5 justify-content-center">

                            <Button
                                disabled={btn2}
                                onClick={() => hanndleTurno(3)}
                                color="success"
                                variant="contained"
                            >
                                Atendido
                            </Button>

                            <Button
                                disabled={btn3}
                                onClick={() => hanndleTurno(5)}
                                variant="contained"
                                color="error"
                            >
                                Cancelado
                            </Button>
                            
                        </div>
                    </div>

                </div>


            </div>
        </div>

    );
}
