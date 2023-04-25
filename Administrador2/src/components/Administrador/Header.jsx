import React, { useEffect, useState } from 'react';


export default function Header() {
  const [fechaHora, setFechaHora] = useState('');

  useEffect(() => {
    function mostrarFechaHora() {
      const fecha = new Date();
      const dia = fecha.getDate();
      const mes = fecha.toLocaleString('default', { month: 'long' });
      const anio = fecha.getFullYear();

      let fechaHoraFormateada = `${dia} de ${mes} ${anio}`;

      setFechaHora(fechaHoraFormateada);
    }
    const intervalId = setInterval(mostrarFechaHora, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="navbar shadow rounded-4 d-flex pt-3" style={{backgroundColor: "#FFFFFF", marginLeft:"270px", width:"82%"}}>
      <div className="container-fluid ">
        <div className="navbar-brand" style={{color: "#000000"}}>Turnos del día</div>
        <div className="navbar-text border rounded border-gray shadow-custom p-3 d-flex align-items-center" >{fechaHora}</div>
      </div>
    </nav>
  );
  
  
}
