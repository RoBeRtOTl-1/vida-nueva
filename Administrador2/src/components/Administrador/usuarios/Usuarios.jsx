import React, { useState, useEffect } from "react";
import { DatoDeLaBD } from "../../firebase/Ususarios/USU_CRUD";
import { DatoDeLaBD as DatoBD_TDU } from "../../firebase/TiposDeUsuarios/TDU_CRUD";
import Agregar from "./Agregar";
import Modificar from "./Modificar";
import { DatoBD_Dom_Filtrado } from "../../firebase/Domicilio/Dom_CRUD";
import Estado from "../estados/Estados";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tipUsu, setTipUsu] = useState(new Map())


    async function obtenerDatos() { 
        setUsuarios([]);
        setTipUsu(new Map());
        
        const datosBD = await DatoDeLaBD();
        setUsuarios(datosBD);

        const tU = await DatoBD_TDU();
        const map = new Map(tU.map(dato => [dato.ID, dato.NOMBRE]));
        setTipUsu(map);
    
    
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
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody" className="text-center">
                                    {usuarios.map((dato, index) => (
                                        <tr key={index}>
                                            <td className="text-start">{dato.NOMBRE + " " + dato.AP_MATERNO + " " + dato.AP_PATERNO}</td>
                                            <td>{tipUsu.get(dato.ID_TDU)}</td>
                                            <td>{dato.EMAIL}</td>
                                            <td>{dato.TELEFONO}</td>
                                            <td> <Estado estado={dato.ID_ESTADOS} /> </td>
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