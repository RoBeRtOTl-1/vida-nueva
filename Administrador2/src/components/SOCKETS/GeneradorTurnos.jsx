import React, { useState } from "react";
import io from "socket.io-client";

export default function GeneradorTurnos(){
  const [turnoActual, setTurnoActual] = useState("");
  const socket = io("http://localhost:4000"); // Cambiar la URL por la del servidor Socket.io

  const generarTurno = () => {
    const nuevoTurno = Math.floor(Math.random() * 100) + 1; // Generar número de turno aleatorio
    setTurnoActual(nuevoTurno);
    socket.emit("nuevoTurno", nuevoTurno); // Enviar el nuevo turno al servidor Socket.io
  };

  return (
    <div>
      <h1>Generador de Turnos</h1>
      <button onClick={generarTurno}>Generar Turno</button>
      <h2>Turno Actual: {turnoActual}</h2>
    </div>
  );
};