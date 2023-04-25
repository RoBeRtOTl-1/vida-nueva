import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function General() {
    const socket = io("http://localhost:4000"); // Cambiar la URL por la del servidor Socket.io
    const [turno, setTurno] = useState('')
    const [fechaHora, setFechaHora] = useState('');
    useEffect(() => {
        socket.on("setNextTurno", (nuevturno) => {
            setTurno("");
            setTurno(nuevturno);
        });

        function mostrarFechaHora() {
            const fecha = new Date();
            const dia = fecha.getDate();
            const mes = fecha.toLocaleString('default', { month: 'long' });
            const anio = fecha.getFullYear();

            let fechaHoraFormateada = `${dia} de ${mes} ${anio}`;

            setFechaHora(fechaHoraFormateada);
        }
        const intervalId = setInterval(mostrarFechaHora, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const [title, setTitle] = useState("Principal")
    const [image, setImage] = useState()

    function handleTitle(newTitle, newImg) {
        setTitle(newTitle)
        setImage(newImg)
    }

    const avanzarTurno = () => {
        socket.emit("avanzarTurno"); // Enviar evento al servidor para avanzar el turno

    };

    const [contenido, setContenido] = useState('')

    function handleContenido(newContenido) {
        switch (newContenido) {
            case "Principal":
                //setContenido(<Principal />)
                break;
            case "Usuarios":
                //setContenido(<Usuarios />)
                break;
            case "Tipos de usuarios":
                //setContenido(<TiposUsuario />)
                break;
            case "Publicidad":
                //setContenido(<Publicidad />)
                break;
            case "Turnos":
                //setContenido(<Turnos />)
                break;
            case "Horarios":
                //setContenido(<Horarios />)
                break;
            case "Especialidades":
                //setContenido(<Especialidades />)
                break;

            case "Citas":
                //setContenido(<Citas />)
                break;

        }
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2">
                    <div className="sidebar">
                        <div className="logo-details">
                            <img src="src/css/img/asidebar/logo.png" width={'43px'} />
                            <span className="logo_name">Vida nueva <br /> system</span>
                        </div>
                        <br style={{ backgroundColor: "green" }} />

                        <hr className="border" />
                        <ul className="nav-links">
                            <li>
                                <a href="#" onClick={() => {
                                    handleTitle("Principal");
                                    handleContenido("Principal");
                                }}  >
                                    <img src="src/css/img/asidebar/Principal.png" width={'35px'} />
                                    <span className="link_name">Principal</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" onClick={() => {
                                    handleTitle("Expedientes", "src/css/img/asidebar/Usuarios.png");
                                    handleContenido("Usuarios");
                                }}>
                                    <img src="src/css/img/asidebar/Usuarios.png" width={'35px'} />
                                    <span className="link_name">Expedientes</span>
                                </a>
                            </li>

                            
                            

                        </ul>
                    </div>

                </div>


                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-12">
                            <nav id="header" className="navbar shadow rounded-4 d-flex mt-3 pt-2" style={{ backgroundColor: "#FFFFFF", width: "1250px" }}>
                                <div className="container-fluid " style={{ color: "#000000" }}>
                                    <img src={image} width={'35px'} />
                                    <div className="navbar-brand me-auto text-start" style={{ paddingLeft: "10px" }}>{title}</div>
                                    <div className="navbar-text border rounded border-gray shadow-custom p-3 d-flex align-items-center" style={{ color: "#000000", justifyContent: "center" }}>{fechaHora}</div>

                                </div>
                            </nav>
                        </div>

                        <div className="col-sm-12 " >
                            <Button onClick={avanzarTurno}>Avanzar turno</Button>
                            <p>Turno llamado: {turno}</p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}