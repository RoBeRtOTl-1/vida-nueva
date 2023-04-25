import React, { useState, useEffect } from "react";
import { DatoDeLaBD } from "../firebase/Ususarios/USU_CRUD";
import Agregar from "./Agregar";
import Modificar from "../usuarios/Modificar";
import { DatoBD_Dom_Filtrado } from "../firebase/Domicilio/Dom_CRUD";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [domicilio, setDomicilio] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function obtenerDatos() { 
        setUsuarios([])
        const datosBD = await DatoDeLaBD();
        setUsuarios(datosBD);
        setIsLoading(false);
    }

    useEffect(() => {
        obtenerDatos();
    }, []);

    return (

        <div className="rounded-4 pt-3 mt-5 border-gray shadow-custom" style={{ width: "1250px" }} >
            <div className="container-fluid mt-4" >
                <div className="row">
                    <div className="col-6">
                        <h3>Usuarios</h3>
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


                <div className="row col-12 mt-4 d-flex justify-content-center">
                    <div className="col-10">
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
                                        <th>Nombre completo</th>
                                        <th>Tipo de usuario</th>
                                        <th>Email</th>
                                        <th>Telefono</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center align-middle">
                                    {usuarios.map((dato, index) => (
                                        <tr key={index}>
                                            <td className="text-start">{dato.NOMBRE + " " + dato.AP_MATERNO + " " + dato.AP_PATERNO}</td>
                                            <td>{dato.ID_TDU}</td>
                                            <td>{dato.EMAIL}</td>
                                            <td>{dato.TELEFONO}</td>
                                            <td >
                                            <Modificar dato={dato}
                                                    obtenerDatos={obtenerDatos} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <h4>Hola mundo</h4>
                    </div>
                </div>
            </div>
        </div>


    )
}