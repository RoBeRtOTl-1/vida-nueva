import React, { useEffect, useState } from 'react';
import Header from "../Header";
import AgregarCitaEspecialidad from "./AgregarCitaEspecialidad.jsx";
import { DatoDeLaBDActivos } from '../../firebase/Especialides/ESP_CRUD';
import { useNavigate } from 'react-router-dom';
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

const Especialidades = () => {


    const [especialidades, setEspecialidades] =  useState([]);

    const navigate = useNavigate()

    const hanndleSalir = () => {
        navigate('/Recepcionista')
    }
    async function obtenerDatos() {
        setEspecialidades([])
        const datosBD = await DatoDeLaBDActivos();
        setEspecialidades(datosBD);

        //setIsLoading(false);
    }

    useEffect(() => {
        obtenerDatos();
    }, []);
    
    return (
        <div>
            <Header/>
            <section className="d-flex align-items-center" style={{ height: "625px" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h1 style={{ color: "blue" }}>Selecciona una especialidad</h1>
                        </div>
                    </div>
                    <div>
                       <div className="row justify-content-center mt-5 ">
                          {especialidades.map((especialidad, index) => (
                              <div className="col-3">
                                <AgregarCitaEspecialidad especialidad={especialidad.ESPECIALIDAD} id={especialidad.ID}/>
                              </div>
                            ))}
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
    );
};

export default Especialidades;