import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import React, { useContext, useState } from "react"

import IniciarSesion from "../firebase/autenticacion/AUTH_CRUD"
import { useNavigate } from "react-router-dom"


import { Toaster, toast } from "react-hot-toast"
import { DataContext } from "../../context/UserContext"


export default function Login() {
    const navigate = useNavigate()

    const [kindInput, setKindInput] = useState("password")
    const [icon, setIcon] = useState('bi bi-eye-slash')

    const handleIcon = () => {
        if (icon == "bi bi-eye-slash"){
            setIcon("bi bi-eye")
            setKindInput("text")
        }else{
            setIcon("bi bi-eye-slash")
            setKindInput("password")
        }
    }

    const [user, setUser] = useState({
        EMAIL: '',
        CLAVE: ''
    })

    const { currenUser, setCurrentUser } = useContext(DataContext)

    function handleUser(event) {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    async function validarCorreo() {
        const login = await IniciarSesion(user.EMAIL, user.CLAVE)
        if (login) { //Logueo correcto
            setCurrentUser(login)
            navigate("/Ventanas")
        } else { //No se encontro al usuario
            toast.error('USUARIO Y/0 \nCONTRASEÑA INCORRECTOS')
        }

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
                                            type={kindInput}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><i className="fa fa-search material-icons" >lock_outline</i></InputAdornment>,
                                                endAdornment:
                                                    <InputAdornment position="end">
                                                        <i class={icon}
                                                            onClick={() => {handleIcon() }}
                                                        ></i>
                                                    </InputAdornment>

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
                <Toaster
                    position="top-right"
                    reverseOrder={true}
                />
            </div>
        </>
    )
}
