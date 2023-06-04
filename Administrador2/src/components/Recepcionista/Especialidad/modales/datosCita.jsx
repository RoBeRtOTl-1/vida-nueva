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
    Divider,
    Box
} from "@mui/material";

import { Toaster, toast } from "react-hot-toast"



const DatosCita = () => {

    const [open, setOpen] = useState(true);

    return (
        <div>
            <Button className="bg-light border border-dark-subtle rounded-4 text-black shadow  mb-5 bg-body-tertiary rounded"
                style={{ width: "100%", height: "100%", fontSize: "20px" }}
                onClick={() => setOpen(true)}>
                
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
                    <div className='row'>
                        <div className='col-11'>
                            Datos de cita
                        </div>
                        <div className='col-1'>
                            <Button onClick={() => {
                                setOpen(false)
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
                        <DialogContentText className='' id='dialog-description'>
                            <div className="row text-center text-black">
                                <div className="col-12">
                                    <h1>Clínica Vida Nueva</h1>
                                </div>
                                <div className="col-12 ">
                                    <h6>Medico:</h6>
                                </div>
                                <div className="col-12 ">
                                    <h4>Marcela Gonzalez Beltran</h4>
                                </div>
                                <div className="col-12 ">
                                    <h6>Paciente:</h6>
                                </div>
                                <div className="col-12 ">
                                    <h4>Smantha Gonzalez Urbina</h4>
                                </div>
                                <div className="col-12 ">
                                    <h6>Fecha:</h6>
                                </div>
                                <div className="col-12 ">
                                    <h4>Miércoles 21 de Junio del 2023 13:00</h4>
                                </div>
                            </div>

                        </DialogContentText>
                    </DialogContentText>
                </DialogContent>

                <DialogActions className='d-flex justify-content-end'>
                </DialogActions>
            </Dialog>


            <Toaster
                position="top-right"
                reverseOrder={true}
            />
        </div>
    );
}

export default DatosCita;