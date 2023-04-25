import React, { useState, useEffect } from "react";
import Agregar from "./Agregar";
import Modificar from "./Modificar";
import { DatoDeLaBD } from "../firebase/TiposDeUsuarios/TDU_CRUD";
import Estado from "../estados/Estados";

export default function TiposUsuario() {
    const [datos, setDatos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function obtenerDatos() {
        setDatos([]);
        const datosBD = await DatoDeLaBD();
        setDatos(datosBD);
        setIsLoading(false);
    }
    
    useEffect(() => {
        obtenerDatos();
    }, []);
    
    
    async function actualizarDatos() {
        const datosBD = await DatoDeLaBD();
        setDatos(datosBD);
    }


    return (
        <div
            className="rounded-4 pt-3 mt-5 border-gray shadow-custom"
            style={{ width: "1250px" }}>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-6">
                        <h3>Tipos de usuarios</h3>
                    </div>
                    <div className="col-6 text-end">
                        <Agregar obtenerDatos={obtenerDatos} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6"></div>
                    <div className="col-6 d-flex align-items-center">
                        <label htmlFor="buscar">Buscar:</label>
                        <input type="text" id="buscar" className="ms-4 form-control" />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        {isLoading ? (
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <table className="table align-middle">
                                <thead>
                                    <tr className="table-secondary text-center">
                                        <th>Tipos de usuarios</th>
                                        <th>Administración</th>
                                        <th>Recepción</th>
                                        <th>Turnos</th>
                                        <th>Médico gral</th>
                                        <th>Especialista</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody" className="text-center">
                                    {datos.map((dato, index) => (
                                        <tr key={index}>
                                            <td className="text-start">{dato.NOMBRE}</td>
                                            <td>{dato.ADMINISTRACION ? "si" : "no"}</td>
                                            <td>{dato.RECEPCION ? "si" : "no"}</td>
                                            <td>{dato.TURNOS ? "si" : "no"}</td>
                                            <td>{dato.MEDICOGENERAL ? "si" : "no"}</td>
                                            <td>{dato.ESPECIALISTA ? "si" : "no"}</td>
                                            <td>
                                                <Estado estado={dato.ID_ESTADOS} />
                                            </td>
                                            <td className="">
                                                <Modificar
                                                    dato={dato}
                                                    obtenerDatos={obtenerDatos}
                                                />

                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h4></h4>
                </div>
            </div>
        </div>

    );
}
