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
import Image from 'mui-image'
import { Stack, TextField } from '@mui/material'
import { date_to_ts, ts_to_date } from '../../firebase/Fechas/Fechas';
import { actualizarPublicidad } from '../../firebase/Publicidad/PUB_CRUD';
import dayjs from 'dayjs';
import { Toaster, toast } from "react-hot-toast"

export default function Modificar({ datos, obtenerDatos }) {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState('')

    const regex = /^[A-Z\sa-z0-9\-]+$/;

    const [datosPB, setDatosPB] = useState({
        NOMBRE: datos.NOMBRE,
        DESCRIPCION: datos.DESCRIPCION,
        TIEMPO: datos.TIEMPO,
        FECHA_TERMINACION: datos.FECHA_TERMINACION,
        ID_ESTADOS: datos.ID_ESTADOS,
        URL: datos.URL
    })

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

    const ins_Pub = async () => {
        await actualizarPublicidad(datos.ID, datosPB, 8)
        obtenerDatos()
        toast.success('Publicidad modificada')

    }

    const hanndleUpdate = async (evt) => {
        evt.preventDefault()
        if (datosPB.TIEMPO == '0') {
            toast.error('TIEMPO INVALIDO')
        } else {

            setOpen(false)
            await ins_Pub()
        }
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
                        maxWidth: '90%',
                        maxHeight: '100%',
                    },
                }}>

                <DialogTitle id='dialog-title'>
                    Datos de publicidad

                    <Button onClick={() => {
                        setOpen(false)
                        reiniciarFormulario()
                    }}>X</Button>
                    <hr />
                </DialogTitle>
                <Box
                    component='form'
                    onSubmit={hanndleUpdate}
                >

                    <DialogContent>

                        <DialogContentText className='mt-2' id='dialog-description'>
                            <div className=' row'>
                                <div className='col-6 d-flex align-items-center'>
                                    <Stack spacing={3}>
                                        <Stack spacing={2}>
                                            <TextField
                                                label="Nombre"
                                                value={datosPB.NOMBRE}
                                                name='NOMBRE'
                                                required
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
                                                value={datosPB.DESCRIPCION}
                                                name='DESCRIPCION'
                                                multiline
                                                rows={6}
                                                required
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
                                                value={datosPB.TIEMPO}
                                                name='TIEMPO'
                                                required
                                                onChange={(e) => {
                                                    if ((e.target.value.length < 4 && parseInt(e.target.value) <= 180 && parseInt(e.target.value) > 0) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                        handleDataP(e)
                                                    }
                                                }}
                                            />

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label="Fecha de terminacion"
                                                    defaultValue={dayjs(ts_to_date(datosPB.FECHA_TERMINACION))}
                                                    onChange={(newValue) => handleDate(newValue)}
                                                    disablePast={true}
                                                />
                                            </LocalizationProvider>

                                        </Stack>

                                    </Stack>

                                </div>
                                <div className='col-6'>
                                    <Image src={datosPB.URL} width={500} height={500} duration={0} fit={"contain"} />
                                    {/* <MuiFileInput value={file} onChange={handleChange} /> */}
                                </div>

                            </div>


                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className='align-middle'>
                        <Button className='bg-success text-white'
                            type='submit' >Guardar</Button>

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