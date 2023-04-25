import React, { useState } from "react";

function handleButtonClick(e, index) {
    console.log(e + " " + index)
}

function handleRowClick(index) {
    console.log(index)
}


export default function TiposUsuario() {
    const [tipos, setTipos] = useState([
        {
            nombre: "Pollo loco",
            descripcion: "Esta es una imagen del pollo loco",
            fechaTer: "25/Octubre/2023",
            estado: "Reproduciendo",
            
        },
        {
            nombre: "Pollo loco",
            descripcion: "Esta es una imagen del pollo loco",
            fechaTer: "25/Octubre/2023",
            estado: "Reproduciendo",
            
        },
        {
            nombre: "Pollo loco",
            descripcion: "Esta es una imagen del pollo loco",
            fechaTer: "25/Octubre/2023",
            estado: "Reproduciendo",
            
        }
    ]);

    return (
        <div className="rounded-4 pt-3 mt-5 border-gray shadow-custom" style={{ width: "1250px" }} >

            <div className="container-fluid mt-4" >

                <div className="row">
                    <div className="col-6">
                        <h3>Publicidad</h3>
                    </div>
                    <div className="col-6 text-end">
                        <button className="btn btn-primary">Agregar</button>
                    </div>
                </div>


                <div className="row mt-3">
                    <div className="col-6">

                    </div>
                    <div className="col-6 d-flex align-items-center">
                        <label htmlFor="buscar">Buscar:</label>
                        <input type="text" id="buscar" className="ms-4 form-control" />
                    </div>
                </div>


                <div className="row mt-3">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr className="table-secondary">
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Fecha terminación</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {tipos.map((tipo, index) => (
                                    <tr key={index} onClick={() => handleRowClick(index)}>
                                        <td>{tipo.nombre}</td>
                                        <td>{tipo.descripcion}</td>
                                        <td>{tipo.fechaTer}</td>
                                        <td>{tipo.estado }</td>
                                        <td className="d-flex align-items-center" >
                                            <button className="btn" onClick={(e) => handleButtonClick(e, index)}>
                                                <img src="src/css/img/acciones/Modificar.png" style={{ width: "30px" }} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="row mt-3">
                    <div className="col">
                        <h4>Hola mundo</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}