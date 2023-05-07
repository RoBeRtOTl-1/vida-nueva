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

import { Toaster, toast } from "react-hot-toast"

import { useState, useEffect } from 'react'
import { Stack, TextField } from '@mui/material'
import { insertarDom } from '../../firebase/Domicilio/Dom_CRUD.js';
import { date_to_ts } from '../../firebase/Fechas/Fechas.js';
import { insertarHorario } from '../../firebase/Horarios/HOR_CRUD.js';
import TIPOS_DE_SANGRE from '../../firebase/TiposSangre/TS_CRUD.js';
import { insertarPaciente } from '../../firebase/Pacientes/PAC_CRUD.js';



export default function Agregar({ obtenerDatos }) {
    const [open, setOpen] = useState(false)
    const [tiposSangre, setTiposSangre] = useState(TIPOS_DE_SANGRE());
    const [datosPer, setDatosPer] = useState({
        NOMBRE: '',
        AP_MATERNO: '',
        AP_PATERNO: '',
        ID_TIP_SANGRE: '',
        TELEFONO: '',
        CURP: '',
        ID_SEXO: '',
        NACIMIENTO: '',
        EMAIL: '',
        ALEGIAS: '',
        ID_DOMICILIO: ''
    })

    const [datosDom, setDatosDom] = useState({
        CIUDAD: '',
        COLONIA: '',
        COD_POSTAL: '',
        CALLE: '',
        NUM_INTERIOR: '',
        NUM_EXTERIOR: ''
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

    }, []);

    /**
     * Este metodo insertara al domicilio y al usuario
     * Primero inserta al domicilio, guarda su ID y se lo asigna al 
     * objeto que tiene los datos del usuario, y por ultimo inserta los datos del usuario
     */
    async function insertarPACyDOM() {
        const ID_DOM = await insertarDom(datosDom);
        datosPer["ID_DOMICILIO"] = ID_DOM;
        const ID_USU = await insertarPaciente(datosPer)
        toast.success('Paciente guardado')
    }


    return (
        <div>
            <Button style={{ backgroundColor: "#0048FF", color: "white" }} onClick={() => { setOpen(true) }}>Agregar</Button>
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

                                <TextField size='small' name="ID_TIP_SANGRE" label="Tipo de sangre" select value={datosPer.ID_TIP_SANGRE} style={{ minWidth: '250px' }} onChange={(e) => handleDatosPersonales(e)}>

                                    {tiposSangre.map((dato) => (
                                        <MenuItem value={dato.ID} >{dato.TIPO_SANGRE}</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <TextField type="number" label="Telefono" name='TELEFONO' size="small" value={datosPer.TELEFONO} onChange={(e) => handleDatosPersonales(e)} />
                                <TextField label="CURP" name="CURP" size="small" value={datosPer.CURP} onChange={(e) => handleDatosPersonales(e)} />

                                <TextField size='small' name="ID_SEXO" label="Sexo" select value={datosPer.ID_SEXO} style={{ minWidth: '200px' }}
                                    onChange={(e) => handleDatosPersonales(e)}>
                                    <MenuItem value="1">Hombre</MenuItem>
                                    <MenuItem value="2">Mujer</MenuItem>
                                </TextField>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Fecha de nacimiento" onChange={(newValue) => handleDate(newValue)} />
                                </LocalizationProvider>


                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <TextField label="Email" size="small" name="EMAIL" value={datosPer.EMAIL} onChange={(e) => handleDatosPersonales(e)} />
                                <TextField label="Alergias" size="small" multiline name="ALERGIAS" value={datosPer.CLAVE} onChange={(e) => handleDatosPersonales(e)} />

                            </Stack>

                            <h5 style={{ color: "black" }}>Domicilio</h5>
                            <hr />
                            <Stack direction="row" spacing={2}>
                                <TextField label="Ciudad" size="small" name="CIUDAD" value={datosDom.CIUDAD} onChange={(e) => handleDatosDomicilio(e)} />
                                <TextField label="Colonia" size="small" name="COLONIA" value={datosDom.COLONIA} onChange={(e) => handleDatosDomicilio(e)} />
                                <TextField type="number" label="Codigo postal" size="small" name="COD_POSTAL" value={datosDom.COD_POSTAL} onChange={(e) => handleDatosDomicilio(e)} />
                                <TextField label="Calle" size="small" name="CALLE" value={datosDom.CALLE} onChange={(e) => handleDatosDomicilio(e)} />
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <TextField type="number" label="Num. Exterior" size="small" name="NUM_EXTERIOR" value={datosDom.NUM_EXTERIOR} onChange={(e) => handleDatosDomicilio(e)} />
                                <TextField type="number" label="Num. Interior" size="small" name="NUM_INTERIOR" value={datosDom.NUM_INTERIOR} onChange={(e) => handleDatosDomicilio(e)} />
                            </Stack>

                        </Stack>
                    </DialogContentText>
                </DialogContent>

                <DialogActions className='align-middle'>
                    <Button className='bg-success text-white' onClick={async () => {
                        setOpen(false)

                        await insertarPACyDOM()
                        //obtenerDatos()
                    }} >Guardar</Button>

                </DialogActions>
            </Dialog>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
        </div>
    )
}