import React, { useEffect, useState } from 'react';
import Header from "../Header";
import AgregarCitaEspecialidad from "./AgregarCitaEspecialidad.jsx";
import { DatoDeLaBDActivos } from '../../firebase/Especialides/ESP_CRUD';

const Especialidades = () => {


    const [especialidades, setEspecialidades] =  useState([]);

    async function obtenerDatos() {
        setEspecialidades([])
        const datosBD = await DatoDeLaBDActivos();
        console.log(datosBD)
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
                          {especialidades.map((especialidad) => (
                              <div className="col-3">
                                <AgregarCitaEspecialidad especialidad={especialidad.ESPECIALIDAD} id={especialidad.ID}/>
                              </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Especialidades;