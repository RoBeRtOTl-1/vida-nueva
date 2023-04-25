import React from 'react';
import {Button, Grid, InputLabel, MenuItem, Select, TextField, DialogContent,DialogTitle} from "@mui/material";
import CancelarCitaEspecialidad from "./CancelarCitaEspecialidad.jsx";

function VisualizarInformacionPacienteEspecialidad(props) {
    return (
        <div>
            <DialogTitle>Seleccionar fecha</DialogTitle>
            <DialogContent>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div>
                            Paciente:
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            Medico:
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            Especialidad:
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            Fecha y hora:
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button>Eliminar</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <CancelarCitaEspecialidad/>
                    </Grid>
                </Grid>
            </DialogContent >
        </div>
    );
}

export default VisualizarInformacionPacienteEspecialidad;