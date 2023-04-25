import { Button, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import IniciarSesion from "../firebase/autenticacion/AUTH_CRUD"
import { useNavigate } from "react-router-dom"


export default function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        EMAIL: '',
        CLAVE: ''
    })
    function handleUser(event) {
        setUser({ ...user, [event.target.name]: event.target.value })
    }


    async function validarCorreo() {
        IniciarSesion(user)
        // let re = new RegExp('^[a-z|A-Z|0-9|_]+@vn\.system\.com$')
        // if (re.test(user.EMAIL)) {
        //     MySwal.fire({
        //         icon: 'error',
        //         text: 'EMAIL O CONTRASEÑA INCORRECTOS',
        //     })
        // }
        //console.log(re.test(user.EMAIL))
        navigate("/Ventanas")
        //<Navigate to="/Recepcionista" />
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <img src="src/css/img/login/img_login.png" alt="Imagen de fondo" className="img-fluid" style={{ marginTop: "30%", marginLeft: "5%" }} />
                    </div>
                    <div className="col-lg-6 d-flex align-items-center justify-content-center">
                        <div className="rounded-3" style={{ backgroundColor: "#B1CBFF", width: "60%", height: "75%", padding: "50px", paddingTop: "50px", marginTop: "130px" }}>
                            <div className="">
                                <Typography className="text-center" variant="h4">Iniciar sesion</Typography>


                                <Stack spacing={100}>
                                    <Stack direction="row" spacing={2}>
                                        <TextField style={{ marginTop: "70px" }}
                                            label="Correo electronico"
                                            value={user.EMAIL}
                                            name="EMAIL"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                    <i className="fa fa-search material-icons">mail_outline</i>
                                                </InputAdornment>
                                            }}
                                            onChange={(e) => handleUser(e)} />
                                    </Stack>
                                </Stack>

                                <Stack spacing={100}>
                                    <Stack direction="row" spacing={2}>
                                        <TextField style={{ marginTop: "50px" }}
                                            label="Contraseña"
                                            name="CLAVE"
                                            value={user.CLAVE}
                                            type="password"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><i className="fa fa-search material-icons">lock_outline</i></InputAdornment>
                                            }}
                                            onChange={(e) => handleUser(e)} />
                                    </Stack>
                                </Stack>

                                <div className="text-center" style={{ marginTop: "80px" }}>
                                    <Button style={{
                                        width: "100px",
                                        background: "#426ACF",
                                        color: "white",
                                        borderRadius: "5px"
                                    }}
                                        onClick={() => {

                                            validarCorreo()
                                        }}
                                    >Ingresar</Button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
