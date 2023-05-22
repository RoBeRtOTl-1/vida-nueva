import React, { useEffect, useState } from "react";
import Agenda from "./Agenda/Agenda";

// import SigTurno from "./Principal/SigTurno"
// import Pacientes from "./Pacientes/Pacientes";
// import VisualizarPDF from "./Pacientes/VisualizarPDF";
// import { PDFViewer } from "@react-pdf/renderer";

export default function Especialista() {
    const [fechaHora, setFechaHora] = useState('');

    const [title, setTitle] = useState("Principal")
    const [image, setImage] = useState('src/css/img/asidebar/Principal.png')

    const [contenido, setContenido] = useState(<Agenda />)

    useEffect(() => {
        const intervalId = setInterval(() => mostrarFechaHora(), 1000);
        return () => clearInterval(intervalId);
    }, []);

    function mostrarFechaHora() {
        const fecha = new Date();
        const dia = fecha.getDate();
        const mes = fecha.toLocaleString('default', { month: 'long' });
        const anio = fecha.getFullYear();
        let fechaHoraFormateada = `${dia} de ${mes} ${anio}`;
        setFechaHora(fechaHoraFormateada);
    }


    function handleTitle(newTitle, newImg) {
        setTitle(newTitle)
        setImage(newImg)
    }


    function handleContenido(newContenido) {
        switch (newContenido) {
            case "Principal":
                setContenido(<SigTurno />)
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
                                    handleTitle("Principal", "src/css/img/asidebar/Principal.png");
                                    handleContenido("Principal");
                                }}  >
                                    <img src="src/css/img/asidebar/Principal.png" width={'35px'} />
                                    <span className="link_name">Principal</span>
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
                            {/* <PDFViewer style={{ width: "100%", height: '90vh'}}> */}
                                {contenido}
                            {/* </PDFViewer> */}

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

