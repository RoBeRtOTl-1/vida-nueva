import React, { useState, useEffect } from "react";
import Agregar from "./Agregar";
import Modificar from "./Modificar";
import { DatoDeLaBD } from "../../firebase/TiposDeUsuarios/TDU_CRUD";
import Estado from "../estados/Estados";

import { _, Grid } from 'gridjs-react';

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
            className="rounded-4 pt-3 mt-4 border-gray shadow-custom"
            style={{ width: "111%", height: "630px"}}>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-6">
                        <h3>Tipos de usuarios</h3>
                    </div>
                    <div className="col-6 text-end">
                        <Agregar obtenerDatos={obtenerDatos} />
                    </div>
                </div>
                <div className="row col-12 mt-4 d-flex justify-content-center ">
                    <div className="col-11 ">
                        {isLoading ? (
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (

                            <Grid
                                data={datos.map(dato => [
                                    dato.NOMBRE,
                                    dato.ADMINISTRACION ? "si" : "no",
                                    dato.RECEPCION ? "si" : "no",
                                    dato.TURNOS ? "si" : "no",
                                    dato.MEDICOGENERAL ? "si" : "no",
                                    dato.ESPECIALISTA ? "si" : "no",
                                    _(<Estado estado={dato.ID_ESTADOS} />),
                                    _(<Modificar dato={dato} obtenerDatos={obtenerDatos} />)
                                ])}

                                columns={[
                                    'Tipos de usuarios',
                                        'Administración',
                                        'Recepción',
                                        'Turnos',
                                        'Médico gral',
                                        'Especialista',
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
                                        'placeholder': 'Tipo de usuario',

                                    },
                                    'pagination': {
                                        'previous': 'Anterior',
                                        'next': 'Siguiente',
                                        'showing': 'Mostrando',
                                        'results': () => 'Registros'
                                    }
                                }}
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
