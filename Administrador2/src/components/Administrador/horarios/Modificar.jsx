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
import { actualizarHorario } from '../../firebase/Horarios/HOR_CRUD.js';
import { Toaster, toast } from "react-hot-toast"

export default function Modificar({ med_nombre, dato, obtenerDatos }) {

    const [datosHorario, setDatosHorario] = useState({
        LUNES: dato.LUNES,
        MARTES: dato.MARTES,
        MIERCOLES: dato.MIERCOLES,
        JUEVES: dato.JUEVES,
        VIERNES: dato.VIERNES
    })

    const [open, setOpen] = useState(false)

    const regex = /^(\d{1,2}:\d{2}-\d{1,2}:\d{2}(\|\d{1,2}:\d{2}-\d{1,2}:\d{2})*)?$/;
    const inputRegex = /^[0-9\|:\-]*$/

    function handleDatosHorario(event) {
        setDatosHorario({ ...datosHorario, [event.target.name]: event.target.value })
    }

    const hanndleSchedule = () => {

        if (!regex.test(datosHorario.LUNES)) {
            toast.error('FORMATO INVALIDO: LUNES');
            return
        } else if (!regex.test(datosHorario.MARTES)) {
            toast.error('FORMATO INVALIDO: MARTES');
            return
        } else if (!regex.test(datosHorario.MIERCOLES)) {
            toast.error('FORMATO INVALIDO: MIERCOLES');
            return
        } else if (!regex.test(datosHorario.JUEVES)) {
            toast.error('FORMATO INVALIDO: JUEVES');
            return
        } else if (!regex.test(datosHorario.VIERNES)) {
            toast.error('FORMATO INVALIDO: VIERNES');
            return
        } else {

            setOpen(false)
            actualizarHorario(dato.ID, datosHorario)
            obtenerDatos()
            toast.success('Horario modificado')
        }

    }

    return (
        <div>
            <Button onClick={() => {
                setOpen(true)
            }}>
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
                                            label="Medico"
                                            variant="standard"

                                            value={med_nombre}

                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                            </div>

                        </div>
                        <br />
                        <table className="table text-center">
                            <thead>
                                <tr className="table-secondary">
                                    <th>Lunes</th>
                                    <th>Martes</th>
                                    <th>Miercoles</th>
                                    <th>Jueves</th>
                                    <th>Viernes</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                <tr>
                                    <td>
                                        <TextField
                                            name="LUNES"
                                            multiline value={datosHorario.LUNES}
                                            style={{ width: "225px" }}
                                            size='small'
                                            onChange={(e) => {
                                                if (inputRegex.test(e.target.value) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                    handleDatosHorario(e)
                                                }
                                            }}

                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            name="MARTES"
                                            multiline
                                            value={datosHorario.MARTES}
                                            style={{ width: "225px" }}
                                            size='small'
                                            onChange={(e) => {
                                                if (inputRegex.test(e.target.value) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                    handleDatosHorario(e)
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            name="MIERCOLES"
                                            multiline
                                            value={datosHorario.MIERCOLES}
                                            style={{ width: "225px" }}
                                            size='small'
                                            onChange={(e) => {
                                                if (inputRegex.test(e.target.value) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                    handleDatosHorario(e)
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            name="JUEVES"
                                            multiline
                                            value={datosHorario.JUEVES}
                                            style={{ width: "225px" }}
                                            size='small'
                                            onChange={(e) => {
                                                if (inputRegex.test(e.target.value) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                    handleDatosHorario(e)
                                                }
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <TextField
                                            name="VIERNES"
                                            multiline
                                            value={datosHorario.VIERNES}
                                            style={{ width: "225px" }}
                                            size='small'
                                            onChange={(e) => {
                                                if (inputRegex.test(e.target.value) || e.nativeEvent.inputType === "deleteContentBackward") {
                                                    handleDatosHorario(e)
                                                }
                                            }}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </DialogContentText>
                </DialogContent>

                <DialogActions className='align-middle'>
                    <Button className='bg-success text-white' onClick={() => {
                        hanndleSchedule()
                    }} >Modificar</Button>

                </DialogActions>
                <Toaster
                    position="top-right"
                    reverseOrder={true}
                />
            </Dialog>

        </div>
    )
}