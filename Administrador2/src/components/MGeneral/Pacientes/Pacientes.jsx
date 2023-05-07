import React, { useState, useEffect, useContext } from "react";
import Agregar from "./Agregar";

import { _, Grid } from 'gridjs-react';
import { get_Pacientes_BD } from "../../firebase/Pacientes/PAC_CRUD";

import ConsultaMedica from "./ConsultaMedica";
import { DataContext } from "../../../context/UserContext.jsx"
import VerConsultas from "./VerConsultas";


export default function Pacientes() {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { currenUser } = useContext(DataContext);

    async function obtenerDatos() {
        setUsuarios([]);

        const datosBD = await get_Pacientes_BD();
        setUsuarios(datosBD);


        setIsLoading(false);
    }


    useEffect(() => {
        obtenerDatos();
    }, []);

    return (

        <div className="rounded-4 pt-3 mt-4 border-gray shadow-custom" style={{ width: "1250px" }} >
            <div className="container-fluid mt-4" >
                <div className="row">
                    <div className="col-6">
                        <h3>Pacientes</h3>
                    </div>
                    <div className="col-6 text-end">
                        <Agregar obtenerDatos={obtenerDatos} />
                    </div>
                </div>



                <div className="row col-12 mt-4 d-flex justify-content-center">
                    <div className="col-12">
                        {isLoading ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (

                            <Grid
                                data={usuarios.map(dato => [
                                    dato.NOMBRE + " " + dato.AP_PATERNO + " " + dato.AP_MATERNO,
                                    dato.CURP,
                                    dato.TELEFONO,
                                    _(<ConsultaMedica ID_PACIENTE={dato.ID} ID_USUARIO={currenUser.ID_USUARIO}  obtenerDatos={obtenerDatos} />),
                                    _(<VerConsultas ID_PACIENTE={dato.ID} DATOS_PACIENTE={dato} />)
                                ])}

                                columns={[
                                    'Nombre completo',
                                    'CURP',
                                    'Telefono',
                                    {
                                        name: 'Acciones',
                                        columns: [{
                                            name: 'Registrar consulta'
                                        }, {
                                            name: 'Ver consultas'
                                        }]
                                    }
                                    
                                ]}
                                search={{
                                    fields: ['CURP']
                                }}

                                pagination={{
                                    limit: 5,
                                }}

                                className={{
                                    table: 'table text-center ',
                                    thead: 'bg-dark-subtle',
                                    tbody: ' ',
                                }}

                                language={{
                                    'search': {
                                        'placeholder': 'CURP',

                                    },
                                    'pagination': {
                                        'previous': 'Anterior',
                                        'next': 'Siguiente',
                                        'showing': 'Mostrando',
                                        'results': () => 'Registros'
                                    }
                                }}
                            />


                        )}
                    </div>
                </div>

            </div>
        </div>


    )
}
