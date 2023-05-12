import React, { useEffect, useState } from "react";
import { _, Grid } from 'gridjs-react';
import Agregar from "./Agregar";
import Modificar from "./Modificar";
import { get_BD_Publicidad } from "../../firebase/Publicidad/PUB_CRUD";
import { formatearFechaHora } from "../../firebase/Fechas/Fechas";
import Estado from "../estados/Estados";

export default function Publicidad() {
    const [datos, setDatos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function obtenerDatos() {
        setDatos([]);
        const datosBD = await get_BD_Publicidad();
        setDatos(datosBD);
        setIsLoading(false);
    }

    useEffect(() => {
        obtenerDatos();
    }, []);


    return (
        <div className="rounded-4 pt-3 mt-4 border-gray shadow-custom" style={{ width: "111%", height: "630px"}} >
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
                                <div class="d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <Grid
                                    data={datos.map(dato =>[
                                        dato.NOMBRE,
                                        dato.DESCRIPCION,
                                        formatearFechaHora(dato.FECHA_TERMINACION),
                                        _(<Estado estado={dato.ID_ESTADOS} />),
                                        _(<Modificar datos={dato} /> )
                                    ])}

                                    columns={[
                                        'Nombre',
                                        'Descripcion',
                                        'Fecha terminacion',
                                        'Estado',
                                        'Acciones'
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

                                    language={{
                                        'search': {
                                            'placeholder': 'Buscar',

                                        },
                                        'pagination': {
                                            'previous': 'Anterior',
                                            'next': 'Siguiente',
                                            'showing': 'Mostrando',
                                            'results': () => 'Registros'
                                        }
                                    }}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}