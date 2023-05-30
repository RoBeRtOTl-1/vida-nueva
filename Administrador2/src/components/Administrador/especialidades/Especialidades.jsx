import React, { useState, useEffect } from "react";
import { DatoDeLaBD } from "../../firebase/Especialides/ESP_CRUD";
import Estado from "../estados/Estados";
import Agregar from "./Agregar";
import Modificar from "./Modificar";

import { _, Grid } from 'gridjs-react';
import { esES } from "gridjs/l10n";

export default function Especialidades() {
    const [datos, setDatos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [BDesp, setBDesp] =  useState([])

    async function obtenerDatos() {
        setDatos([])
        setBDesp([])

        const datosBD = await DatoDeLaBD();
        const arrEsp = (datosBD.map ( esp => esp.ESPECIALIDAD ))
        
        setBDesp(arrEsp)

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
            className="rounded-4 pt-3 mt-4 border-gray shadow-custom"
            style={{ width: "111%", height: "630px"}}>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-6">
                        <h3>Especialidades</h3>
                    </div>
                    <div className="col-6 text-end">
                        <Agregar obtenerDatos={obtenerDatos} BDesp={BDesp} />
                    </div>
                </div>
         

                <div className="row col-12 mt-4 d-flex justify-content-center">
                    <div className="col-11 ">
                        {isLoading ? (
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <Grid
                                data={datos.map( dato => [
                                    dato.ESPECIALIDAD, 
                                    _(<Estado estado={dato.ID_ESTADOS} />), 
                                    _(<Modificar dato={dato} obtenerDatos={obtenerDatos}/>)
                                ])}
                              
                                columns={[
                                    'NOMBRE',
                                    'ESTADO',
                                    'ACCIONES'
                                ]}
                                search={true}

                                pagination={{
                                    limit: 5,
                                }}

                                className={{
                                    table: 'table text-center ',
                                    thead: 'bg-dark-subtle',
                                    tbody: ' ',
                                }}

                                language={esES}
                            />

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
