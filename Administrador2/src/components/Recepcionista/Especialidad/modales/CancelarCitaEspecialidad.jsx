import React, {useState} from 'react';
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
    TextField
} from "@mui/material";


const CancelarCitaEspecialidad = ({especialidad, id, openModal}) => {
    const [openCancel, setOpenCancel] = useState(openModal ? openModal : false);

    return (
        <div>
            <Button  onClick={() => setOpenCancel(true)}>Modificar</Button>
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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div>
                                ¿Esta seguro que desea cancelar la cita?
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button>Cancelar</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button>Confirmar</Button>
                        </Grid>
                    </Grid>
                </DialogContent >
            </Dialog>
        </div>
    );
}

export default CancelarCitaEspecialidad;