import React from "react";
import { Link } from "react-router-dom";
//Tiene condigo abajo comentado

export default function UserCurrRol(){

    return (
        <div className="d-flex align-items-center vh-100" >
            <div  className=" container text-center">
                <div style={{ height: "130px" }} className="row d-flex justify-content-between">
                    <Link className="pt-3" style={{ width: "200px", backgroundColor: "#FFAEAE" }} to="/Administrador">
                        <p>Administrador</p>
                        <img src="src/css/img/Roles/Administrador.png" style={{ width: "40px" }} alt="" />
                    </Link>

                    <Link className="pt-3" style={{ width: "200px", backgroundColor: "#A8D3F9" }} to="/General">
                        <p>Medico general</p>
                        <img src="src/css/img/Roles/Medico.png" style={{ width: "40px" }} alt="" />
                    </Link>
                    <Link className="pt-3" style={{ width: "200px", backgroundColor: "#A8D3F9" }} to="/Especialista">
                        <p>Medico especialista</p>
                        <img src="src/css/img/Roles/Medico.png" style={{ width: "40px" }} alt="" />
                    </Link>
                    <Link className="pt-3" style={{ width: "200px", backgroundColor: "#92EAA6" }} to="/Recepcionista">
                        <p>Recepcionista</p>
                        <img src="src/css/img/Roles/Recepcionista.png" style={{ width: "40px" }} alt="" />
                    </Link>
                    <Link className="pt-3" style={{ width: "200px", backgroundColor: "#D6F5FF" }} to="/Turnos">
                        <p>Turnos</p>
                        <img src="src/css/img/Roles/Turnos.png" style={{ width: "40px" }} alt="" />
                    </Link>
                </div>
            </div>
        </div>
    )
}


// function Navigation() {
//     return (
//         <div className=" container text-center">
//             <div style={{ height: "130px" }} className="row d-flex justify-content-between">
               

//                 <Link className="pt-3" style={{ width: "200px", backgroundColor: "#FFAEAE" }} to="/Administrador">
//                     <p>Administrador</p>
//                     <img src="src/css/img/Roles/Administrador.png" style={{ width: "40px" }} alt="" />
//                 </Link>

//                 <Link className="pt-3" style={{ width: "200px", backgroundColor: "#A8D3F9" }} to="/General">
//                     <p>Medico general</p>
//                     <img src="src/css/img/Roles/Medico.png" style={{ width: "40px" }} alt="" />
//                 </Link>
//                 <Link className="pt-3" style={{ width: "200px", backgroundColor: "#A8D3F9" }} to="/Especialista">
//                     <p>Medico especialista</p>
//                     <img src="src/css/img/Roles/Medico.png" style={{ width: "40px" }} alt="" />
//                 </Link>
//                 <Link className="pt-3" style={{ width: "200px", backgroundColor: "#92EAA6" }} to="/Recepcionista">
//                     <p>Recepcionista</p>
//                     <img src="src/css/img/Roles/Recepcionista.png" style={{ width: "40px" }} alt="" />
//                 </Link>
//                 <Link className="pt-3" style={{ width: "200px", backgroundColor: "#D6F5FF" }} to="/Turnos">
//                     <p>Turnos</p>
//                     <img src="src/css/img/Roles/Turnos.png" style={{ width: "40px" }} alt="" />
//                 </Link>
//             </div>
//         </div>

//     )



// <Link className="pt-3" style={{ width: "200px", backgroundColor: "#FFAEAE" }} to="/Login">
// <img src="src/css/img/Roles/Medico.png" style={{ width: "40px" }} alt="" />
// </Link>

