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
import { useState, useEffect, useRef } from 'react'
import { TextField } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { get_Citas_Filtradas_BD, insertarCita } from "../../firebase/Citas/CIT_CRUD"
import { DatoDeLaBDActivos } from "../../firebase/Especialides/ESP_CRUD";
import { DatoDeLaBDFiltrado } from "../../firebase/Ususarios/USU_CRUD"


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { date_to_ts, getCurrentDate } from '../../firebase/Fechas/Fechas';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';


import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";






/** 
 * Falta agregar el evento que acutalizara la tabla, que viende desde
 * la clase principal
*/
export default function Agregar({ obtenerDatos }) {
    const calendarRef = useRef(null);
    const [isloading, setIsloading] = useState(false)
    const [citasMedico, setCitasMedico] = useState([]);
    const [currentEvents, setCurrentEvents] = useState()
    /** 
     * En cita se guardaran los datos necesarios para hacer un insert
    */
    const [cita, setCita] = useState({
        ID_PACIENTE: '',
        ID_USUARIO: '',
        DATEINICIO: '',
        DATEFIN: ''
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

    const [fecha, setFecha] = useState(new Date())


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
        setCitasMedico([])
    }

    /**
     * Cuando se seleccione un medico de la tabla, se ejecutara esta funcion,
     * guardara el ID del medico deseado en el atributo ID_USUARIO
     */
    const handleRowClick = async (row) => {
        setIsloading(true)
        setCita({ ...cita, ["ID_USUARIO"]: row.ID })
        setCitasMedico(await get_Citas_Filtradas_BD(row.ID))
        setIsloading(false)
        // console.log('---')
        // citasMedico.map(cita => {
        //     calendarRef.current.getApi().select(cita)

        // })
        //calendarRef.current.getApi().addEvent(citasMedico)
        

        //console.log(citasMedico) //Imprime los eventos del medico seleccionado 
    }


    /**
     * Se manda a llamar cuando se selecciona una fecha en el calendario
     */
    function handleDate(newValue) {
        /**Se cambia la fecha a la fecha seleccionada en el datepicker */
        calendarRef.current.getApi().gotoDate(new Date(newValue));

        //console.log(calendarRef.current)
    }


    const handleDateClick = (selected) => {

        //const title = prompt("Ingresa algo aqui");
        const title = "Reservada"
        const calendarApi = selected.view.calendar;
        console.log(calendarApi)

        setCita({ ...cita, ['DATEINICIO']: date_to_ts(selected.start), ['DATEFIN']: date_to_ts(selected.end) })
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
                        maxWidth: '100%',
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

                                {/**
                                 * Este combo box, muestra las especialidades activas
                                 * cuando se hace click en alguna, se reecarga la tabla de los medicos
                                 */}
                                <TextField size='small' label="Epecialidad" name='ID_ESPECIALIDAD' select fullWidth value={aux.ID_ESPECIALIDAD} style={{ minWidth: '250px' }}
                                    onChange={handleChange}>
                                    {especialidad.map((dato, index) => (
                                        <MenuItem key={index} value={dato.ID}>{dato.ESPECIALIDAD}</MenuItem>
                                    ))}
                                </TextField>

                                {/**
                                 * En esta tabla cargan los medicos que tienen la especialidad seleccionada
                                 */}
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

                            {
                                isloading ?
                                    (
                                        <div class="d-flex justify-content-center">
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (

                                        <FullCalendar
                                            height="70vh"

                                            initialDate={fecha}

                                            ref={calendarRef}

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


                                            initialView="timeGridDay" //Pone como defecto la vistaa por dia
                                            allDaySlot={false} //Quita la opcion que es de seleciconar todo el dia
                                            editable={true} //Permite mover los eventos moviendolos con el click + mouse 
                                            eventOverlap={false} //Determina si los eventos se pueden solapar uno encima del otro

                                            eventMinHeight={30} //Establece el TAMAÑO minimo del evento, no la hora 

                                            slotDuration={"00:60:00"} //Cambia la hora de duracion del slot


                                            eventColor={'#70B6DD'}
                                            eventTextColor={"#000000"} // cambia el color del texto de los eventos

                                            slotLabelFormat={{
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            }}

                                            slotMinTime="08:00:00"
                                            slotMaxTime="20:00:00"

                                            selectable={true} //Permite a un usuario resaltar varios días o intervalos de tiempo haciendo clic y arrastrando.
                                            selectMirror={true
                                            } //
                                            dayMaxEvents={true}

                                            //Evento para crear una cita
                                            select={(selected) => handleDateClick(selected)}


                                            //Evento para eliminar un evento
                                            eventClick={handleEventClick}

                                            eventsSet={(events) => setCurrentEvents(events)}


                                            initialEvents={citasMedico}
                                        />
                                    )
                            }
                        </div>
                    </div>

                </DialogContent>

                <DialogActions className='align-middle'>
                    <Button className='bg-success text-white' onClick={async () => {
                        setOpen(false)
                        await insertarCita(cita)
                        reiniciarFormulario()
                        obetenerDatos()
                    }} >Guardar</Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}

const handleEventClick = (selected) => {
    if (
        window.confirm(
            `Are you sure you want to delete the event '${selected.event.id}'`
        )
    ) {
        selected.event.remove();
    }
};


