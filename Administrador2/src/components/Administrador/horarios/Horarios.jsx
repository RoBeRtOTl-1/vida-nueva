import React, { useState, useEffect } from "react";
import Modificar from "./Modificar";
import Estado from "../estados/Estados";
import { DatosBD_Horarios } from "../../firebase/Horarios/HOR_CRUD";
import { formatearHorario } from "../../firebase/Fechas/Fechas";
import { DatoDeLaBD as DatoBD_USU } from "../../firebase/Ususarios/USU_CRUD";

import { _, Grid } from 'gridjs-react';

export default function Horarios() {
    const [datos, setDatos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [usuarios, setUsuarios] = useState(new Map())


    async function obtenerDatos() {
        setDatos([]);
        setUsuarios(new Map())

        const datosBD = await DatosBD_Horarios();
        setDatos(datosBD);


        const usu = await DatoBD_USU();
        const map = new Map(usu.map(dato => [dato.ID, dato.NOMBRE + " " + dato.AP_PATERNO + " " + dato.AP_MATERNO]));

        console.log(map)
        setUsuarios(map)




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
                            <Grid
                                data={datos.map(dato => [
                                    usuarios.get(dato.ID_USUARIO),
                                    dato.LUNES,
                                    dato.MARTES,
                                    dato.MIERCOLES,
                                    dato.JUEVES,
                                    dato.VIERNES,
                                    _(<Modificar med_nombre={usuarios.get(dato.ID_USUARIO)} dato={dato} obtenerDatos={obtenerDatos} />)
                                ])}

                                columns={[
                                    'Medico',
                                    'Lunes',
                                    'Martes',
                                    'Miercoles',
                                    'Jueves',
                                    'Viernes',
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
                                        'placeholder': 'Nombre del medico',

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
//                 <td dangerouslySetInnerHTML={{ __html: formatearHorario(dato.LUNES) }}></td>
