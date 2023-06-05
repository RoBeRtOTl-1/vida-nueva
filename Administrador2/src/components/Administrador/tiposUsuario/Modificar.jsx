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
import { actualizarRol } from "../../firebase/TiposDeUsuarios/TDU_CRUD.js"
import { Toaster, toast } from "react-hot-toast"

export default function Modificar({ dato, obtenerDatos }) {

    const [open, setOpen] = useState(false)

    const [admin, setAdmin] = useState(dato.ADMINISTRACION);
    const [recepcion, setRecepcion] = useState(dato.RECEPCION);
    const [turnos, setTurnos] = useState(dato.TURNOS);
    const [medicoGral, setMedicoGral] = useState(dato.MEDICOGENERAL);
    const [especialista, setEspecialista] = useState(dato.ESPECIALISTA);
    const [nombre, setNombre] = useState(dato.NOMBRE);
    const [estado, setEstado] = useState(dato.ID_ESTADOS);

    const valoresSeleccionados = {
        nombre,
        admin,
        recepcion,
        turnos,
        medicoGral,
        especialista,
        estado
    };

    const regex = /^[A-Z\sa-z0-9_]+$/;

    function reiniciarFormulario() {
        setNombre('')
        setAdmin(false)
        setRecepcion(false)
        setTurnos(false)
        setMedicoGral(false)
        setEspecialista(false)
        setEstado('')
    }

    function handleChange(event) {
        setEstado(event.target.value)
        console.log(estado)
    }

    const actualizarTDU = async () => {
        if (nombre) {  //Revisamos que haya un nombre
            setOpen(false)
            await actualizarRol(dato.ID, valoresSeleccionados)
            reiniciarFormulario()
            obtenerDatos()
            toast.success('Tipo de usuario modificado')
        } else {
            toast.error('INGRESA UN NOMBRE')
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
                        <br />
                        <table className="table text-center">
                            <thead>
                                <tr className="table-secondary">
                                    <th>Administración</th>
                                    <th>Recepción</th>
                                    <th>Turnos</th>
                                    <th>Médico gral</th>
                                    <th>Especialista</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                <tr>
                                    <td><input type="checkbox" checked={admin} onChange={(e) => setAdmin(e.target.checked)} /></td>
                                    <td><input type="checkbox" checked={recepcion} onChange={(e) => setRecepcion(e.target.checked)} /></td>
                                    <td><input type="checkbox" checked={turnos} onChange={(e) => setTurnos(e.target.checked)} /></td>
                                    <td><input type="checkbox" checked={medicoGral} onChange={(e) => setMedicoGral(e.target.checked)} /></td>
                                    <td><input type="checkbox" checked={especialista} onChange={(e) => setEspecialista(e.target.checked)} /></td>
                                </tr>
                            </tbody>
                        </table>

                    </DialogContentText>
                </DialogContent>

                <DialogActions className='align-middle'>
                    <Button className='bg-success text-white' onClick={() => {
                        actualizarTDU()
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