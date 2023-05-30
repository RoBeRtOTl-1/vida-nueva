import React, { useState, useEffect } from "react";
import { DatoDeLaBD } from "../../firebase/Ususarios/USU_CRUD";
import { DatoDeLaBD as DatoBD_TDU } from "../../firebase/TiposDeUsuarios/TDU_CRUD";
import Agregar from "./Agregar";
import Modificar from "./Modificar";
import Estado from "../estados/Estados";

import { _, Grid } from 'gridjs-react';
import { esES } from "gridjs/l10n";


export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tipUsu, setTipUsu] = useState(new Map())
    const [cedulas, setCedulas] = useState([])
    const [correos, setCorreos] = useState([])

    async function obtenerDatos() { 
        setUsuarios([]);
        setTipUsu(new Map());        
        setCedulas([])
        setCorreos([])

        const datosBD = await DatoDeLaBD();        
        const arrCedulas = (datosBD.map ( dato => dato.CEDULA ))
        const arrCorreos = (datosBD.map ( dato => dato.EMAIL ))
        
        const tU = await DatoBD_TDU();
        const map =  new Map(tU.map(dato => [dato.ID, dato.NOMBRE]));
        
        setUsuarios(datosBD);
        setCedulas(arrCedulas)
        setCorreos(arrCorreos)
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
                        <Agregar obtenerDatos={obtenerDatos} cedulas={cedulas} correos={correos} />
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

                                language={esES}
                            />

                           
                        )}
                    </div>
                </div>
                
            </div>
        </div>


    )
}
