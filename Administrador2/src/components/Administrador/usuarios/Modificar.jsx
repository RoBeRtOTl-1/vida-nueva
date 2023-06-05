import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
    Box,
    Divider,
    InputAdornment
} from '@mui/material'


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Timestamp } from 'firebase/firestore';
import { Toaster, toast } from "react-hot-toast"

import { useState, useEffect } from 'react'
import { Stack, TextField } from '@mui/material'
import { actualizarUsuario, insertarUSU } from '../../firebase/Ususarios/USU_CRUD.js';
import { DatoDeLaBDActivos } from "../../firebase/Especialides/ESP_CRUD.js"
import { tdu_Activos } from "../../firebase/TiposDeUsuarios/TDU_CRUD.js"
import { DatoBD_Dom_Filtrado, actualizarDom, insertarDom } from '../../firebase/Domicilio/Dom_CRUD.js';
import dayjs from 'dayjs';
import { date_to_ts, ts_to_date } from '../../firebase/Fechas/Fechas.js';


export default function Modificar({ dato, obtenerDatos }) {

    const [open, setOpen] = useState(false)
    const [especialidad, setEspecialidad] = useState([]);
    const [roles, setRoles] = useState([]);

    const regex = /^[A-Z\sa-z]+$/;

    const [datosPer, setDatosPer] = useState({
        NOMBRE: dato.NOMBRE,
        AP_MATERNO: dato.AP_MATERNO,
        AP_PATERNO: dato.AP_PATERNO,
        ID_ESPECIALIDAD: dato.ID_ESPECIALIDAD,
        ID_SEXO: dato.ID_SEXO,
        TELEFONO: dato.TELEFONO,
        CEDULA: dato.CEDULA,
        NACIMIENTO: dato.NACIMIENTO,
        EMAIL: dato.EMAIL,
        CLAVE: dato.CLAVE,
        ID_TDU: dato.ID_TDU,
        ID_DOMICILIO: dato.ID_DOMICILIO,
        ID_ESTADOS: dato.ID_ESTADOS
    })

    const [datosDom, setDatosDom] = useState({
        CIUDAD: dato.CIUDAD,
        COLONIA: dato.COLONIA,
        COD_POSTAL: dato.COD_POSTAL,
        CALLE: dato.CALLE,
        NUM_INTERIOR: dato.NUM_INTERIOR,
        NUM_EXTERIOR: dato.NUM_EXTERIOR
    })

    //usar ...

    function handleDatosPersonales(event) {
        setDatosPer({ ...datosPer, [event.target.name]: event.target.value })
    }

    function handleDatosDomicilio(event) {
        setDatosDom({ ...datosDom, [event.target.name]: event.target.value })
    }

    function handleDate(newValue) {
        datosPer["NACIMIENTO"] = date_to_ts(newValue)
    }


    useEffect(() => {
        obtenerEspecialidades()
        obtenerRoles()
    }, []);

    async function obtenerEspecialidades() {
        setEspecialidad(await DatoDeLaBDActivos());
    }

    async function obtenerRoles() {
        setRoles(await tdu_Activos());
    }

    async function insertarUSUyDOM(evt) {
        evt.preventDefault(); //Evitamos que se recargue la pagina

        if (datosPer.CEDULA.length != 8) {
            toast.error('Cedula invalida')
            return
        }

        if (datosPer.TELEFONO.length != 10) {
            toast.error('Telefono invalido')
            return
        }


        await actualizarDom(dato.ID_DOMICILIO, datosDom);
        await actualizarUsuario(dato.ID, datosPer)
        toast.success("Usuario actualizado")
        setOpen(false)
        obtenerDatos()
    }


    const handleIcon = () => {
        if (icon == "bi bi-eye-slash"){
            setIcon("bi bi-eye")
            setKindInput("text")
        }else{
            setIcon("bi bi-eye-slash")
            setKindInput("password")
        }
    }

    const [kindInput, setKindInput] = useState("password")
    const [icon, setIcon] = useState('bi bi-eye-slash')

    return (
        <div>
            <Button onClick={() => setOpen(true)}>
                <img
                    src="src/css/img/acciones/Modificar.png"
                    style={{ width: "30px" }}
                />
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
                PaperProps={{
                    style: {
                        maxWidth: '1000px',
                    },
                }}>

                <Box
                    component='form'
                    onSubmit={insertarUSUyDOM}
                >
                    <DialogTitle id='dialog-title'>
                        <span style={{ color: "black", fontSize: "23px" }}>Datos personales</span>
                        <Button onClick={() => {
                            setOpen(false)
                        }}>X</Button>
                        <Divider />
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className='mt-2' id='dialog-description'>
                            <Stack spacing={3}>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        label="Nombre"
                                        size="small"
                                        name="NOMBRE"
                                        required
                                        value={datosPer.NOMBRE}
                                        onChange={(e) => {
                                            if ((e.target.value.length < 30 && regex.test(e.target.value)) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                handleDatosPersonales(e);
                                            }
                                        }}
                                    />

                                    <TextField
                                        label="Apellido paterno"
                                        name="AP_PATERNO"
                                        required
                                        size="small"
                                        value={datosPer.AP_PATERNO}
                                        onChange={(e) => {
                                            if ((e.target.value.length < 30 && regex.test(e.target.value)) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                handleDatosPersonales(e);
                                            }
                                        }}
                                    />

                                    <TextField
                                        label="Apellido materno"
                                        name="AP_MATERNO"
                                        required
                                        size="small"
                                        value={datosPer.AP_MATERNO}
                                        onChange={(e) => {
                                            if ((e.target.value.length < 30 && regex.test(e.target.value)) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                handleDatosPersonales(e);
                                            }
                                        }}
                                    />

                                    <TextField required size='small' name="ID_ESPECIALIDAD" label="Especialidad" select value={datosPer.ID_ESPECIALIDAD} style={{ minWidth: '250px' }} onChange={(e) => handleDatosPersonales(e)}>
                                        {especialidad.map((dato, index) => (
                                            <MenuItem key={index} value={dato.ID} >{dato.ESPECIALIDAD}</MenuItem>
                                        ))}
                                    </TextField>

                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        required
                                        type="number"
                                        label="Telefono"
                                        name='TELEFONO'
                                        size="small"
                                        value={datosPer.TELEFONO}
                                        onChange={(e) => {
                                            if (datosPer.TELEFONO.length < 10 | e.nativeEvent.inputType == "deleteContentBackward") {
                                                handleDatosPersonales(e)
                                            }
                                        }}
                                    />
                                    <TextField
                                        required
                                        label="Cedula"
                                        name="CEDULA"
                                        size="small"
                                        value={datosPer.CEDULA}
                                        type="number"
                                        onChange={(e) => {
                                            if (datosPer.CEDULA.length < 8 || e.nativeEvent.inputType == "deleteContentBackward") {
                                                handleDatosPersonales(e)
                                            }
                                        }}
                                    />

                                    <TextField required size='small' name="ID_SEXO" label="Sexo" select value={datosPer.ID_SEXO} style={{ minWidth: '200px' }}
                                        onChange={(e) => handleDatosPersonales(e)}>
                                        <MenuItem value="1">Hombre</MenuItem>
                                        <MenuItem value="2">Mujer</MenuItem>
                                    </TextField>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            disableFuture={true}
                                            label="Fecha de nacimiento"
                                            size="small"
                                            defaultValue={dayjs(ts_to_date(datosPer.NACIMIENTO))}
                                            onChange={(newValue) => handleDate(newValue)}
                                        />
                                    </LocalizationProvider>



                                </Stack>

                                <h5 style={{ color: "black" }}>Domicilio</h5>
                                <Divider />
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        required
                                        label="Ciudad"
                                        size="small"
                                        name="CIUDAD"
                                        value={datosDom.CIUDAD}
                                        onChange={(e) => {
                                            if ((e.target.value.length < 30 && regex.test(e.target.value)) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                handleDatosDomicilio(e);
                                            }
                                        }}
                                    />
                                    <TextField
                                        required
                                        label="Colonia"
                                        size="small"
                                        name="COLONIA"
                                        value={datosDom.COLONIA}
                                        onChange={(e) => {
                                            if ((e.target.value.length < 30 && regex.test(e.target.value)) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                handleDatosDomicilio(e);
                                            }
                                        }}
                                    />
                                    <TextField
                                        required
                                        type="number"
                                        label="Codigo postal"
                                        size="small"
                                        name="COD_POSTAL"
                                        value={datosDom.COD_POSTAL}
                                        onChange={(e) => {
                                            if (datosDom.COD_POSTAL.length < 5 || e.nativeEvent.inputType == "deleteContentBackward") {
                                                handleDatosDomicilio(e)
                                            }
                                        }}

                                    />
                                    <TextField
                                        required
                                        label="Calle"
                                        size="small"
                                        name="CALLE"
                                        value={datosDom.CALLE}
                                        onChange={(e) => {
                                            if ((e.target.value.length < 30 && regex.test(e.target.value)) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                handleDatosDomicilio(e)
                                            }
                                        }}
                                    />
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        type="number"
                                        required
                                        label="Num. Exterior"
                                        size="small"
                                        name="NUM_EXTERIOR"
                                        value={datosDom.NUM_EXTERIOR}
                                        onChange={(e) => {
                                            if (datosDom.NUM_EXTERIOR.length < 5 || e.nativeEvent.inputType == "deleteContentBackward") {
                                                handleDatosDomicilio(e)
                                            }
                                        }}
                                    />
                                    <TextField
                                        type="number"
                                        label="Num. Interior"
                                        size="small"
                                        name="NUM_INTERIOR"
                                        value={datosDom.NUM_INTERIOR}
                                        onChange={(e) => {
                                            if (datosDom.NUM_INTERIOR.length < 5 || e.nativeEvent.inputType == "deleteContentBackward") {
                                                handleDatosDomicilio(e)
                                            }
                                        }}
                                    />
                                </Stack>

                                <h5 style={{ color: "black" }}>Datos de cuenta</h5>
                                <Divider />
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        required
                                        type='email'
                                        label="ejemplo@vn.system.com"
                                        size="small"
                                        name="EMAIL"
                                        value={datosPer.EMAIL}
                                        onChange={(e) => handleDatosPersonales(e)}
                                    />
                                    <TextField
                                        required
                                        type={kindInput}
                                        label="contraseña"
                                        size="small"
                                        name="CLAVE"
                                        value={datosPer.CLAVE}
                                        onChange={(e) => handleDatosPersonales(e)}
                                        InputProps={{
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <i class={icon}
                                                        onClick={() => {handleIcon() }}
                                                    ></i>
                                                </InputAdornment>

                                        }}
                                    />

                                    <TextField required size='small' label="Tipo de usuario" name="ID_TDU" select value={datosPer.ID_TDU} style={{ minWidth: '250px' }}
                                        onChange={(e) => handleDatosPersonales(e)}>
                                        {roles.map((dato, index) => (
                                            <MenuItem key={index} value={dato.ID} >{dato.NOMBRE}</MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>

                            </Stack>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='align-middle'>
                        <Button
                            className='bg-success text-white'
                            type="submit" >Guardar</Button>
                    </DialogActions>
                </Box>

                <Toaster
                    position="top-right"
                    reverseOrder={true}
                />
            </Dialog>
        </div>
    )
}