import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
    InputAdornment,
    Box
} from '@mui/material'

import { Toaster, toast } from "react-hot-toast"
import React, { useState, useEffect } from 'react'
import { Stack, TextField } from '@mui/material'
import { date_to_ts, getCurrentDate } from '../../firebase/Fechas/Fechas.js';
import { insertarConsulta } from '../../firebase/Consultas/CTAS_CRUD.js';


export default function ConsultaMedica({ ID_PACIENTE, ID_USUARIO, obtenerDatos }) {
    const [open, setOpen] = useState(false)

    const initialDatosPer = {
        ID_PACIENTE: ID_PACIENTE,
        ID_USUARIO: ID_USUARIO,
        PESO: '',
        ESTATURA: '',
        IMC: '',
        FECHAHORA: date_to_ts(getCurrentDate()),
        PRESION_SIAST: '',
        PRESION_DIAST: '',
        SINTOMAS: '',
        DIAGNOSTICO: '',
        MEDICAMENTOS: ''
    }
    const regex = /^[A-Z\sa-z0-9_]+$/;

    const [datosPer, setDatosPer] = useState(initialDatosPer)

    function handleDatosPersonales(event) {
        setDatosPer({ ...datosPer, [event.target.name]: event.target.value })
    }

    const handleDatos = (e) => {
        const { name, value } = e.target;
        let newDatosPer = { ...datosPer, [name]: value };

        if (name === 'PESO' || name === 'ESTATURA') {
            const peso = parseFloat(newDatosPer.PESO);
            const estatura = parseFloat(newDatosPer.ESTATURA);
            const imc = peso && estatura ? (peso / Math.pow(estatura / 100, 2)).toFixed(2) : '';
            newDatosPer = { ...newDatosPer, IMC: imc };
        }

        setDatosPer(newDatosPer);
    };

    /**
     * Este metodo guarda la consulta medica
     */
    const saveConsulta = async (evt) => {
        evt.preventDefault()

        await insertarConsulta(datosPer)
        //await actualizarCita(select.id, '3') //Cambiamos el estado de la cita a atendido
        setOpen(false)
        obtenerDatos()
        setDatosPer(initialDatosPer)
        toast.success('Cita registrada')
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
                <Box
                    component='form'
                    onSubmit={saveConsulta}
                >

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
                                    <TextField
                                        type="number"
                                        label="Peso"
                                        size="small"
                                        name="PESO"
                                        required
                                        value={datosPer.PESO}

                                        onChange={(e) => {

                                            if (datosPer.PESO.length < 4 | e.nativeEvent.inputType == "deleteContentBackward") {
                                                handleDatos(e)
                                            }
                                        }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                        }} />

                                    <TextField
                                        label="Estatura"
                                        name="ESTATURA"
                                        size="small"
                                        value={datosPer.ESTATURA}
                                        onChange={(e) => {
                                            if (datosPer.ESTATURA.length < 3 | e.nativeEvent.inputType == "deleteContentBackward") {
                                                handleDatos(e)
                                            }
                                        }}
                                        required
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                        }} />


                                    <TextField
                                        label="IMC"
                                        name="IMC"
                                        size="small"
                                        required
                                        value={datosPer.IMC}
                                    />

                                    <TextField
                                        label="Presion siast"
                                        name="PRESION_SIAST"
                                        size="small"
                                        required
                                        type="number"
                                        value={datosPer.PRESION_SIAST}
                                        onChange={(e) => {
                                            if (datosPer.PRESION_SIAST.length < 5 | e.nativeEvent.inputType == "deleteContentBackward") {
                                                handleDatosPersonales(e)
                                            }

                                        }} />

                                    <TextField
                                        label="Presion diast"
                                        name="PRESION_DIAST"
                                        size="small"
                                        type="number"
                                        required
                                        value={datosPer.PRESION_DIAST}
                                        onChange={(e) => {
                                            if (datosPer.PRESION_DIAST.length < 5 | e.nativeEvent.inputType == "deleteContentBackward") {
                                                handleDatosPersonales(e)
                                            }

                                        }} />
                                </Stack>

                                <Stack spacing={2}>
                                    <TextField
                                        label="Sintomas"
                                        name='SINTOMAS'
                                        size="small"
                                        value={datosPer.SINTOMAS}
                                        required
                                        multiline
                                        maxRows={4}
                                        onChange={(e) => handleDatosPersonales(e)} />
                                </Stack>

                                <Stack spacing={2}>
                                    <TextField
                                        label="Diagnostico"
                                        name='DIAGNOSTICO'
                                        size="small"
                                        value={datosPer.DIAGNOSTICO}
                                        required
                                        multiline
                                        maxRows={4}
                                        onChange={(e) => handleDatosPersonales(e)} />
                                </Stack>

                                <Stack spacing={2}>
                                    <TextField
                                        label="Medicamentos"
                                        name='MEDICAMENTOS'
                                        size="small"
                                        value={datosPer.MEDICAMENTOS}
                                        required
                                        multiline
                                        maxRows={4}
                                        onChange={(e) => handleDatosPersonales(e)} />
                                </Stack>


                            </Stack>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className='align-middle'>
                        <Button className='bg-success text-white'
                            type="sumbit" >Guardar</Button>

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