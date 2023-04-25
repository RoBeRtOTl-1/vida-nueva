import React from 'react';

export default function Estado({ estado }) {
  if (estado === 1) {
    return <p className="layout-estados"style={{backgroundColor:"#7FDB8E", color:"#13A52A"}} >Activo</p>;
  } else if (estado === 2) {
    return <p className="layout-estados" style={{background:"#DA8686", color: "#A51313"}}>Inactivo</p>;
  } else {
    return <p className="layout-estados">Desconocido</p>;
  }
}
