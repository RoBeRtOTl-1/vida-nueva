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
import { formatearFechaHora } from '../../firebase/Fechas/Fechas'
import { Toaster, toast } from "react-hot-toast"
import { actualizarTurno } from '../../firebase/Turnos/TURN_CRUD'

export default function Modificar({ dato, obtenerDatos }) {
    const [open, setOpen] = useState(false)
    const [estado, setEstado] = useState(dato.ID_ESTADOS);


    function handleChange(event) {
        setEstado(event.target.value)
    }

    const hanndleCita = async () => {
        setOpen(false)
        await actualizarTurno(dato.ID, estado)
        obtenerDatos()
        toast.success('Turno modificado') 
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
                        maxWidth: '700px',
                    },
                }}>

                <DialogTitle id='dialog-title'>

                    Cambiar estado de la cita
                    <Button onClick={() => {
                        setOpen(false)
                    }}>X</Button>
                    <hr />
                </DialogTitle>

                <DialogContent>
                    <DialogContentText className='' id='dialog-description'>
                        <div className='row '>
                            <div className='col-12 '>
                                <Stack spacing={100}>
                                    <Stack spacing={100}>
                                        <TextField
                                            label="Tipo de servicio"
                                            value="Consulta medica"
                                            size='small'
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                            </div>
                            <div className='col-6 mt-4'>
                                <Stack spacing={100}>
                                    <Stack spacing={2}>
                                        <TextField
                                            label="Fecha y hora"
                                            value={formatearFechaHora(dato.FECHAHORA)}
                                            size='small'
                                            variant="standard"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                            </div>
                           
                            <div className="col-md-6 mt-4">
                                <TextField
                                    size='small'
                                    label="ESTADO"
                                    select
                                    fullWidth
                                    value={estado}
                                    style={{ minWidth: '250px' }}
                                    onChange={handleChange}
                                    variant="standard"
                                >
                                    <MenuItem value={3}>Atendido</MenuItem>
                                    <MenuItem value={5}>Cancelado</MenuItem>
                                </TextField>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>

                <DialogActions className='align-middle'>
                    <Button className='bg-success text-white' onClick={async () => {
                        hanndleCita()
                    }} >Modificar</Button>

                </DialogActions>
            </Dialog>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
        </div>
    )
}