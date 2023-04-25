import React from 'react';
import {Button, Grid, InputLabel, MenuItem, Select, TextField, DialogContent,DialogTitle} from "@mui/material";

function FechaModalEspecialidad(props) {
    return (
        <div>
            <DialogTitle>Seleccionar fecha</DialogTitle>
            <DialogContent>
                <form >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputLabel id="sexo-simple-select-label">Seleccione un medico</InputLabel>
                            <Select labelId="sexo-simple-select-label" label="Sexo" fullWidth>
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Femenino">Femenino</MenuItem>
                                <MenuItem value="Otro">Otro</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <Button size="large" variant="outlined" fullWidth>Fecha</Button >
                        </Grid>
                        <Grid item xs={12}>
                            calendario
                        </Grid>
                    </Grid>
                </form>
            </DialogContent >
        </div>
    );
}

export default FechaModalEspecialidad;