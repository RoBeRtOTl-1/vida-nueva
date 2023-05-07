import React from 'react';

export default function Estado({ estado }) {
  if (estado === 1) {
    return <p className="layout-estados"style={{backgroundColor:"#7FDB8E", color:"#13A52A"}} >Activo</p>;
  } else if (estado === 2) {
    return <p className="layout-estados" style={{background:"#DA8686", color: "#A51313"}}>Inactivo</p>;
  } else if (estado === 3) {
    return <p className="layout-estados" style={{background:"#89C0F2", color: "#1345A5"}}>Atendido</p>;
  } else if (estado === 4) {
    return <p className="layout-estados" style={{background:"#7FDB8E", color: "#13A52A"}}>En espera</p>;
  } else if (estado === 5) {
    return <p className="layout-estados" style={{background:"#DA8686", color: "#A51313"}}>Cancelado</p>;
  } else {
    return <p className="layout-estados">Desconocido</p>;
  }
}
