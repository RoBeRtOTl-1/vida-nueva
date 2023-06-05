import React, { useEffect, useState } from "react";

import { _, Grid } from 'gridjs-react';
import { esES } from "gridjs/l10n";
import { io } from "socket.io-client";

import Agregar from "./Agregar";
import Modificar from "./Modificar";
import Estado from "../estados/Estados";

import { get_BD_Publicidad, get_BD_Publicidad_Activos, vencerPublicidad } from "../../firebase/Publicidad/PUB_CRUD";
import { formatearFechaHora } from "../../firebase/Fechas/Fechas";

export default function Publicidad() {
    const [datos, setDatos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const socket = io("http://localhost:4000");

    async function obtenerDatos() {
        setDatos([]);
        
        const  datosBD = await get_BD_Publicidad();
        await vencerPublicidad( await datosBD )
        socket.emit('ActualizarPublicidad', await get_BD_Publicidad_Activos() )
        setDatos(datosBD);
        setIsLoading(false);
    }

    useEffect(() => {
        obtenerDatos();
    }, []);


    return (
        <div className="rounded-4 pt-3 mt-4 border-gray shadow-custom" style={{ width: "111%", height: "630px" }} >
            <div className="container-fluid mt-4" >

                <div className="row">
                    <div className="col-6">
                        <h3>Publicidad</h3>
                    </div>
                    <div className="col-6 text-end">
                        <Agregar obtenerDatos={obtenerDatos} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        {isLoading ?
                            (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <Grid
                                    data={datos.map(dato => [
                                        dato.NOMBRE,
                                        dato.DESCRIPCION,
                                        formatearFechaHora(dato.FECHA_TERMINACION),
                                        _(<Estado estado={dato.ID_ESTADOS} />),
                                        _(<Modificar datos={dato} obtenerDatos={obtenerDatos} />)
                                    ])}

                                  

                                    columns={[
                                        {
                                            name:'Nombre',
                                            width:'20%'
                                        },
                                        {

                                            name:'Descripcion',
                                            width: '30%'
                                        },
                                        {

                                            name:'Fecha terminacion',
                                            width: '30%'
                                        },
                                        {

                                            name:'Estado',
                                            width: '10%'
                                        },
                                        {

                                            name:'Acciones',
                                            width: '10%'
                                        },
                                        
                                        
                                        
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
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}