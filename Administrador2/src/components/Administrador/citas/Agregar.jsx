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
import { TextField } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { insertar } from "../../firebase/Citas/CIT_CRUD"
import { DatoDeLaBDActivos } from "../../firebase/Especialides/ESP_CRUD";
import { DatoDeLaBDFiltrado } from "../../firebase/Ususarios/USU_CRUD"


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getCurrentDate } from '../../firebase/Fechas/Fechas';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';


import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import {
    List,
    ListItem,
    Typography,
    useTheme,
} from "@mui/material";




export default function Agregar({ obtenerDatos }) {
    const [currentEvents, setCurrentEvents] = useState([]);
    /** 
     * En cita se guardaran los datos necesarios para hacer un insert
    */
    const [cita, setCita] = useState({
        ID_ESTADO: '',
        ID_PACIENTE: '',
        ID_USUARIO: '',
        FECHAHORA: '',
    })

    /** 
     * Estos datos solo se usan para llegar a los datos del insert deseado
     * por ejemplo, hasta obtener el id del medico que tiene X especialidad, etc
    */
    const [aux, setAux] = useState({
        ID_ESPECIALIDAD: '',
        FECHAHORA: getCurrentDate(),
    })


    const [open, setOpen] = useState(false);

    const [especialidad, setEspecialidad] = useState([]);
    const [registros, setRegistros] = useState([]);


    /**
     * Obtenemos las especialidades, y las asignamos a "especialidades"
     */
    async function obtenerDatos() {
        const datosBD = await DatoDeLaBDActivos();
        setEspecialidad(datosBD);
    }

    useEffect(() => {
        obtenerDatos();
    }, []);


    /**
     * Cuando se seleccione una especialidad del ComboBox, se ejecutara esta funcion,
     * cargara los medicos con la especialidad seleccionada
     */
    async function handleChange(event) {
        const { value, name } = { value: event.target.value, name: event.target.name };
        setAux({ ...aux, [name]: value })
        const datosBDFiltrados = await DatoDeLaBDFiltrado(value);
        setRegistros(datosBDFiltrados)
    }

    /**
     * Cuando se seleccione un medico de la tabla, se ejecutara esta funcion,
     * guardara el ID del medico deseado en el atributo ID_USUARIO
     */
    const handleRowClick = (row) => {
        setAux({ ...aux, ["ID_USUARIO"]: row.ID })
    }


    /**
     * Se manda a llamar cuando se selecciona una fecha en el calendario
     */
    function handleDate(newValue) {
        setAux({ ...aux, ["FECHAHORA"]: newValue.$d })
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
                        maxWidth: '90%',
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

                    <div className='container-fluid d-flex'>
                        <div className='col-md-6'>

                            <DialogContentText className='mt-2' id='dialog-description'>
                                <TextField size='small' label="Epecialidad" name='ID_ESPECIALIDAD' select fullWidth value={aux.ID_ESPECIALIDAD} style={{ minWidth: '250px' }}
                                    onChange={handleChange}>
                                    {especialidad.map((dato, index) => (
                                        <MenuItem key={index} value={dato.ID}>{dato.ESPECIALIDAD}</MenuItem>
                                    ))}
                                </TextField>

                                <TableContainer className='mt-4' component={Paper}>
                                    <Table sx={{ minWidth: 550 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nombre completo</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {registros.map((row) => (
                                                <TableRow
                                                    key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    onClick={() => handleRowClick(row)}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.NOMBRE + " " + row.AP_PATERNO + " " + row.AP_MATERNO}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>


                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar onChange={(newValue) => handleDate(newValue)} />
                                </LocalizationProvider>

                            </DialogContentText>
                        </div>

                        <div className='col-md-6'>

                            <FullCalendar
                                height="70vh"

                                plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    interactionPlugin,
                                    listPlugin,
                                ]}

                                headerToolbar={{
                                    left: "",
                                    center: "title",
                                    right: "",
                                }}

                                initialView="timeGridDay" //Pone como defecto la vida por dia
                                allDaySlot={false} //Quita la opcion que es de seleciconar todo el dia
                                editable={true} //Permite mover los eventos moviendolos con el click + mouse 
                                eventOverlap={false} //Determina si los eventos se pueden solapar uno encima del otro
                                
                                //eventMinHeight={30} //Establece el TAMAÑO minimo del evento, no la hora 

                                slotDuration={"00:60:00"} //Cambia la hora de duracion del slot

                                
                                eventColor= {'#70B6DD'}
                                eventTextColor= {"#000000"} // cambia el color del texto de los eventos

                                slotLabelFormat={{
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                }}

                               

                                // slotMinTime="08:00:00"
                                // slotMaxTime="15:00:00"
                                
                                selectable={true} //Permite a un usuario resaltar varios días o intervalos de tiempo haciendo clic y arrastrando.
                                selectMirror={true
                                } //
                                dayMaxEvents={true}
                                select={handleDateClick}
                                eventClick={handleEventClick}
                                eventsSet={(events) => setCurrentEvents(events)}
                                initialEvents={[
                                    {
                                        id: "12315",
                                        title: "All-day event",
                                        date: "2023-04-14",
                                    },
                                    {
                                        id: "5123",
                                        title: "Timed event",
                                        date: "2022-09-28",
                                    },
                                ]}
                            />
                        </div>
                    </div>



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

const handleDateClick = (selected) => {
    console.log(selected)
    //const title = prompt("Ingresa algo aqui");
    const title = "Reservada"
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    if (title) {
        calendarApi.addEvent({
            id: `${selected.dateStr}-${title}`, title,
            start: selected.startStr,
            end: selected.endStr,
            allDay: selected.allDay,
        });
    }
};

const handleEventClick = (selected) => {
    if (
        window.confirm(
            `Are you sure you want to delete the event '${selected.event.title}'`
        )
    ) {
        selected.event.remove();
    }
};