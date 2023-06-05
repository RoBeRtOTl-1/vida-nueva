import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
    Box
} from '@mui/material'
import { Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { actualizarEsp } from "../../firebase/Especialides/ESP_CRUD"
import { Toaster, toast } from "react-hot-toast"


export default function Modificar({ dato, obtenerDatos }) {
    const [open, setOpen] = useState(false)
    const [nombre, setNombre] = useState(dato.ESPECIALIDAD);
    const [estado, setEstado] = useState(dato.ID_ESTADOS);
    const regex = /^[A-Z\sa-z0-9_]+$/;
    const valoresSeleccionados = {
        nombre,
        estado
    };

    function handleChange(event) {
        setEstado(event.target.value)
    }

    const modificarEspecialidad = async () => {
        //Revisamos que tenga datos
        if (nombre) {
            setOpen(false)
            await actualizarEsp(dato.ID, valoresSeleccionados)
            obtenerDatos()
            toast.success('Especialidad modificada')
        } else {
            toast.error('INGRESE UNA ESPECIALIDAD')
        }
    }
    return (
        <>
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

                    Modificar
                    <Button onClick={() => {
                        setOpen(false)
                    }}>X</Button>
                    <hr />
                </DialogTitle>

                <DialogContent>
                    <DialogContentText className='mt-2' id='dialog-description'>
                        <div className='row'>

                            <div className="col-md-6">
                                <Stack spacing={100}>
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            label="Nombre"
                                            value={nombre}
                                            size='small'
                                            onChange={(e) => {
                                                if ((e.target.value.length < 30 && regex.test(e.target.value)) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                    setNombre(e.target.value)
                                                }
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                            </div>

                            <div className="col-md-6">
                                <TextField size='small' label="ESTADO" select fullWidth value={estado} style={{ minWidth: '250px' }}
                                    onChange={handleChange}>
                                    <MenuItem value="1">Activo</MenuItem>
                                    <MenuItem value="2">Inactivo</MenuItem>
                                </TextField>
                            </div>

                        </div>
                    </DialogContentText>
                </DialogContent>

                <DialogActions className='align-middle'>
                    <Button className='bg-success text-white' onClick={async () => {
                        modificarEspecialidad()
                    }} >Modificar</Button>

                </DialogActions>
                <Toaster
                    position="top-right"
                    reverseOrder={true}
                />
            </Dialog>
        </>
    )
}