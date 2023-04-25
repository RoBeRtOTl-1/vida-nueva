
import React, { useEffect, useState } from "react"
import Principal from "./principal/Principal"
import Usuarios from "./usuarios/Usuarios";
import TiposUsuario from "./tiposUsuario/TiposUsuario"
import Publicidad from "./publicidad/Publicidad"
import Turnos from "./turnos/Turnos"
import Horarios from "./horarios/Horarios"
import Especialidades from "./especialidades/Especialidades"
import Citas from "./citas/Citas"


export default function Asidebar() {

    const [fechaHora, setFechaHora] = useState('');
    useEffect(() => {
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

    const [title, setTitle] = useState("Turnos del día")
    const [image, setImage] = useState()

    function handleTitle(newTitle, newImg) {
        setTitle(newTitle)
        setImage(newImg)
    }


    const [contenido, setContenido] = useState(Principal)

    function handleContenido(newContenido) {
        switch (newContenido) {
            case "Principal":
                setContenido(<Principal />)
                break;
            case "Usuarios":
                setContenido(<Usuarios />)
                break;
            case "Tipos de usuarios":
                setContenido(<TiposUsuario />)
                break;
            case "Publicidad":
                setContenido(<Publicidad />)
                break;
            case "Turnos":
                setContenido(<Turnos />)
                break;
            case "Horarios":
                setContenido(<Horarios />)
                break;
            case "Especialidades":
                setContenido(<Especialidades />)
                break;

            case "Citas":
                setContenido(<Citas />)
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
                                    handleTitle("Turnos del día");
                                    handleContenido("Principal");
                                }}  >
                                    <img src="src/css/img/asidebar/Principal.png" width={'35px'} />
                                    <span className="link_name">Principal</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" onClick={() => {
                                    handleTitle("Usuarios", "src/css/img/asidebar/Usuarios.png");
                                    handleContenido("Usuarios");
                                }}>
                                    <img src="src/css/img/asidebar/Usuarios.png" width={'35px'} />
                                    <span className="link_name">Usuarios</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" onClick={() => {
                                    handleTitle("Tipos de usuarios", "src/css/img/asidebar/Rol.png");
                                    handleContenido("Tipos de usuarios");
                                }}>
                                    <img src="src/css/img/asidebar/Rol.png" width={'35px'} />
                                    <span className="link_name">Tipos de usuarios</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" onClick={() => {
                                    handleTitle("Horarios", "src/css/img/asidebar/Horario.png")
                                    handleContenido("Horarios")
                                }}>
                                    <img src="src/css/img/asidebar/Horario.png" width={'35px'} />
                                    <span className="link_name">Horarios</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" onClick={() => {
                                    handleTitle("Publicidad", "src/css/img/asidebar/Publicidad.png")
                                    handleContenido("Publicidad");
                                }}>
                                    <img src="src/css/img/asidebar/Publicidad.png" width={'35px'} />
                                    <span className="link_name">Publicidad</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" onClick={() => {
                                    handleTitle("Turnos", "src/css/img/asidebar/Turnos.png")
                                    handleContenido("Turnos");
                                }}>
                                    <img src="src/css/img/asidebar/Turnos.png" width={'35px'} />
                                    <span className="link_name">Turnos</span>
                                </a>
                            </li>


                            <li>
                                <a href="#" onClick={() => handleTitle("Estadisticas", "src/css/img/asidebar/Estadisticas.png")}>
                                    <img src="src/css/img/asidebar/Estadisticas.png" width={'35px'} />
                                    <span className="link_name">Estadisticas</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" onClick={() => {
                                    handleTitle("Citas", "src/css/img/asidebar/Citas.png")
                                    handleContenido("Citas")
                                }}>
                                    <img src="src/css/img/asidebar/Citas.png" width={'35px'} />
                                    <span className="link_name">Citas</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" onClick={() => {
                                    handleTitle("Especialidades", "src/css/img/asidebar/Especialidades.png")
                                    handleContenido("Especialidades")
                                }}>
                                    <img src="src/css/img/asidebar/Especialidades.png" width={'35px'} />
                                    <span className="link_name">Especialidades</span>
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
                            {contenido}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}