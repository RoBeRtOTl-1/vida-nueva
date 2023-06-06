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
import { useState, useEffect, useContext } from 'react'
import { date_to_ts, formatearFechaHora, getCurrentDate } from '../../firebase/Fechas/Fechas'
import { actualizarContadores, datosNuevoTurno, insertarTurno } from '../../firebase/Turnos/TURN_CRUD';
import { io } from 'socket.io-client';
import { CountContext } from '../../../context/CountContext';



export default function Agregar({ servicio, id }) {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [datosTurno, setDatosTurno] = useState({})
    const socket = io("http://localhost:4000");
    const [isLoading, setIsLoading] = useState(false);
    
    const { countServ, setCountServ } = useContext( CountContext )

    useEffect(() => { }, []);

    async function insTur() {
        setIsLoading(true);
        setOpen(false) //Se oculta el primer modal

        //Actualizamos el valor del contexto que almacena nuestros contadores
        setCountServ({...countServ, [id]:(countServ[id] + 1) }) 

        //Actualizamos el contador en firebase
        await actualizarContadores( countServ )

        const idTurno = await insertarTurno(id, countServ[id]);  //Inserta un nuevo turno
        
        const dataTurno = await datosNuevoTurno(idTurno); //Obtiene los datos del turno insertado
        

        socket.emit("nuevoTurno", dataTurno);
        setDatosTurno(dataTurno)
        setIsLoading(false);
        setOpen2(true) //Se muestra el segundo modal
    }


    return (
        <div>
            <Button className="bg-light border border-dark-subtle rounded-4 text-black shadow p-3 mb-5 bg-body-tertiary rounded"
                style={{ width: "100%", height: "100%", fontSize: "20px" }}
                onClick={() => setOpen(true)}>
                <span className="text-primary" style={{ fontSize: "30px" }}>&gt;</span> {servicio}
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
                    <Button onClick={() => {
                        setOpen(false)

                    }}>X</Button>
                </DialogTitle>

                <DialogContent>

                    <DialogContentText className='' id='dialog-description'>
                        <div class="row text-center">
                            <div class="col-12">
                                <h5>Nombre del servicio</h5>
                            </div>
                            <div class="col-12 text-primary">
                                <h1>{servicio}</h1>
                            </div>
                        </div>

                        <div class="row text-center">
                            <div class="col-12">
                                <p>*De clic en generar turno solo si está seguro de utilizarlo</p>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='justify-content-center mb-3'>

                    <Button className='bg-primary text-white'
                        onClick={async () => {
                            setIsLoading(true);
                            await insTur()
                        }}>
                        <i class="bi bi-ticket-perforated"></i> &nbsp; Generar turno
                    </Button>

                </DialogActions>
            </Dialog>
            {isLoading ? (
                <div class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (

                <Dialog
                    open={open2}
                    onClose={() => setOpen2(false)}
                    aria-labelledby='dialog-title'
                    aria-describedby='dialog-description'
                    PaperProps={{
                        style: {
                            maxWidth: '600px',
                        },
                    }}>

                    <DialogTitle id='dialog-title'>
                        <Button onClick={() => {
                            setOpen2(false)

                        }}>X</Button>
                    </DialogTitle>

                    <DialogContent>

                        <DialogContentText className='' id='dialog-description'>
                            <div className="row text-center text-black">
                                <div className="col-12">
                                    <h1>Clínica Vida Nueva</h1>
                                </div>
                                <div className="col-12 ">
                                    <h5>Turno</h5>
                                </div>
                                <div className="col-12 ">
                                    <h1>{datosTurno.ID_TURNO}</h1>
                                </div>
                                <div className="col-12 ">
                                    <h5>Tipo de servicio</h5>
                                </div>
                                <div className="col-12 ">
                                    <h1>{servicio}</h1>
                                </div>
                                <div className="col-12 ">
                                    <h5>Fecha:</h5>
                                </div>
                                <div className="col-12 ">
                                    <h5> {formatearFechaHora( date_to_ts(new Date())) }</h5>
                                </div>
                            </div>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='justify-content-center mb-3'>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    )
}
