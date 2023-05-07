import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem
} from '@mui/material'
import { _, Grid } from 'gridjs-react';

import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';


/**
 * ID_EXPEDIENTE - Hace referencia a la consulta 
 * @returns 
 */
export default function Visualizar({ datosMedico, datos }) {
    const [open, setOpen] = useState(false)


    /**
     * Este metodo insertara al domicilio y al usuario
     * Primero inserta al domicilio, guarda su ID y se lo asigna al 
     * objeto que tiene los datos del usuario, y por ultimo inserta los datos del usuario
     */

    return (
        <div>

            <Button onClick={() => setOpen(true)}>
                <img
                    src="src/css/img/Medico/VerConsulta.png"
                    style={{ width: "30px" }}
                />
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
                    <span style={{ color: "black", fontSize: "23px" }}>Consulta medica</span>
                    <Button onClick={() => {
                        setOpen(false)
                        reiniciarFormulario()
                    }}>X</Button>
                    <hr />
                </DialogTitle>

                <DialogContent>

                    <DialogContentText className='mt-2' id='dialog-description'>
                        <p className='text-black' > <b> Medico: </b> {datosMedico} </p>
                        <p   className='text-black' > <b> Peso: </b> {datos.PESO} kg <b> Estatura: </b> {datos.ESTATURA} cm <b> IMC </b>   {datos.IMC}</p>     
                        <p className='text-black' > <b> Presion diast: </b> {datos.PRESION_DIAST} <b> Presion diast: </b> {datos.PRESION_SIAST} </p>
                        
                        <p className='text-black' > <b> Sintomas: </b> {datos.SINTOMAS} </p>
                        <p className='text-black' > <b> Diagnostico: </b> {datos.DIAGNOSTICO} </p>
                        <p className='text-black' > <b> Medicamentos: </b> {datos.MEDICAMENTOS} </p>

                    </DialogContentText>
                </DialogContent>

                <DialogActions className='align-middle'>

                </DialogActions>
            </Dialog>
        </div>
    )
}