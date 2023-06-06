import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment,
    TextField,
    Stack,
    Box
} from "@mui/material";

import { insertarConsulta } from '../../firebase/Consultas/CTAS_CRUD.js';

import React, { useContext, useEffect, useRef, useState } from "react";
import { _, Grid } from 'gridjs-react';

import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { actualizarCita, get_Citas_Filtradas_BD } from "../../firebase/Citas/CIT_CRUD";
import { DataContext } from "../../../context/UserContext";
import { date_to_ts, formatearFechaHora, getCurrentDate, ts_to_date } from '../../firebase/Fechas/Fechas';
import { get_Pacientes_BD } from '../../firebase/Pacientes/PAC_CRUD.js';
import TIPOS_DE_SANGRE from '../../firebase/TiposSangre/TS_CRUD.js';
import { Toaster, toast } from "react-hot-toast"
import { PDFDownloadLink } from "@react-pdf/renderer";


export default function Agenda() {
    //Usamos el useRef para apuntar al calendario
    const calendarRef = useRef(null);

    const [currentCitas, setCurrentCitas] = useState([])
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [openCancel, setOpenCancel] = useState(false)
    const [select, setSelect] = useState()

    const [pacientes, setPacientes] = useState(new Map())
    const [dataPac, setDataPac] = useState(null)

    const tipos_sangre = TIPOS_DE_SANGRE();

    const { currenUser } = useContext(DataContext) //Ojo poner el DataContext cuando lo deseamos consumir


    const obtenerDatos = async () => {
        setCurrentCitas(await get_Citas_Filtradas_BD(currenUser.ID_USUARIO))

        const pac = await get_Pacientes_BD()
        const map = new Map(pac.map(paciente => [paciente.ID, paciente]))
        setPacientes(map)

    }
    useEffect(() => {
        obtenerDatos()

    }, []);

    const initialDatosPer = {
        ID_PACIENTE: '',
        ID_USUARIO: currenUser.ID_USUARIO,
        PESO: '',
        ESTATURA: '',
        IMC: '',
        FECHAHORA: date_to_ts(getCurrentDate()),
        PRESION_SIAST: '',
        PRESION_DIAST: '',
        SINTOMAS: '',
        DIAGNOSTICO: '',
        MEDICAMENTOS: ''
    }

    const [datosPer, setDatosPer] = useState(initialDatosPer)

    const initialDatosCita = {
        ID_PACIENTES: '',
        ID_USUARIO: '',
        DATEINICIO: '',
        DATEFIN: '',
    }

    const [dataDate, setDataDate] = useState(initialDatosCita)

    const handleDate = (date) => {
        const id = date.event.extendedProps.data.ID_PACIENTES
        setSelect(date.event)
        setDataPac(pacientes.get(id))
        datosPer.ID_PACIENTE = id
        setOpen2(true)
    }

    function handleDatosPersonales(event) {
        setDatosPer({ ...datosPer, [event.target.name]: event.target.value })
    }

    const sexos = [
        { SEXO: "ERROR" },
        { SEXO: "Hombre" },
        { SEXO: "Mujer" }
    ]

    const getAge = (fecha) => {
        let hoy = new Date()
        let fechaNacimiento = ts_to_date(fecha)
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
        if (
            diferenciaMeses < 0 ||
            (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
            edad--
        }
        return "" + edad

    }

    const saveConsulta = async (evt) => {
        evt.preventDefault()

        await insertarConsulta(datosPer)
        await actualizarCita(select.id, '3') //Cambiamos el estado de la cita a atendido
        setOpen(false)
        obtenerDatos()
        resetForm()
        toast.success('Cita registrada')

    }

    const resetForm = () => {
        setDatosPer(initialDatosPer)
        setSelect(null)
    }

    const cancelarCita = async () => {

        await actualizarCita(select.id, '5')
        setOpenCancel(false)
        setOpen2(false)
        obtenerDatos()
        resetForm()
        toast.success('Cita cancelada')
    }

    const handleDatos = (e) => {
        const { name, value } = e.target;
        let newDatosPer = { ...datosPer, [name]: value };

        if (name === 'PESO' || name === 'ESTATURA') {
            const peso = parseFloat(newDatosPer.PESO);
            const estatura = parseFloat(newDatosPer.ESTATURA);
            const imc = peso && estatura ? (peso / Math.pow(estatura / 100, 2)).toFixed(2) : '';
            newDatosPer = { ...newDatosPer, IMC: imc };
        }

        setDatosPer(newDatosPer);
    };
    
    return (

        <div className="rounded-4 pt-3 mt-4 border-gray shadow-custom" style={{ width: "111%", height: "630px" }} >
            <div className="container-fluid mt-4 d-flex justify-content-evenly" >
                <div className="col-12" >

                    <FullCalendar
                        height="70vh"

                        ref={calendarRef}

                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                            bootstrap5Plugin
                        ]}

                        headerToolbar={{
                            left: 'title',
                            center: "",
                            right: 'listDay,listWeek,listMonth'
                        }}


                        views={{
                            listDay: { buttonText: 'list day' },
                            listWeek: { buttonText: 'list week' },
                            listMonth: { buttonText: 'list month' }
                        }}

                        initialView="listDay" //Pone como defecto la vistaa por dia

                        themeSystem='bootstrap5'
                        events={currentCitas}
                        locale={'es'}

                        eventClick={(select) => { handleDate(select) }}
                    />
                </div>

                <Dialog
                    open={open2}
                    onClose={() => {
                        setOpen2(false)
                        setDataPac(null)
                    }}
                    aria-labelledby='dialog-title'
                    aria-describedby='dialog-description'
                    PaperProps={{
                        style: {
                            maxWidth: '800px',
                        },
                    }}>

                    <DialogTitle id='dialog-title'>
                        <span style={{ color: "black", fontSize: "23px" }}>Datos del paciente</span>
                        <Button onClick={() => {
                            setOpen2(false)

                        }}>X</Button>
                        <hr />
                    </DialogTitle>

                    <DialogContent>

                        <DialogContentText className='mt-2' id='dialog-description'>
                            <DialogContentText className='' id='dialog-description'>

                                {
                                    dataPac ? (
                                        <div className="row text-center text-black">

                                            <div className='col-6'>
                                                <Stack spacing={100}>
                                                    <Stack spacing={2}>
                                                        <TextField
                                                            label="Paciente"
                                                            value={`${dataPac.NOMBRE} ${dataPac.AP_PATERNO} ${dataPac.AP_MATERNO}`}

                                                            variant="standard"
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                    </Stack>
                                                </Stack>
                                            </div>

                                            <div className='col-2'>
                                                <Stack spacing={100}>
                                                    <Stack spacing={2}>
                                                        <TextField
                                                            label="Sexo"
                                                            value={sexos[parseInt(dataPac.ID_SEXO)].SEXO}

                                                            variant="standard"
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                    </Stack>
                                                </Stack>
                                            </div>
                                            <div className='col-2'>
                                                <Stack spacing={100}>
                                                    <Stack spacing={2}>
                                                        <TextField
                                                            label="Tipo de sangre"
                                                            value={tipos_sangre[dataPac.ID_TIP_SANGRE].TIPO_SANGRE}

                                                            variant="standard"
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                    </Stack>
                                                </Stack>
                                            </div>
                                            <div className='col-2'>
                                                <Stack spacing={100}>
                                                    <Stack spacing={2}>
                                                        <TextField
                                                            label="Edad"
                                                            value={getAge(dataPac.NACIMIENTO)}

                                                            variant="standard"
                                                            InputProps={{
                                                                readOnly: true,
                                                            }}
                                                        />
                                                    </Stack>
                                                </Stack>
                                            </div>

                                            <div className='row d-flex'>
                                                <div className='col-6'>
                                                    <div className='col-12 mt-4'>
                                                        <Stack spacing={100}>
                                                            <Stack spacing={2}>
                                                                <TextField
                                                                    label="Alergias"
                                                                    value={dataPac.ALERGIAS}

                                                                    variant="standard"
                                                                    multiline
                                                                    maxRows={5}
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                />
                                                            </Stack>
                                                        </Stack>
                                                    </div>
                                                </div>
                                                <div className='col-6'>
                                                    <div className='col-12 mt-5'>
                                                        <Stack spacing={100}>
                                                            <Stack spacing={2}>
                                                                <TextField
                                                                    label="Telefono"
                                                                    value={dataPac.TELEFONO}

                                                                    variant="standard"
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                />
                                                            </Stack>
                                                        </Stack>
                                                    </div>

                                                    <div className='col-12 mt-4'>
                                                        <Stack spacing={100}>
                                                            <Stack spacing={2}>
                                                                <TextField
                                                                    label="Email"
                                                                    value={dataPac.EMAIL}

                                                                    variant="standard"
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                />
                                                            </Stack>
                                                        </Stack>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    ) : (
                                        null
                                    )
                                }


                            </DialogContentText>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className='justify-content-between'>

                        <Button
                            variant='text'
                            color='error'
                            onClick={async () => {
                                setOpenCancel(true)
                            }} >
                            Cancelar
                        </Button>

                        <Button
                            variant='text'
                            color='error'
                            onClick={async () => {
                                //setOpen2(false)
                                const propsString = JSON.stringify({ ID_PACIENTE: select.extendedProps.data.ID_PACIENTES })
                                window.open(`http://localhost:5173/Expediente?props=${encodeURIComponent(propsString)}`)
                            }} >Ver expediente</Button>


                        <Button
                            className='bg-success text-white'
                            onClick={async () => {
                                setOpen2(false)
                                setOpen(true)
                            }} >Atender</Button>

                    </DialogActions>
                </Dialog>

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

                    <Box
                        component='form'
                        onSubmit={saveConsulta}
                    >

                        <DialogTitle id='dialog-title'>
                            <span style={{ color: "black", fontSize: "23px" }}>Registar consulta medica</span>
                            <Button onClick={() => {
                                setOpen(false)
                                reiniciarFormulario()
                            }}>X</Button>
                            <hr />
                        </DialogTitle>

                        <DialogContent>

                            <DialogContentText className='mt-2' id='dialog-description'>
                                <Stack spacing={3}>
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            type="number"
                                            label="Peso"
                                            size="small"
                                            name="PESO"
                                            required
                                            value={datosPer.PESO}

                                            onChange={(e) => {

                                                if (datosPer.PESO.length < 4 | e.nativeEvent.inputType == "deleteContentBackward") {
                                                    handleDatos(e)
                                                }
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                            }} />

                                        <TextField
                                            label="Estatura"
                                            name="ESTATURA"
                                            size="small"
                                            value={datosPer.ESTATURA}
                                            onChange={(e) => {
                                                if (datosPer.ESTATURA.length < 3 | e.nativeEvent.inputType == "deleteContentBackward") {
                                                    handleDatos(e)
                                                }
                                            }}
                                            required
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                            }} />


                                        <TextField
                                            label="IMC"
                                            name="IMC"
                                            size="small"
                                            required
                                            value={datosPer.IMC}
                                        />

                                        <TextField
                                            label="Presion siast"
                                            name="PRESION_SIAST"
                                            size="small"
                                            required
                                            type="number"
                                            value={datosPer.PRESION_SIAST}
                                            onChange={(e) => {
                                                if (datosPer.PRESION_SIAST.length < 5 | e.nativeEvent.inputType == "deleteContentBackward") {
                                                    handleDatosPersonales(e)
                                                }

                                            }} />

                                        <TextField
                                            label="Presion diast"
                                            name="PRESION_DIAST"
                                            size="small"
                                            type="number"
                                            required
                                            value={datosPer.PRESION_DIAST}
                                            onChange={(e) => {
                                                if (datosPer.PRESION_DIAST.length < 5 | e.nativeEvent.inputType == "deleteContentBackward") {
                                                    handleDatosPersonales(e)
                                                }

                                            }} />
                                    </Stack>

                                    <Stack spacing={2}>
                                        <TextField
                                            label="Sintomas"
                                            name='SINTOMAS'
                                            size="small"
                                            value={datosPer.SINTOMAS}
                                            required
                                            multiline
                                            maxRows={4}
                                            onChange={(e) => handleDatosPersonales(e)} />
                                    </Stack>

                                    <Stack spacing={2}>
                                        <TextField
                                            label="Diagnostico"
                                            name='DIAGNOSTICO'
                                            size="small"
                                            value={datosPer.DIAGNOSTICO}
                                            required
                                            multiline
                                            maxRows={4}
                                            onChange={(e) => handleDatosPersonales(e)} />
                                    </Stack>

                                    <Stack spacing={2}>
                                        <TextField
                                            label="Medicamentos"
                                            name='MEDICAMENTOS'
                                            size="small"
                                            value={datosPer.MEDICAMENTOS}
                                            required
                                            multiline
                                            maxRows={4}
                                            onChange={(e) => handleDatosPersonales(e)} />
                                    </Stack>


                                </Stack>
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions className='align-middle'>
                            <Button className='bg-success text-white'
                                type="sumbit" >Guardar</Button>

                        </DialogActions>
                    </Box>
                </Dialog>

                <Dialog
                    open={openCancel}
                    onClose={() => setOpenCancel(false)}
                    aria-labelledby='dialog-title'
                    aria-describedby='dialog-description'
                    PaperProps={{
                        style: {
                            maxWidth: '1000px',
                        },
                    }}>
                    <DialogTitle>Confirmar</DialogTitle>
                    <DialogContent>


                        <div>
                            ¿Esta seguro que desea cancelar la cita?
                        </div>

                        <div className="justify-content-between">
                            <Button onClick={() => {
                                setOpenCancel(false)
                            }} >Cancelar</Button>


                            <Button onClick={async () => {
                                cancelarCita()
                            }}>Confirmar</Button>
                        </div>


                    </DialogContent >
                </Dialog>
            </div>

            <Toaster
                position="top-right"
                reverseOrder={true}
            />
        </div >

    );
}
