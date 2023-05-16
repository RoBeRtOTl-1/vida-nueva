import React from 'react';

export default function Estado({ estado }) {
  if (estado === 1) {
    return <p className="layout-estados" style={{ backgroundColor: "#7FDB8E", color: "#13A52A" }} >Activo</p>;
  } else if (estado === 2) {
    return <p className="layout-estados" style={{ background: "#DA8686", color: "#A51313" }}>Inactivo</p>;
  } else if (estado === 3) {
    return <p className="layout-estados" style={{ background: "#7FDB8E", color: "#13A52A" }}>Atendido</p>;
  } else if (estado === 4) {
    return <p className="layout-estados" style={{ background: "#89C0F2", color: "#1345A5" }}>En espera</p>;
  } else if (estado === 5) {
    return <p className="layout-estados" style={{ background: "#DA8686", color: "#A51313" }}>Cancelado</p>;
  } else if (estado === 6) {
    return <p className="layout-estados" style={{ background: "#DEE870", color: "#A58D13" }}>Llamado</p>;
  }else if (estado === 7) {
    return <p className="layout-estados" style={{ background: "#89C0F2", color: "#1345A5" }}>Pendiente</p>;
  }else if (estado === 8) {
    return <p className="layout-estados" style={{ background: "#DEE870", color: "#A58D13" }}>En la cola</p>;
  }  else {
    return <p className="layout-estados">Desconocido</p>;
  }
}
