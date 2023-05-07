import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BD_Turnos_Actuales } from "../firebase/Turnos/TURN_CRUD";


export default function Turnos() {
  const [turnoActual, setTurnoActual] = useState("");
  const [turnosEnCola, setTurnosEnCola] = useState([]);
  const socket = io("http://localhost:4000");

  /**
     *Hacemos una consulta que nos traera los turnos y se los ponemos a la variable BDturnos 
     */

  useEffect(() => {
    BD_Turnos_Actuales().then((data) => {
      socket.emit("DatosActuales", data);
    })

    /**
     * Escucha a el evento "colaTurnos"
     * Cambia la cola de turnos que se muestra en la pantalla
     */
    socket.on("colaTurnos", async (turnosActuales) => {
      setTurnosEnCola(await turnosActuales ? turnosActuales : []);
    });

    /**
     * Escucha a el evento "setNextTurno"
     * Cambia el turno que esta mandando a llamar
     */
    socket.on("setNextTurno", (nuevturno) => {
      setTurnoActual("");
      console.log(nuevturno)
      setTurnoActual(nuevturno);
    });
    // Limpiar el evento al desmontar el componente
    return () => {
      socket.off("turnoActual");
      socket.off("colaTurnos");
    };
  }, []);

  return (
    <div className="container-fluid p-0 overflow-hidden  " >
      <div className="row ">
        <div className="col-md-4 bg-light  pe-0 d-flex flex-column vh-100">
          {turnosEnCola.map((turno, index) => (
            <Rectangle key={index.ID} turno={turno.ID_TURNO} />
          ))}
        </div>
        <div className="col-md-8 p-0  d-flex flex-column">
          <div className="bg-secondary" style={{ height: "80%" }} >
            Aqui ira una imagen
          </div>
          <div className="bg-info text-center pt-3" style={{ height: "20%", fontSize: "500%" }}>
            Turno: {turnoActual ? turnoActual.ID_TURNO : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const Rectangle = ({ turno }) => {
  return <div className="bg-light border border-black text-center pt-4 fs-1" style={{ height: "14.28%" }}>
    {turno}
  </div>;
};

