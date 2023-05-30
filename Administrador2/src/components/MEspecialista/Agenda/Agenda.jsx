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
import { date_to_ts, getCurrentDate } from '../../firebase/Fechas/Fechas';

export default function Agenda() {
    //Usamos el useRef para apuntar al calendario
    const calendarRef = useRef(null);
    const [citasMedico, setCitasMedico] = ([{ // this object will be "parsed" into an Event Object
        title: 'The Title', // a property!
        start: '2023-05-21', // a property!
        end: '2023-05-21' // a property! ** see important note below about 'end' **
    }])
    const [currentCitas, setCurrentCitas] = useState([])
    const [open, setOpen] = useState(false)

    const { currenUser } = useContext(DataContext) //Ojo poner el DataContext cuando lo deseamos consumir

    const obtenerDatos = async () => {
        console.log(currenUser)
        setCurrentCitas(await get_Citas_Filtradas_BD(currenUser.ID_USUARIO))
        console.log(currentCitas)
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

    const handleDate = (date) =>{
        setOpen(true)
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
                        eventClick={(select) => { handleDate(select)}}
                    />
                </div>

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
