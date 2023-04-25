import React, {useEffect} from "react";
import Header from "./Header";

import { useNavigate } from "react-router-dom"
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

export default function Recepcionista() {
    const navigate = useNavigate()
    
    const hanndleSer = () =>{
        navigate('/Recepcionista/Servicios')
    }

    const hanndleEsp = () =>{
        navigate('/')
    }


    return (
        <div>
            <Header />
            <section className="align-items-center" style={{ height: "625px" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h2 style={{ color: "blue" }}>Bienvenido, seleccione su opción</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center my-3">

                        <div className="col-auto">

                            <Button className="btn btn-primary me-3 bg-light text-black text-start" style={{ border: "1px solid black" }} onClick={hanndleSer}>
                                Servicios
                                <br />
                                Selecione un servicio de consulta o estudio
                                <img src="src/css/img/recepcionista/Servicios.png" alt="" style={{ width: "118px", borderRadius: '10px' }} />
                            </Button>

                            <Button className="btn btn-primary bg-light text-black " style={{ border: "1px solid black" }}>
                                Especialidad
                                <br />
                                Seleccione una especialidad y agende una cita
                                <img src="src/css/img/recepcionista/Especialista.png" alt="" style={{ width: "100px", borderRadius: '10px' }} />
                            </Button>


                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}