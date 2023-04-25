import React, { useEffect, useState } from "react";
import Estado from "../estados/Estados";
import { DatosBD_Turnos } from "../../firebase/Turnos/TURN_CRUD";
import { ts_to_HM } from "../../firebase/Fechas/Fechas";


function handleButtonClick(e, index) {
    console.log(e + " " + index)
}



export default function Turnos() {
    const [turnos, setTurnos] = useState([]);

    
    async function obtenerDatos() {
        setTurnos([])
        const datosBD = await DatosBD_Turnos();
        //console.log(datosBD)
        setTurnos(datosBD);
        //setIsLoading(false);
    }

    useEffect(() => {
        obtenerDatos();
    }, []);

    return (
    
            <div className="rounded-4 pt-3 mt-5 border-gray shadow-custom" style={{ width: "1250px" }} >

                <div className="container-fluid mt-4" >

                    <div className="row">
                        <div className="col-6">
                            <h3>Turnos del dia</h3>
                        </div>
                        <div className="col-6 text-end">
                            <button className="btn btn-primary">Agregar</button>
                        </div>
                    </div>


                    <div className="row mt-3">
                        <div className="col-6">

                        </div>
                        <div className="col-6 d-flex align-items-center">
                            <label htmlFor="buscar">Buscar:</label>
                            <input type="text" id="buscar" className="ms-4 form-control" />
                        </div>
                    </div>


                    <div className="row mt-3">
                        <div className="col">
                            <table className="table">
                                <thead>
                                    <tr className="table-secondary">
                                        <th>Abreviatura</th>
                                        <th>Tipo de servicio</th>
                                        <th>Hora</th>
                                        <th>Estatus</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {turnos.map((tipo, index) => (
                                        <tr key={index}>
                                            <td>{tipo.ID_TURNO}</td>
                                            <td>{tipo.ID_SERVICIO}</td>
                                            <td> {ts_to_HM(tipo.FECHAHORA)}</td>
                                            <td> <Estado  estado={tipo.ID_ESTADOS} /> </td>
                                            <td className="d-flex align-items-center" >
                                                
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
};