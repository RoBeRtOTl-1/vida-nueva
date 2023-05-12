import React, { useState, useEffect } from "react";
import { DatoDeLaBD } from "../../firebase/Ususarios/USU_CRUD";
import { DatoDeLaBD as DatoBD_TDU } from "../../firebase/TiposDeUsuarios/TDU_CRUD";
import Agregar from "./Agregar";
import Modificar from "./Modificar";
import Estado from "../estados/Estados";

import { _, Grid } from 'gridjs-react';

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tipUsu, setTipUsu] = useState(new Map())


    async function obtenerDatos() { 
        setUsuarios([]);
        setTipUsu(new Map());        

        const datosBD = await DatoDeLaBD();
        setUsuarios(datosBD);

        const tU = await DatoBD_TDU();
        const map =  new Map(tU.map(dato => [dato.ID, dato.NOMBRE]));
        setTipUsu(map);    
        setIsLoading(false);
    }
    

    useEffect(() => {
        obtenerDatos();
    }, []);

    return (

        <div className="rounded-4 pt-3 mt-4 border-gray shadow-custom" style={{ width: "111%", height: "630px"}} >
            <div className="container-fluid mt-4" >
                <div className="row">
                    <div className="col-6">
                        <h3>Usuarios</h3>
                    </div>
                    <div className="col-6 text-end">
                        <Agregar obtenerDatos={obtenerDatos} />
                    </div>
                </div>



                <div className="row col-12 mt-4 d-flex justify-content-center">
                    <div className="col-12">
                        {isLoading ? (
                            <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (

                            <Grid
                                data={usuarios.map( dato => [
                                    dato.NOMBRE + " "+ dato.AP_PATERNO+" "+ dato.AP_MATERNO, 
                                    tipUsu.get(dato.ID_TDU),
                                    dato.EMAIL,
                                    dato.TELEFONO,
                                    _(<Estado estado={dato.ID_ESTADOS} />), 
                                    _(<Modificar dato={dato} obtenerDatos={obtenerDatos}/>)
                                ])}
                              
                                columns={[
                                    'Nombre completo',
                                    'Tipo de usuario',
                                    'Email',
                                    'Telefono',
                                    'Estado',
                                    'Acciones',
                                ]}
                                search={true}

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
                                        'placeholder': 'Nombre del medico',

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
