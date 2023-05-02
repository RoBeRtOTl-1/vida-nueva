import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
    InputAdornment
} from '@mui/material'


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Timestamp } from 'firebase/firestore';

import { Toaster, toast } from "react-hot-toast"
import React, { useState, useEffect } from 'react'
import { Stack, TextField } from '@mui/material'


import { date_to_ts } from '../../firebase/Fechas/Fechas.js';
import { DataContext } from "../../../context/UserContext.jsx"




export default function ConsultaMedica({ ID_PACIENTE, ID_USUARIO ,obtenerDatos }) {
    const [open, setOpen] = useState(false)
    

    const [datosPer, setDatosPer] = useState({
        ID_PACIENTES: ID_PACIENTE,
        ID_USUARIO: ID_USUARIO,
        PESO: '',
        ESTATURA: '',
        IMC: '',
        FECHAHORA: '',
        PRESION_SIAST: '',
        PRESION_DIAST: '',
        SINTOMAS: '',
        DIAGNOSTICO: '',
        MEDICAMENTOS: ''
    })

    function handleDatosPersonales(event) {
        setDatosPer({ ...datosPer, [event.target.name]: event.target.value })
    }

    function handleDate(newValue) {
        datosPer["FECHAHORA"] = date_to_ts(newValue)
    }


    useEffect(() => {

    }, []);

    /**
     * Este metodo guarda la consulta medica
     */
    async function guardarConsultaMedica() {
        console.log(datosPer)
    }


    return (
        <div>
            <Button onClick={() => setOpen(true)}>
                <img
                    src="src/css/img/Medico/RegistrarConsulta.png"
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
                    <span style={{ color: "black", fontSize: "23px" }}>Registar consulta medica</span>
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
                                <TextField type="number" label="Peso" size="small" name="PESO"
                                    value={datosPer.PESO}
                                    onChange={(e) => handleDatosPersonales(e)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                    }} />

                                <TextField label="Estatura" name="ESTATURA" size="small"
                                    value={datosPer.ESTATURA}
                                    onChange={(e) => handleDatosPersonales(e)}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                    }} />


                                <TextField label="IMC" name="IMC" size="small"
                                    value={datosPer.IMC}
                                    onChange={(e) => handleDatosPersonales(e)} />

                                <TextField label="Presion siast" name="PRESION_SIAST" size="small"
                                    value={datosPer.PRESION_SIAST}
                                    onChange={(e) => handleDatosPersonales(e)} />

                                <TextField label="Presion diast" name="PRESION_DIAST" size="small"
                                    value={datosPer.PRESION_DIAST}
                                    onChange={(e) => handleDatosPersonales(e)} />
                            </Stack>

                            <Stack spacing={2}>
                                <TextField  
                                label="Sintomas" 
                                name='SINTOMAS' 
                                size="small" 
                                value={datosPer.SINTOMAS} 
                                onChange={(e) => handleDatosPersonales(e)} />
                            </Stack>

                            <Stack spacing={2}>
                                <TextField 
                                label="Diagnostico" 
                                name='DIAGNOSTICO' 
                                size="small" 
                                value={datosPer.DIAGNOSTICO} 
                                onChange={(e) => handleDatosPersonales(e)} />
                            </Stack>
                            
                            <Stack spacing={2}>
                                <TextField 
                                label="Medicamentos" 
                                name='MEDICAMENTOS' 
                                size="small" 
                                value={datosPer.MEDICAMENTOS} 
                                onChange={(e) => handleDatosPersonales(e)} />
                            </Stack>


                        </Stack>
                    </DialogContentText>
                </DialogContent>

                <DialogActions className='align-middle'>
                    <Button className='bg-success text-white' onClick={async () => {
                        setOpen(false)
                        await guardarConsultaMedica()
                        obtenerDatos()
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