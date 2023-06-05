import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
    Box,
    InputAdornment
} from '@mui/material'


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Toaster, toast } from "react-hot-toast"

import { useState, useEffect } from 'react'
import { Stack, TextField } from '@mui/material'
import { insertarUSU } from '../../firebase/Ususarios/USU_CRUD.js';
import { DatoDeLaBDActivos } from "../../firebase/Especialides/ESP_CRUD.js"
import { tdu_Activos } from "../../firebase/TiposDeUsuarios/TDU_CRUD.js"
import { insertarDom } from '../../firebase/Domicilio/Dom_CRUD.js';
import { date_to_ts } from '../../firebase/Fechas/Fechas.js';
import { insertarHorario } from '../../firebase/Horarios/HOR_CRUD.js';


export default function Agregar({ obtenerDatos, cedulas, correos }) {
    const [open, setOpen] = useState(false)

    const [especialidad, setEspecialidad] = useState([]);
    const [roles, setRoles] = useState([]);

    const regex = /^[A-Z\sa-z]+$/;
    const regexCurp = /[A-Z0-9]+/;

    const initialDatosPer = {
        NOMBRE: '',
        AP_MATERNO: '',
        AP_PATERNO: '',
        ID_ESPECIALIDAD: '',
        ID_SEXO: '',
        TELEFONO: '',
        CEDULA: '',
        NACIMIENTO: '',
        EMAIL: '',
        CLAVE: '',
        ID_TDU: '',
        ID_DOMICILIO: ''
    };

    const initialDatosDom = {

        CIUDAD: '',
        COLONIA: '',
        COD_POSTAL: '',
        CALLE: '',
        NUM_INTERIOR: '',
        NUM_EXTERIOR: ''

    };

    const [datosPer, setDatosPer] = useState(initialDatosPer)


    const [datosDom, setDatosDom] = useState(initialDatosDom)


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

    async function obtenerRoles() {
        setRoles(await tdu_Activos());
    }

    const insertarUSUyDOM = async (evt) => {
        evt.preventDefault(); //Evitamos que se recargue la pagina

        if(datosPer.CEDULA.length != 8 ){
            toast.error('Cedula invalida')
            return
        }

        if(datosPer.TELEFONO.length != 10 ){
            toast.error('Telefono invalido')
            return
        }

        if (correos.includes(datosPer.EMAIL)) {  //Revisamos que no exista el correo
            toast.error('EL CORREO YA EXISTE')
        } else {
            if (cedulas.includes(datosPer.CEDULA)) {  //Revisamos que no este en uso la cedula
                toast.error('LA CEDULA YA ESTA EN USO')
            } else {
                
                const ID_DOM = await insertarDom(datosDom);
                datosPer["ID_DOMICILIO"] = ID_DOM;
                const ID_USU = await insertarUSU(datosPer)
                await insertarHorario(ID_USU)
                reiniciarFormulario()
                setOpen(false)
                obtenerDatos()
                toast.success('Usuario guardado')
            }
        }
    }

    function reiniciarFormulario() {
        setDatosPer(initialDatosPer)
        setDatosDom(initialDatosDom)
    }



    return (
        <div>
            <Button style={{ backgroundColor: "#0048FF", color: "white" }} onClick={() => { setOpen(true) }}>Agregar</Button>

            <Dialog

                name="hola"
                open={open}
                onClose={() => {
                    setOpen(false)
                    reiniciarFormulario()
                }}
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
                            reiniciarFormulario()
                        }}>X</Button>
                        <hr />
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
                                            if (datosPer.CEDULA.length < 8 | e.nativeEvent.inputType == "deleteContentBackward") {
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
                                            onChange={(newValue) => handleDate(newValue)}
                                        />
                                    </LocalizationProvider>


                                </Stack>

                                <h5 style={{ color: "black" }}>Domicilio</h5>
                                <hr />
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
                                <hr />
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
            </Dialog>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
        </div>
    )
}