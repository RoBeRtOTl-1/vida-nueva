import React, { useContext, useEffect, useState } from "react"

import BarChart from "./EstadisticsDay"
import { getCounters } from "../../firebase/Turnos/TURN_CRUD";

export default function Principal() {
    // const [counters, setCounters] = useState({});

    // async function obtenerDatos() {
    //     const cou = await getCounters();
    //     await console.log(cou[0])
    //     await setCounters(cou[0]);

    // }

    // useEffect(() => {
    //     obtenerDatos();
    // });



    return (
        <div>
            <div className="col-sm-12">
                <BarChart />
            </div>
            <div className="col-sm-12 mt-5 d-flex align-items-center justify-content-evenly ">
                <TurnoBox count={1}coun nombre={"Aplicacion de inyeccion"} />
                <TurnoBox count={2} nombre={"Certificado medico"} />
                <TurnoBox count={3} nombre={"Consulta medica"} />
                <TurnoBox count={4} nombre={"Toma de presion"} />
            </div>
        </div>

    )
}

const TurnoBox = ({ count, nombre }) => {
    return (
        <div className="text-center pt-3 border border-gray shadow-custom" style={{ width: '150px', height: '150px' }}>
            <div className="col-sm-12" style={{ fontSize: '55px' }}>{count}</div>
            <div className="col-sm-12">{nombre}</div>
        </div>
    )
}
