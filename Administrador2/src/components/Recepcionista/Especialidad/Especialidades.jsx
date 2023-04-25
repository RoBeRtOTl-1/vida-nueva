import React from 'react';
import Header from "../Header";
import AgregarCitaEspecialidad from "./AgregarCitaEspecialidad.jsx";

const Especialidades = () => {

    const especialidades = [
        {id:1,name:"Odontologia"},
        {id:2,name:"Ultrasonidos"},
        {id:3,name:"Psicologia"},
        {id:4,name:"Audiometrias"},
        {id:5,name:"Nutriologa"},
        {id:6,name:"Electrocardiograma"},
        {id:7,name:"Ginecologia"},
        {id:8,name:"Control de enbarazo"}
    ]


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
                              <div className="col-6">
                                <AgregarCitaEspecialidad especialidad={especialidad.name} id={especialidad.id}/>
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