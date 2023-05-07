import React from "react";
import Header from "../Header";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
    Box
} from '@mui/material'
import { useNavigate } from "react-router-dom";
import Agregar from "./Agregar";

export default function Recepcionista() {
    const navigate = useNavigate()

    const hanndleSalir = () => {
        navigate('/Recepcionista')
    }

    return (
        <div>
            <Header />
            <section className="d-flex align-items-center" style={{ height: "625px" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h1 style={{ color: "blue" }}>Registros de consultas medicas</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center my-3">

                        <div className="col-auto">
                            <div className="row justify-content-center mt-5 ">
                                <div className="d-flex justify-content-evenly" style={{ height: "100px" }}>
                                    <div className="col-4 ">
                                        <Agregar servicio={"Aplicación de inyeccion"} id={'AI'} />
                                    </div>
                                    <div className="col-4 ms-5">
                                        <Agregar servicio={"Consulta Médica"} id={'CM'} />
                                    </div>
                                    <div className="col-4 ms-5">
                                        <Agregar servicio={"Toma de presion"} id={'TP'} />
                                    </div>
                                </div>
                                <div className="col-4 mt-5" style={{ height: "100px", paddingLeft: "20px" }}>
                                    <Agregar servicio={"Certificado Médico"} id={'CE'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div className="row">
                    <div className="col-1 fixed-bottom mb-3 ml-3">
                        <Button className="bg-danger text-white border border-black text-black"
                            style={{ width: "100%", height: "100%" }}
                            onClick={hanndleSalir}>
                            Volver
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    )
}

