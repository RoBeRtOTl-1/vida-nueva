import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const PantallaEspera = () => {
  const [turnoActual, setTurnoActual] = useState("");
  const [turnosEnCola, setTurnosEnCola] = useState([]);
  const socket = io("http://localhost:4000"); // Cambiar la URL por la del servidor Socket.io

  useEffect(() => {
    // Escuchar al servidor Socket.io para recibir el turno actual y la cola de turnos
    socket.on("turnoActual", (turno) => {
      setTurnoActual(turno);
    });

    socket.on("colaTurnos", (cola) => {
      setTurnosEnCola(cola);
    });

    // Limpiar el evento al desmontar el componente
    return () => {
      socket.off("turnoActual");
      socket.off("colaTurnos");
    };
  }, []);

  return (
    <div>
      <h1>Pantalla de Espera</h1>
      <h2>Turno Actual: {turnoActual}</h2>
      <h2>Turnos en Cola: {turnosEnCola.join(", ")}</h2>
    </div>
  );
};

export default PantallaEspera;