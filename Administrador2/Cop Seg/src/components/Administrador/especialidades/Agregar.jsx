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
import { insertar } from "../firebase/Especialides/ESP_CRUD.js"


export default function Agregar({obtenerDatos}) {
    const [open, setOpen] = useState(false)
    const [nombre, setNombre] = useState('');


    const valores = {
        nombre
    };

    function reiniciarFormulario() {
        setNombre('')
    }
    return (
        <div>
            <Button style={{ backgroundColor: "#0048FF", color: "white" }} onClick={() => setOpen(true)}>Agregar</Button>
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
                                <TextField label="Nombre"  value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </Stack>
                        </Stack>
                    </DialogContentText>
                </DialogContent>

                <DialogActions className='align-middle'>
                    <Button className='bg-success text-white' onClick={async () => {
                        setOpen(false)
                        await insertar(valores)
                        obtenerDatos()
                        reiniciarFormulario()
                    }} >Guardar</Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}