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
import { useState } from 'react'
import { Stack, TextField } from '@mui/material'
import { actualizarEsp } from "../firebase/Citas/CIT_CRUD"


export default function Modificar({dato,obtenerDatos}) {
    const [open, setOpen] = useState(false)
    const [nombre, setNombre] = useState(dato.ESPECIALIDAD);
    const [estado, setEstado] = useState(dato.ID_ESTADOS);

    const valoresSeleccionados = {
        nombre,
        estado
    };

    function reiniciarFormulario() {
        setNombre('')
    }

    function handleChange(event) {
        setEstado(event.target.value)
        console.log(estado)
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
                                        <TextField label="Nombre" value={nombre} size='small' onChange={(e) => setNombre(e.target.value)} />
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
                        setOpen(false)
                        await actualizarEsp(dato.ID, valoresSeleccionados)
                        obtenerDatos()
                    }} >Modificar</Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}