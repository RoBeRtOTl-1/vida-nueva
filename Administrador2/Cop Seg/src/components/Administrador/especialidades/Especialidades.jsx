import React, { useState, useEffect } from "react";
import { DatoDeLaBD } from "../firebase/Especialides/ESP_CRUD";
import Estado from "../estados/Estados";
import Agregar from "./Agregar";
import Modificar from "./Modificar";

export default function Especialidades() {
    const [datos, setDatos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function obtenerDatos() {
        setDatos([])
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
                        <h3>Especialidades</h3>
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
                    <div className="col-6 ">
                        {isLoading ? (
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <table className="table align-middle ">
                                <thead>
                                    <tr className="table-secondary text-center ">
                                        <th>Nombre</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody" className="text-center">
                                    {datos.map((dato, index) => (
                                        <tr key={index}>
                                            <td className="text-start">{dato.ESPECIALIDAD}</td>
                                            <td> <Estado estado={dato.ID_ESTADOS} /> </td>
                                            <td className="">
                                                <Modificar dato={dato} 
                                                    obtenerDatos={obtenerDatos}/>
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
