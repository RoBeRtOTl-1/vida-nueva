import React from "react"

import BarChart from "./EstadisticsDay"
import TurnoBox from "./TurnoBox"

export default function Principal() {
    return (
        <div>
            <div className="col-sm-12">
                <BarChart />
            </div>
            <div className="col-sm-12 mt-5 d-flex align-items-center justify-content-evenly ">
                <TurnoBox />
                <TurnoBox />
                <TurnoBox />
                <TurnoBox />
            </div>
        </div>

    )
}