import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material'
import { useState } from 'react'
import { Stack, TextField } from '@mui/material'

import { Toaster, toast } from "react-hot-toast"
import { insertar } from "../../firebase/Especialides/ESP_CRUD.js"



export default function Agregar({ obtenerDatos, BDesp }) {
    const [open, setOpen] = useState(false)
    const [nombre, setNombre] = useState('');
    const regex = /^[A-Z\sa-z0-9_]+$/;

    const valores = {
        nombre
    };

    function reiniciarFormulario() {
        setNombre('')
    }

    const insertarEspecialidad = async () => {
        //Revisamos que tenga datos
        if (nombre) {
            if (BDesp.includes(nombre)) {
                toast.error('LA ESPECIALIDAD YA EXISTE')
            } else {
                setOpen(false)
                await insertar(valores)
                obtenerDatos()
                reiniciarFormulario()
                toast.success('Especialidad guardada')
            }
        } else {
            toast.error('INGRESE UNA ESPECIALIDAD')
        }
    }

    return (
        <div>
            <Button style={{ backgroundColor: "#0048FF", color: "white" }} onClick={() => setOpen(true)}>Agregar</Button>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'

                PaperProps={{
                    style: {
                        maxWidth: '1000px',

                    },
                }}
            >

                <DialogTitle id='dialog-title'>
                    Agregar especialidad

                    <Button onClick={() => {
                        setOpen(false)
                        reiniciarFormulario()

                    }}>X</Button>
                    <hr />
                </DialogTitle>

                <DialogContent>

                    <DialogContentText className='mt-2' id='dialog-description'>
                        <Stack spacing={100}>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Nombre"
                                    value={nombre}
                                    onChange={(e) => {
                                        if ((e.target.value.length < 30 && regex.test(e.target.value)) || e.nativeEvent.inputType === "deleteContentBackward") {
                                            setNombre(e.target.value)
                                        }
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </DialogContentText>
                </DialogContent>

                <DialogActions className='align-middle'>
                    <Button className='bg-success text-white' onClick={async () => {
                        insertarEspecialidad()

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