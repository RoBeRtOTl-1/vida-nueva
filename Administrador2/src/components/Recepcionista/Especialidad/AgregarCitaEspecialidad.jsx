import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Stack,
    Divider
} from "@mui/material";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatoDeLaBDFiltrado } from '../../firebase/Ususarios/USU_CRUD';
import { get_Horario_Medico_BD } from '../../firebase/Horarios/HOR_CRUD';
import { get_Citas_Filtradas_BD, insertarCita } from '../../firebase/Citas/CIT_CRUD';
import { date_to_ts, ts_to_date } from '../../firebase/Fechas/Fechas';
import TIPOS_DE_SANGRE from '../../firebase/TiposSangre/TS_CRUD';
import { get_Pacientes_Filtrado_BD } from '../../firebase/Pacientes/PAC_CRUD';
import { Toaster, toast } from "react-hot-toast"
import dayjs from 'dayjs';


const AgregarCitaEspecialidad = ({ especialidad, id }) => {
    //Open y Open2 para controlar cuando se muestran los modales
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    //Usamos el useRef para apuntar al calendario
    const calendarRef = useRef(null);

    const [isloading, setIsloading] = useState(false) //Muestra o no el spinner, lo usamos para recaargar el componente fullcalendar

    const initialCurrentSlots = {
        min: '00:00:00',
        max: '00:00:00'
    }
    const initialDatosCita = {
        ID_PACIENTE: '',
        ID_USUARIO: '',
        DATEINICIO: '',
        DATEFIN: '',
    }
    const initialDatosPer = {
        ID: '',
        NOMBRE: '',
        AP_MATERNO: '',
        AP_PATERNO: '',
        ID_TIP_SANGRE: '',
        TELEFONO: '',
        CURP: '',
        ID_SEXO: '',
        NACIMIENTO: '',
        EMAIL: '',
        ALERGIAS: '',
        ID_DOMICILIO: ''
    }
    const initialDatosDom = {
        CIUDAD: '',
        COLONIA: '',
        COD_POSTAL: '',
        CALLE: '',
        NUM_INTERIOR: '',
        NUM_EXTERIOR: ''
    }

    const [medicos, setMedicos] = useState([])
    const [citasMedico, setCitasMedico] = useState([])


    const [cita, setCita] = useState(initialDatosCita)
    const [datosPer, setDatosPer] = useState(initialDatosPer)
    const [datosDom, setDatosDom] = useState(initialDatosDom)
    const [currSlots, setCurrSlots] = useState(initialCurrentSlots) //El horario que se muestra en fullcalendar
    const [slots, setSlots] = useState() //Almacenara la hora de entrada y de salida del medico, de L-V

    //Reinicia los campos de los objetos cita, datosPer y datosDom
    const resetCita = () => { setCita(initialDatosCita) }
    const resetDatosPer = () => { setDatosPer(initialDatosPer) }
    const resetDatosDom = () => { setDatosDom(initialDatosDom) }

    //Reinicia los medicos y las citas del medico seleccionado
    const resetMedicos = () => { setMedicos([]) }
    const resetCitasMedico = () => { setCitasMedico([]) }

    //Reiniciamos los slots que  del horario que sse estan usando y que se guardan
    const resetCurrentSlots = () => { setCurrSlots(initialCurrentSlots) }
    const resetSlots = () => { setSlots() }

    const [tiposSangre, setTiposSangre] = useState(TIPOS_DE_SANGRE());

    const insertDate = async () => {
        setOpen2(false)
        await insertarCita(cita)
        //resetMedicos()
        resetCita()
        resetDatosDom()
        resetDatosPer()
        resetCurrentSlots()
        resetSlots()
        toast.success('Cita agendada')
    }

    function handleDatosPersonales(event) {
        setDatosPer({ ...datosPer, [event.target.name]: event.target.value })
    }

    function handleDatosDomicilio(event) {
        setDatosDom({ ...datosDom, [event.target.name]: event.target.value })
    }

    function handleDate(newValue) {
        datosPer["NACIMIENTO"] = date_to_ts(newValue)
    }


    useEffect(() => {
        obtenerMedicos()
    }, [])

    const obtenerMedicos = async () => {
        setMedicos(await DatoDeLaBDFiltrado(id))
    }

    const hanndleMedico = async (evt) => {
        setIsloading(true)
        setCita({ ...cita, [evt.target.name]: evt.target.value })
        setCitasMedico(await get_Citas_Filtradas_BD(evt.target.value))
        setSlots(await get_Horario_Medico_BD(evt.target.value))
        setIsloading(false)
    }

    const hanndNuevaCita = async (selected) => {
        cita.DATEINICIO = date_to_ts(selected.start)
        cita.DATEFIN = date_to_ts(selected.end)
        console.log(cita)
    }

    function handleDate(newValue) {
        /**Se cambia la fecha a la fecha seleccionada en el datepicker */
        calendarRef.current.getApi().gotoDate(new Date(newValue));
        //setFecha(newValue)
        setCurrSlots(slots[newValue.$W])

        //console.log(calendarRef.current)
    }

    const buscarPorCurp = async () => {
        //const data = await get_Pacientes_Filtrado_BD(datosPer.CURP)
        get_Pacientes_Filtrado_BD(datosPer.CURP).then((data) => {

            setDatosPer(data[0])
            setDatosDom(data[1])
            cita.ID_PACIENTE = data[0].ID
            console.log(cita)

        }).catch((e) => {
            console.log('error')
            toast.error('Paciente no encontrado')
        })


    }

    return (
        <div>
            <Button className="bg-light border border-dark-subtle rounded-4 text-black shadow  mb-5 bg-body-tertiary rounded"
                style={{ width: "100%", height: "100%", fontSize: "20px" }}
                onClick={() => setOpen(true)}>
                <span className="text-primary" style={{ fontSize: "30px" }}>&gt;</span> {especialidad}
            </Button>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
                PaperProps={{
                    style: {
                        maxWidth: '800px',
                        minHeight: '700px'

                    },
                }}>

                <DialogTitle>
                    <div className='row'>
                        <div className='col-11'>
                            Agendar cita
                        </div>
                        <div className='col-1'>

                            <Button onClick={() => {
                                setOpen(false)
                            }}>X</Button>

                        </div>
                    </div>
                    <Divider className='bg-black' />
                </DialogTitle>
                <DialogContent>
                    <div className='row d-flex mt-2'>


                        <div className="col-8">
                            <TextField
                                label="Medico"
                                select
                                fullWidth
                                variant='standard'
                                value={cita.ID_USUARIO}
                                name='ID_USUARIO'
                                onChange={(e) => hanndleMedico(e)}
                            >

                                {medicos.map((dato, index) => (
                                    <MenuItem key={index} value={dato.ID} >{dato.NOMBRE + ' ' + dato.AP_PATERNO + ' ' + dato.AP_MATERNO}</MenuItem>
                                ))}

                            </TextField>
                        </div>
                        <div className='col-4'>
                            <LocalizationProvider variant='standard' dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    shouldDisableDate={(date) => {
                                        return date.$W === 0 || date.$W === 6;
                                    }}
                                    onChange={(newValue) => handleDate(newValue)}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div className='row '>
                        <div className='col-12'>
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

                                            ref={calendarRef}

                                            plugins={[
                                                dayGridPlugin,
                                                timeGridPlugin,
                                                interactionPlugin,
                                                listPlugin,
                                            ]}

                                            headerToolbar={{
                                                left: "",
                                                center: "",
                                                right: "",
                                            }}


                                            initialView="timeGridDay" //Pone como defecto la vistaa por dia
                                            allDaySlot={false} //Quita la opcion que es de seleciconar todo el dia
                                            editable={false} //Permite mover los eventos moviendolos con el click + mouse 
                                            eventOverlap={false} //Determina si los eventos se pueden solapar uno encima del otro

                                            eventMinHeight={30} //Establece el TAMAÑO minimo del evento, no la hora 

                                            slotDuration={"00:60:00"} //Cambia la hora de duracion del slot

                                            slotLabelFormat={{
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            }}

                                            eventColor={'#70B6DD'}
                                            eventTextColor={"#000000"} // cambia el color del texto de los eventos

                                            slotMinTime={currSlots.min}
                                            slotMaxTime={currSlots.max}



                                            selectable={true} //Permite a un usuario resaltar varios días o intervalos de tiempo haciendo clic y arrastrando.
                                            selectMirror={true
                                            } //
                                            dayMaxEvents={true}

                                            Evento para crear una cita
                                            select={(selected) => {
                                                hanndNuevaCita(selected)
                                                setOpen(false)
                                                setOpen2(true)
                                            }}


                                            weekends={false}
                                            //Evento para eliminar un evento
                                            //eventClick={handleEventClick}

                                            //eventsSet={(events) => setCurrentEvents(events)}

                                            initialEvents={citasMedico}
                                            locale={'es'}
                                        />
                                    )
                            }
                        </div>
                    </div>
                </DialogContent >

                <DialogActions>
                    <Button>

                    </Button>
                </DialogActions>

            </Dialog>
            <Dialog
                open={open2}
                onClose={() => setOpen2(false)}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
                PaperProps={{
                    style: {
                        maxWidth: '1000px',
                    },
                }}>

                <DialogTitle id='dialog-title'>
                    <div className='row'>
                        <div className='col-11'>
                            Datos personales
                        </div>
                        <div className='col-1'>
                            <Button onClick={() => {
                                setOpen2(false)
                                reiniciarFormulario()
                            }}
                            >
                                X
                            </Button>
                        </div>
                    </div>


                    <Divider className='bg-black' />
                </DialogTitle>

                <DialogContent>

                    <DialogContentText className='mt-2' id='dialog-description'>
                        <Stack spacing={3}>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Nombre"
                                    size="small"
                                    name="NOMBRE"

                                    value={datosPer.NOMBRE}
                                    onChange={(e) => handleDatosPersonales(e)}
                                />
                                <TextField
                                    label="Apellido paterno"
                                    name="AP_PATERNO"
                                    size="small"
                                    value={datosPer.AP_PATERNO} onChange={(e) => handleDatosPersonales(e)} />
                                <TextField
                                    label="Apellido materno"
                                    name="AP_MATERNO"
                                    size="small"
                                    value={datosPer.AP_MATERNO} onChange={(e) => handleDatosPersonales(e)} />

                                <TextField size='small' name="ID_TIP_SANGRE" label="Tipo de sangre" select value={datosPer.ID_TIP_SANGRE} style={{ minWidth: '250px' }} onChange={(e) => handleDatosPersonales(e)}>
                                    {tiposSangre.map((dato) => (
                                        <MenuItem value={dato.ID} >{dato.TIPO_SANGRE}</MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <TextField type="number" label="Telefono" name='TELEFONO' size="small" value={datosPer.TELEFONO} onChange={(e) => handleDatosPersonales(e)} />
                                <TextField label="CURP" name="CURP" size="small" value={datosPer.CURP} onChange={(e) => handleDatosPersonales(e)} />

                                <TextField size='small' name="ID_SEXO" label="Sexo" select value={datosPer.ID_SEXO} style={{ minWidth: '200px' }}
                                    onChange={(e) => handleDatosPersonales(e)}>
                                    <MenuItem value="1">Hombre</MenuItem>
                                    <MenuItem value="2">Mujer</MenuItem>
                                </TextField>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Fecha de nacimiento"
                                        defaultValue={dayjs(ts_to_date(datosPer.NACIMIENTO))}
                                    />
                                </LocalizationProvider>


                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <TextField label="Email" size="small" name="EMAIL" value={datosPer.EMAIL} onChange={(e) => handleDatosPersonales(e)} />
                                <TextField label="Alergias" size="small" multiline name="ALERGIAS" value={datosPer.ALERGIAS} onChange={(e) => handleDatosPersonales(e)} />

                            </Stack>

                            <h5 style={{ color: "black" }}>Domicilio</h5>
                            <hr />
                            <Stack direction="row" spacing={2}>
                                <TextField label="Ciudad" size="small" name="CIUDAD" value={datosDom.CIUDAD} onChange={(e) => handleDatosDomicilio(e)} />
                                <TextField label="Colonia" size="small" name="COLONIA" value={datosDom.COLONIA} onChange={(e) => handleDatosDomicilio(e)} />
                                <TextField type="number" label="Codigo postal" size="small" name="COD_POSTAL" value={datosDom.COD_POSTAL} onChange={(e) => handleDatosDomicilio(e)} />
                                <TextField label="Calle" size="small" name="CALLE" value={datosDom.CALLE} onChange={(e) => handleDatosDomicilio(e)} />
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <TextField type="number" label="Num. Exterior" size="small" name="NUM_EXTERIOR" value={datosDom.NUM_EXTERIOR} onChange={(e) => handleDatosDomicilio(e)} />
                                <TextField type="number" label="Num. Interior" size="small" name="NUM_INTERIOR" value={datosDom.NUM_INTERIOR} onChange={(e) => handleDatosDomicilio(e)} />
                            </Stack>

                        </Stack>
                    </DialogContentText>
                </DialogContent>

                <DialogActions className='justify-content-between'>

                    <Button
                        variant='text'
                        color='error'
                        onClick={() => {
                            setOpen(true)
                            setOpen2(false)
                        }}
                    >
                        <i class="bi bi-arrow-left"></i>
                    </Button>

                    <Button
                        variant='outlined'

                        onClick={async () => {
                            buscarPorCurp()
                        }}
                    >
                        <i class="bi bi-search"></i> &nbsp; Busar por curp
                    </Button>

                    <Button
                        className='bg-success text-white'
                        onClick={async () => {
                            insertDate()
                            //await insertarPACyDOM()
                            //obtenerDatos()
                        }}
                    >
                        Guardar
                    </Button>

                </DialogActions>
            </Dialog>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
        </div>
    );
}

export default AgregarCitaEspecialidad;