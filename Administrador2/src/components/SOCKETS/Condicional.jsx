import React, { useState } from "react";
import AvanceTurnos from "./AvanceTurnos";
import GeneradorTurnos from "./GeneradorTurnos";
import PantallaEspera from "./PantallaEspera";

export default function Condicional() {
    const [contenido, setContenido] = useState("")

    function condicion(name) {
        switch (name) {
            case "Turnos":
                setContenido(<GeneradorTurnos />)
                break;
            case "Avance":
                setContenido(<AvanceTurnos />)
                break;
            case "Pantalla":
                setContenido(<PantallaEspera />)
                break;
        }
    }

    return (
        <div>
            <input type="button" value="Turnos" onClick={() =>condicion("Turnos")} />
            <br />
            <input type="button" value="Avance" onClick={() => condicion("Avance")}/>
            <br />
            <input type="button" value="Pantalla espera" onClick={ () => condicion("Pantalla")}/>
            <div style={{width: "80%", height: "800px", backgroundColor:"green"}}>
                {contenido}
            </div>
        </div>
    )
}