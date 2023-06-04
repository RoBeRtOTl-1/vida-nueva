import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/UserContext";

//import { DataProvider } from "../context/UserContext";

export default function UserCurrRol() {

    const { currenUser } = useContext(DataContext) //Ojo poner el DataContext cuando lo deseamos consumir

    return (
        <div className="d-flex align-items-center vh-100" >
            <div className=" container text-center">
                <div style={{ height: "130px" }} className="row d-flex justify-content-between">

                    {
                        currenUser.ADMINISTRACION ?
                            (<EtLink
                                nombre="Administrador"
                                rutImg="src/css/img/Roles/Administrador.png"
                                bgColor="FFAEAE"
                                toPath="/Administrador" />)
                            :
                            (null)
                    }

                    {
                        currenUser.ESPECIALISTA ?
                            (<EtLink
                                nombre="Medico especialista"
                                rutImg="src/css/img/Roles/Medico.png"
                                bgColor="A8D3F9"
                                toPath="/Especialista" />)
                            :
                            (null)
                    }

                    {
                        currenUser.MEDICOGENERAL ?
                            (<EtLink
                                nombre="Medico general"
                                rutImg="src/css/img/Roles/Medico.png"
                                bgColor="A8D3F9"
                                toPath="/General" />)
                            :
                            (null)
                    }


                    {
                        currenUser.RECEPCION ?
                            (<EtLink
                                nombre="Recepcionista"
                                rutImg="src/css/img/Roles/Recepcionista.png"
                                bgColor="92EAA6"
                                toPath="/Recepcionista"
                            />)
                            :
                            (null)
                    }

                    {
                        currenUser.TURNOS ?
                            (<EtLink
                                nombre="Turnos"
                                rutImg="src/css/img/Roles/Turnos.png"
                                bgColor="D6F5FF"
                                toPath="/Turnos"
                            />)
                            :
                            (null)
                    }
                </div>
            </div>
        </div>
    )
}

function EtLink({ nombre, rutImg, bgColor, toPath }) {
    return (
        <Link className="pt-3 text-dark link-offset-2 link-underline link-underline-opacity-0" style={{ width: "200px", backgroundColor: `#${bgColor}` }} to={toPath}>
            <p>{nombre}</p>
            <img src={rutImg} style={{ width: "40px" }} alt="" />
        </Link>
    )
}
