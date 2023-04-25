import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export default function AvanceTurnos() {
  const socket = io("http://localhost:4000"); // Cambiar la URL por la del servidor Socket.io
  const [turno, setTurno] = useState('')

  useEffect(() => {
    socket.on("setNextTurno", (nuevturno) => {
      setTurno("");
      setTurno(nuevturno);
    });

    
  }, []);

  const avanzarTurno = () => {
    socket.emit("avanzarTurno"); // Enviar evento al servidor para avanzar el turno
  };



  return (
    <div>
      <h1>Avance de Turnos</h1>
      <button onClick={avanzarTurno}>Avanzar Turno</button>
      <h2>Turno llamado: {turno}</h2>
    </div>
  );
};