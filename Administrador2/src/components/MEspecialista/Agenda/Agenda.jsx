import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
    InputAdornment
} from '@mui/material'
import { Stack, TextField } from '@mui/material'
import { insertarConsulta } from '../../firebase/Consultas/CTAS_CRUD.js';

import { Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { _, Grid } from 'gridjs-react';

import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { get_Citas_Filtradas_BD } from "../../firebase/Citas/CIT_CRUD";
import { DataContext } from "../../../context/UserContext";
import { date_to_ts, formatearFechaHora, getCurrentDate } from '../../firebase/Fechas/Fechas';
import { get_Pacientes_BD } from '../../firebase/Pacientes/PAC_CRUD.js';
import { DatoDeLaBDFiltrado } from '../../firebase/Ususarios/USU_CRUD.js';
import { DatoDeLaBD } from '../../firebase/Ususarios/USU_CRUD.js';

export default function Agenda() {
    //Usamos el useRef para apuntar al calendario
    const calendarRef = useRef(null);

    const [currentCitas, setCurrentCitas] = useState([])
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)

    const { currenUser } = useContext(DataContext) //Ojo poner el DataContext cuando lo deseamos consumir

    const obtenerDatos = async () => {
        setCurrentCitas(await get_Citas_Filtradas_BD(currenUser.ID_USUARIO))
        await obtenerMedicos()
        await obtenerPac()
    }
    useEffect(() => {
        obtenerDatos()

    }, []);

    const [datosPer, setDatosPer] = useState({
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
    })

    const initialDatosCita = {
        ID_PACIENTES: '',
        ID_USUARIO: '',
        DATEINICIO: '',
        DATEFIN: '',
    }

    const [medAct, setMedAct] = useState(new Map())
    const [pac, setPac] = useState(new Map())

    const obtenerPac = async () => {
        const pacientes = await get_Pacientes_BD()
        setPac(await new Map(pacientes.map(dato => [dato.ID, dato.NOMBRE + " " + dato.AP_PATERNO + " " + dato.AP_MATERNO])))
    }

    const obtenerMedicos = async () => {
        const med = await DatoDeLaBD();
        setMedAct(await new Map(med.map(dato => [dato.ID, dato.NOMBRE + " " + dato.AP_PATERNO + " " + dato.AP_MATERNO])))

    }

    const [dataDate, setDataDate] = useState(initialDatosCita)

    const handleDate = (date) => {
        setDataDate(date.event.extendedProps.data)

        console.log(dataDate)
        setOpen2(true)
    }


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

                        select={() => { console.log("hola") }}
                        eventClick={(select) => { handleDate(select) }}
                    />
                </div>

                <Dialog
                    open={open2}
                    onClose={() => setOpen2(false)}
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
                            reiniciarFormulario()
                        }}>X</Button>
                        <hr />
                    </DialogTitle>

                    <DialogContent>

                        <DialogContentText className='mt-2' id='dialog-description'>
                            <DialogContentText className='' id='dialog-description'>
                                <div className="row text-center text-black">

                                    <div className="col-12 ">
                                        <h6>Medico:</h6>
                                    </div>
                                    <div className="col-12 ">
                                        <h2>{dataDate.ID_USUARIO ? medAct.get(dataDate.ID_USUARIO) : ''}</h2>
                                    </div>
                                    <div className="col-12 ">
                                        <h6>Paciente:</h6>
                                    </div>
                                    <div className="col-12 ">
                                        <h2>{dataDate.ID_PACIENTES ? pac.get(dataDate.ID_PACIENTES) : ''}</h2>
                                    </div>
                                    <div className="col-12 ">
                                        <h6>Fecha:</h6>
                                    </div>
                                    <div className="col-12 ">
                                        <h2>{dataDate.DATEINICIO ? formatearFechaHora((dataDate.DATEINICIO)) : 'ño'}</h2>
                                    </div>
                                </div>

                            </DialogContentText>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className='justify-content-between'>

                        <Button
                            variant='text'
                            color='error'
                            onClick={async () => {
                                setOpen2(false)
                            }} >Cancelar</Button>

                        <Button
                            className='bg-success text-white'
                            onClick={async () => {
                                setOpen2(false)
                                setOpen(true)
                                await guardarConsultaMedica()
                                obtenerDatos()
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
                                    <TextField type="number" label="Peso" size="small" name="PESO"
                                        value={datosPer.PESO}
                                        onChange={(e) => handleDatosPersonales(e)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                        }} />

                                    <TextField label="Estatura" name="ESTATURA" size="small"
                                        value={datosPer.ESTATURA}
                                        onChange={(e) => handleDatosPersonales(e)}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                        }} />


                                    <TextField label="IMC" name="IMC" size="small"
                                        value={datosPer.IMC}
                                        onChange={(e) => handleDatosPersonales(e)} />

                                    <TextField label="Presion siast" name="PRESION_SIAST" size="small"
                                        value={datosPer.PRESION_SIAST}
                                        onChange={(e) => handleDatosPersonales(e)} />

                                    <TextField label="Presion diast" name="PRESION_DIAST" size="small"
                                        value={datosPer.PRESION_DIAST}
                                        onChange={(e) => handleDatosPersonales(e)} />
                                </Stack>

                                <Stack spacing={2}>
                                    <TextField
                                        label="Sintomas"
                                        name='SINTOMAS'
                                        size="small"
                                        value={datosPer.SINTOMAS}
                                        onChange={(e) => handleDatosPersonales(e)} />
                                </Stack>

                                <Stack spacing={2}>
                                    <TextField
                                        label="Diagnostico"
                                        name='DIAGNOSTICO'
                                        size="small"
                                        value={datosPer.DIAGNOSTICO}
                                        onChange={(e) => handleDatosPersonales(e)} />
                                </Stack>

                                <Stack spacing={2}>
                                    <TextField
                                        label="Medicamentos"
                                        name='MEDICAMENTOS'
                                        size="small"
                                        value={datosPer.MEDICAMENTOS}
                                        onChange={(e) => handleDatosPersonales(e)} />
                                </Stack>


                            </Stack>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className='align-middle'>
                        <Button className='bg-success text-white' onClick={async () => {
                            setOpen(false)
                            await guardarConsultaMedica()
                            obtenerDatos()
                        }} >Guardar</Button>

                    </DialogActions>
                </Dialog>
            </div>
        </div>

    );
}
