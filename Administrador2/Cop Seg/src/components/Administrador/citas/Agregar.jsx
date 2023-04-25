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
import { useState, useEffect } from 'react'
import { Stack, TextField } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { insertar } from "../../firebase/Citas/CIT_CRUD"
import { DatoDeLaBD } from "../../firebase/Especialides/ESP_CRUD";
import { DatoDeLaBDFiltrado } from "../../firebase/Ususarios/USU_CRUD"


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function Agregar({ obtenerDatos }) {

    const [open, setOpen] = useState(false);
    const [especialidad, setEspecialidad] = useState([]);
    const [registros, setRegistros] = useState([]);
    const [estado, setEstado] = useState('');

    function reiniciarFormulario() {
        setEstado('')
    }

    async function obtenerDatos() {
        const datosBD = await DatoDeLaBD();
        setEspecialidad(datosBD);
    }

    useEffect(() => {
        obtenerDatos();
    }, []);

    async function handleChange(event) {
        setEstado(event.target.value)
        const datosBDFiltrados = await DatoDeLaBDFiltrado(estado);
        console.log(datosBDFiltrados)
        setRegistros(datosBDFiltrados)
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
                    Agregar cita

                    <Button onClick={() => {
                        setOpen(false)
                        reiniciarFormulario()
                    }}>X</Button>
                    <hr />
                </DialogTitle>

                <DialogContent>

                    <DialogContentText className='mt-2' id='dialog-description'>
                        <TextField size='small' label="Epecialidad"  select fullWidth value={estado} style={{ minWidth: '250px' }}
                            onChange={handleChange}>
                            {especialidad.map((dato, index) => (
                                <MenuItem key={index} value={dato.ID}>{dato.ESPECIALIDAD}</MenuItem>
                            ))}
                        </TextField>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre completo</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {registros.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row"> {console.log(row)}
                                                {row.NOMBRE + " " +row.AP_PATERNO + " " +row.AP_MATERNO}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar />
                        </LocalizationProvider>

                    </DialogContentText>
                </DialogContent>

                <DialogActions className='align-middle'>
                    <Button className='bg-success text-white' onClick={async () => {
                        setOpen(false)
                        await insertar(valores)
                        reiniciarFormulario()
                    }} >Guardar</Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}
