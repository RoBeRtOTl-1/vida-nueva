import React, { useEffect, useState } from "react";
import Estado from "../estados/Estados";
import { DatosBD_Turnos } from "../../firebase/Turnos/TURN_CRUD";
import { ts_to_HM } from "../../firebase/Fechas/Fechas";
import { _, Grid } from 'gridjs-react';
import { esES } from "gridjs/l10n";
import Modificar from "./Modificar";


export default function Turnos() {
    const [turnos, setTurnos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function obtenerDatos() {

        setTurnos([])
        const datosBD = await DatosBD_Turnos();
        //console.log(datosBD)
        setTurnos(datosBD);
        //setIsLoading(false);
        setIsLoading(false)
    }

    useEffect(() => {
        obtenerDatos();
    }, []);

    return (

        <div className="rounded-4 pt-3 mt-4 border-gray shadow-custom" style={{ width: "111%", height: "630px" }} >

            <div className="container-fluid mt-4" >

                <div className="row">
                    <div className="col-6">
                        <h3>Turnos del dia</h3>
                    </div>
                </div>

                <div className="row col-12 mt-4 d-flex justify-content-center">
                    <div className="col-11">

                        {isLoading ?
                            (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (

                                <Grid
                                    data={turnos.map(tipo => [
                                        tipo.ID_TURNO,
                                        tipo.ID_SERVICIO,
                                        ts_to_HM(tipo.FECHAHORA),
                                        _(<Estado estado={tipo.ID_ESTADOS} />),
                                        (tipo.ID_ESTADOS != 4 )?
                                            _(<Modificar dato={tipo} obtenerDatos={obtenerDatos} />)
                                            : ''

                                    ])}

                                    columns={[
                                        'Abreviatura',
                                        'Tipo de servicio',
                                        'Hora',
                                        'Estatus',
                                        'Acciones',
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
        </div>


    )
};
