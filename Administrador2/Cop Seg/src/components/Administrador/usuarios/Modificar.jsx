import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem
} from '@mui/material'


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Timestamp } from 'firebase/firestore';

import { useState, useEffect } from 'react'
import { Stack, TextField } from '@mui/material'
import { insertarUSU } from '../firebase/Ususarios/USU_CRUD.js';
import { DatoDeLaBDActivos } from "../firebase/Especialides/ESP_CRUD.js"
import { tdu_Activos } from "../firebase/TiposDeUsuarios/TDU_CRUD.js"
import { DatoBD_Dom_Filtrado, insertarDom } from '../firebase/Domicilio/Dom_CRUD.js';
import dayjs from 'dayjs';
import { date_to_ts, ts_to_date } from '../firebase/Fechas/Fechas.js';


export default function Agregar({ dato ,obtenerDatos }) {
    const [open, setOpen] = useState(false)

    const [especialidad, setEspecialidad] = useState([]);
    const [roles, setRoles] = useState([]);

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
        ID_DOMICILIO: dato.ID_DOMICILIO
    })

    const [datosDom, setDatosDom] = useState({
        CIUDAD: dato.CALLE,
        COLONIA: dato.COLONIA,
        COD_POSTAL: dato.COD_POSTAL,
        CALLE: dato.CALLE,
        NUM_INTERIOR: dato.NUM_INTERIOR,
        NUM_EXTERIOR: dato.NUM_EXTERIOR
    })


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

    async function insertarUSUyDOM() {
        const ID_DOM = await insertarDom(datosDom);
        datosPer["ID_DOMICILIO"] = ID_DOM;
        await insertarUSU(datosPer)

    }


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
                                    <TextField label="Nombre" size="small" name="NOMBRE" value={datosPer.NOMBRE} onChange={(e) => handleDatosPersonales(e)} />
                                    <TextField label="Apellido paterno" name="AP_PATERNO" size="small" value={datosPer.AP_PATERNO} onChange={(e) => handleDatosPersonales(e)} />
                                    <TextField label="Apellido materno" name="AP_MATERNO" size="small" value={datosPer.AP_MATERNO} onChange={(e) => handleDatosPersonales(e)} />

                                    <TextField size='small' name="ID_ESPECIALIDAD" label="Especialidad" select value={datosPer.ID_ESPECIALIDAD} style={{ minWidth: '250px' }} onChange={(e) => handleDatosPersonales(e)}>
                                        {especialidad.map((dato, index) => (
                                            <MenuItem key={index} value={dato.ID} >{dato.ESPECIALIDAD}</MenuItem>
                                        ))}
                                    </TextField>

                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <TextField label="Telefono" name='TELEFONO' size="small" value={datosPer.TELEFONO} onChange={(e) => handleDatosPersonales(e)} />
                                    <TextField label="CEDULA" name="CEDULA" size="small" value={datosPer.CEDULA} onChange={(e) => handleDatosPersonales(e)} />

                                    <TextField size='small' name="ID_SEXO" label="Sexo" select value={datosPer.ID_SEXO} style={{ minWidth: '200px' }}
                                        onChange={(e) => handleDatosPersonales(e)}>
                                        <MenuItem value="1">Hombre</MenuItem>
                                        <MenuItem value="2">Mujer</MenuItem>
                                    </TextField>
                                
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker size="small" defaultValue={dayjs(ts_to_date(datosPer.NACIMIENTO))}  onChange={(newValue) => handleDate(newValue)} />
                                    </LocalizationProvider>
                                </Stack>

                                <h5 style={{ color: "black" }}>Domicilio</h5>
                                <hr />
                                <Stack direction="row" spacing={2}>
                                    <TextField label="Ciudad" size="small" name="CIUDAD" value={datosDom.CIUDAD} onChange={(e) => handleDatosDomicilio(e)} />
                                    <TextField label="Colonia" size="small" name="COLONIA" value={datosDom.COLONIA} onChange={(e) => handleDatosDomicilio(e)} />
                                    <TextField label="Codigo postal" size="small" name="COD_POSTAL" value={datosDom.COD_POSTAL} onChange={(e) => handleDatosDomicilio(e)} />
                                    <TextField label="Calle" size="small" name="CALLE" value={datosDom.CALLE} onChange={(e) => handleDatosDomicilio(e)} />
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <TextField label="Num. Exterior" size="small" name="NUM_EXTERIOR" value={datosDom.NUM_EXTERIOR} onChange={(e) => handleDatosDomicilio(e)} />
                                    <TextField label="Num. Interior" size="small" name="NUM_INTERIOR" value={datosDom.NUM_INTERIOR} onChange={(e) => handleDatosDomicilio(e)} />
                                </Stack>

                                <h5 style={{ color: "black" }}>Datos de cuenta</h5>
                                <hr />
                                <Stack direction="row" spacing={2}>
                                    <TextField label="ejemplo@vn.system.com" size="small" name="EMAIL" value={datosPer.EMAIL} onChange={(e) => handleDatosPersonales(e)} />
                                    <TextField label="constraseña" size="small" name="CLAVE" value={datosPer.CLAVE} onChange={(e) => handleDatosPersonales(e)} />

                                    <TextField size='small' label="Tipo de usuario" name="ID_TDU" select value={datosPer.ID_TDU} style={{ minWidth: '250px' }}
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
                        <Button className='bg-success text-white' onClick={ async () => {
                            setOpen(false)
                            
                            await insertarUSUyDOM()
                            obtenerDatos()
                        }} >Guardar</Button>

                    </DialogActions>
                </Dialog>
            </div>
        )
    }