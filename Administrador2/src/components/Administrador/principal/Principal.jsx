import React, { useContext, useEffect, useState } from "react"

import BarChart from "./EstadisticsDay"
import { getCounters } from "../../firebase/Turnos/TURN_CRUD";

export default function Principal() {


    return (
        <div>
            <div className="col-sm-12">
                <BarChart />
            </div>
            <div className="col-sm-12 mt-5 d-flex align-items-center justify-content-evenly ">
                <TurnoBox count={1} nombre={"Aplicacion de inyeccion"} />
                <TurnoBox count={2} nombre={"Certificado medico"} />
                <TurnoBox count={3} nombre={"Consulta medica"} />
                <TurnoBox count={4} nombre={"Toma de presion"} />
            </div>
        </div>

    )
}

const TurnoBox = ({ count, nombre }) => {
    return (
        <div className="text-center py-3 border rounded-3 border-white shadow" style={{ width: '150px', height: '175px' }}>
            <div className="col-sm-12" style={{ fontSize: '55px' }}>{count}</div>
            <div className="col-sm-12">{nombre}</div>
        </div>
    )
}
