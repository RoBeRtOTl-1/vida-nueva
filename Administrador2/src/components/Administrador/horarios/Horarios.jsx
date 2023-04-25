import React, { useState, useEffect } from "react";
import Agregar from "./Agregar";
import Modificar from "./Modificar";
import Estado from "../estados/Estados";
import { DatosBD_Horarios } from "../../firebase/Horarios/HOR_CRUD";
import { formatearHorario } from "../../firebase/Fechas/Fechas";
import { DatoDeLaBD as DatoBD_USU } from "../../firebase/Ususarios/USU_CRUD";

export default function Horarios() {
    const [datos, setDatos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [usuarios, setUsuarios] = useState(new Map())


    async function obtenerDatos() {
        setDatos([]);
        setUsuarios(new Map())

        const datosBD = await DatosBD_Horarios();
        setDatos(datosBD);

        const usu = await DatoBD_USU()
        setUsuarios(new Map(usu.map(dato => [dato.ID, dato.NOMBRE + " " + dato.AP_PATERNO + " " + dato.AP_MATERNO])))

        setIsLoading(false);
    }

    useEffect(() => {
        obtenerDatos();
    }, []);


    async function actualizarDatos() {
        //const datosBD = await DatoDeLaBD();
        //setDatos(datosBD);
    }


    return (
        <div
            className="rounded-4 pt-3 mt-5 border-gray shadow-custom"
            style={{ width: "1250px" }}>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-6">
                        <h3>Gestion de horarios</h3>
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
                                        <th>Medico</th>
                                        <th>Lunes</th>
                                        <th>Martes</th>
                                        <th>Miercoles</th>
                                        <th>Jueves</th>
                                        <th>Viernes</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody" className="text-center">
                                    {datos.map((dato, index) => (
                                        <tr key={index}>
                                            <td className="text-start">{usuarios.get(dato.ID_USUARIO)}</td>
                                            <td dangerouslySetInnerHTML={{ __html: formatearHorario(dato.LUNES) }}></td>
                                            <td dangerouslySetInnerHTML={{ __html: formatearHorario(dato.MARTES) }}></td>
                                            <td dangerouslySetInnerHTML={{ __html: formatearHorario(dato.MIERCOLES) }}></td>
                                            <td dangerouslySetInnerHTML={{ __html: formatearHorario(dato.JUEVES) }}></td>
                                            <td dangerouslySetInnerHTML={{ __html: formatearHorario(dato.VIERNES) }}></td>
                                            <td className="">
                                                <Modificar
                                                    med_nombre={usuarios.get(dato.ID_USUARIO)}
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
