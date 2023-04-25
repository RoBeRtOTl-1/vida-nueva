import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";


export default function Turnos() {
  const [turnoActual, setTurnoActual] = useState("");
  const [turnosEnCola, setTurnosEnCola] = useState([]);
  const socket = io("http://localhost:4000");


  useEffect(() => {
    // Escuchar al servidor Socket.io para recibir el turno actual y la cola de turnos
    socket.on("turnoActual", (turno) => {
      setTurnoActual(turno);
    });

    socket.on("colaTurnos", (cola) => {
      setTurnosEnCola(cola);
    });

    socket.on("setNextTurno", (nuevturno) => {
      setTurnoActual("");
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
        <div className="col-md-4 bg-secondary pe-0 d-flex flex-column vh-100">
          {turnosEnCola.map((turno, index) => (
            <Rectangle turno={turno} />
          ))}
        </div>
        <div className="col-md-8 p-0  d-flex flex-column">
          <div className="bg-secondary" style={{ height: "80%" }} >
            Aqui ira una imagen
          </div>
          <div className="bg-info text-center pt-3" style={{ height: "20%", fontSize: "500%" }}>
            Turno: {turnoActual}
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

