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
import { insertar } from "../../firebase/TiposDeUsuarios/TDU_CRUD.js"
import { Toaster, toast } from "react-hot-toast"


export default function Agregar({ obtenerDatos, tdu }) {
    const [open, setOpen] = useState(false)
    const [admin, setAdmin] = useState(false);
    const [recepcion, setRecepcion] = useState(false);
    const [turnos, setTurnos] = useState(false);
    const [medicoGral, setMedicoGral] = useState(false);
    const [especialista, setEspecialista] = useState(false);
    const [nombre, setNombre] = useState('');


    const valoresSeleccionados = {
        nombre,
        admin,
        recepcion,
        turnos,
        medicoGral,
        especialista,
    };

    const regex = /^[A-Z\sa-z0-9_]+$/;

    function reiniciarFormulario() {
        setAdmin(false)
        setRecepcion(false)
        setTurnos(false)
        setMedicoGral(false)
        setEspecialista(false)
        setNombre('')
    }

    const insertarTDU = async () => {
        if (nombre) {  //Revisamos que
            if (tdu.includes(nombre)) {  //Revisamos que no este en uso la cedula
                toast.error('LA NOMBRE YA ESTA EN USO')
            } else {
                setOpen(false)
                await insertar(valoresSeleccionados)
                reiniciarFormulario()
                obtenerDatos()
                toast.success('Tipo de usuario guardado')
            }
        } else {
            toast.error('INGRESA UN NOMBRE')
        }
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
                    Nuevo tipo de usuario

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
                    <Button className='bg-success text-white' onClick={async () => {
                        insertarTDU()
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