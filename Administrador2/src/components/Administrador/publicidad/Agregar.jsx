import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box
} from '@mui/material'
import React, { useState } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MuiFileInput } from 'mui-file-input'
import Image from 'mui-image'

import { Stack, TextField } from '@mui/material'
import { date_to_ts } from '../../firebase/Fechas/Fechas';
import { uploadFile } from '../../firebase/firebase';
import { insertarPublicidad } from '../../firebase/Publicidad/PUB_CRUD';
import { Toaster, toast } from "react-hot-toast"

export default function Agregar({ obtenerDatos }) {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState('')
    const [previewUrl, setPreviewUrl] = useState(null)

    const initialDatosPB = {
        NOMBRE: '',
        DESCRIPCION: '',
        TIEMPO: '',
        FECHA_TERMINACION: '',
        ID_ESTADOS: '',
        URL: ''
    }
    const regex = /^[A-Z\sa-z0-9\-]+$/;
    const [datosPB, setDatosPB] = useState(initialDatosPB)

    const handleChange = (newFile) => {
        setFile(newFile)
        setPreviewUrl(URL.createObjectURL(newFile))

    }

    const handleDataP = (event) => {
        setDatosPB({ ...datosPB, [event.target.name]: event.target.value })
    }

    const handleDate = (newValue) => {
        datosPB["FECHA_TERMINACION"] = date_to_ts(newValue)
    }

    const saveImg = async () => {
        const url = await uploadFile(file)
        datosPB['URL'] = url;
    }

    const hanndleInsert = async (evt) => {
        evt.preventDefault(); //Evitamos que se recargue la pagina

        if (datosPB)
            //Verificamos que se haya seleccionado una fecha
            if (datosPB.FECHA_TERMINACION) {
                if (file) {
                    //Primero insertamos la imagen y guardamos el URL en los datos
                    // de la publicidad
                    await saveImg()
                    //Depues ya guardamos la publicidad
                    await insertarPublicidad(datosPB)
                    setDatosPB(initialDatosPB)
                    setFile('')
                    setPreviewUrl(null)

                    setOpen(false)
                    obtenerDatos()
                    toast.success('Publicidad guardada')

                } else {
                    toast.error('FALTA IMAGEN')
                }
            } else {
                toast.error('FALTA FECHA DE TERMINACION')
            }



    }

    return (
        <div>
            <Button style={{ backgroundColor: "#0048FF", color: "white" }} onClick={() => setOpen(true)}>Agregar</Button>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false)
                    setDatosPB(initialDatosPB)
                    setFile('')
                    setPreviewUrl(null)
                }}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
                PaperProps={{
                    style: {
                        maxWidth: '90%',
                        maxHeight: '100%',
                    },
                }}>

                <DialogTitle id='dialog-title'>
                    Datos de publicidad

                    <Button onClick={() => {
                        setOpen(false)
                        setDatosPB(initialDatosPB)
                        setFile('')
                        setPreviewUrl(null)
                    }}>X</Button>

                    <hr />
                </DialogTitle>


                <Box
                    component='form'
                    onSubmit={hanndleInsert}
                >
                    <DialogContent>
                        <DialogContentText className='mt-2' id='dialog-description'>
                            <div className=' row'>
                                <div className='col-6 d-flex align-items-center'>
                                    <Stack spacing={3}>
                                        <Stack spacing={2}>
                                            <TextField
                                                label="Nombre"
                                                name='NOMBRE'
                                                required
                                                value={datosPB.NOMBRE}
                                                onChange={(e) => {
                                                    if ((e.target.value.length < 30 && regex.test(e.target.value)) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                        handleDataP(e)
                                                    }
                                                }}

                                            />
                                        </Stack>
                                        <Stack spacing={2}>
                                            <TextField
                                                label="Descripcion"
                                                name='DESCRIPCION'
                                                multiline
                                                rows={6}
                                                required
                                                value={datosPB.DESCRIPCION}
                                                onChange={(e) => {
                                                    if ((e.target.value.length < 150 && regex.test(e.target.value)) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                        handleDataP(e)
                                                    }
                                                }}
                                            />
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                            <TextField
                                                label="Tiempo (seg)"
                                                name='TIEMPO'
                                                type='number'
                                                required
                                                value={datosPB.TIEMPO}
                                                onChange={(e) => {
                                                    if ((e.target.value.length < 4 && parseInt(e.target.value) <= 180 && parseInt(e.target.value) > 0) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                        handleDataP(e)
                                                    }
                                                }}
                                            />

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    disablePast={true}
                                                    label="Fecha de terminacion"
                                                    onChange={(newValue) => handleDate(newValue)}
                                                />
                                            </LocalizationProvider>

                                        </Stack>

                                    </Stack>

                                </div>
                                <div className='col-6'>
                                    {
                                        file ? (
                                            <Image
                                                src={previewUrl}
                                                width={500}
                                                height={500}
                                                duration={0}
                                                required
                                                fit={"contain"}
                                            />

                                        ) : (

                                            null
                                        )
                                    }
                                    <MuiFileInput value={file} onChange={handleChange} />
                                </div>

                            </div>


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