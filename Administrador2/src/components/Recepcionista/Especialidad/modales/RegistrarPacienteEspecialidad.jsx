import React from 'react';
import {Button, Grid, InputLabel, MenuItem, Select, TextField, DialogContent,DialogTitle} from "@mui/material";

function RegistrarPacienteEspecialidad(props) {
    return (
        <div>
            <DialogTitle>Datos de Usuario</DialogTitle>
            <DialogContent >
                <form >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField label="Nombre(s)" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Apellido Materno" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Apellido Paterno" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Teléfono" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel id="samgre-simple-select-label">Tipo de Sangre</InputLabel>
                            <Select labelId="sangre-simple-select-label" label="Tipo de sangre" fullWidth>
                                <MenuItem value="A+">A+</MenuItem>
                                <MenuItem value="A-">A-</MenuItem>
                                <MenuItem value="B+">B+</MenuItem>
                                <MenuItem value="B-">B-</MenuItem>
                                <MenuItem value="O+">O+</MenuItem>
                                <MenuItem value="O-">O-</MenuItem>
                                <MenuItem value="AB+">AB+</MenuItem>
                                <MenuItem value="AB-">AB-</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel id="sexo-simple-select-label">Sexo</InputLabel>
                            <Select labelId="sexo-simple-select-label" label="Sexo" fullWidth>
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Femenino">Femenino</MenuItem>
                                <MenuItem value="Otro">Otro</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="CURP" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Fecha de Nacimiento" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Alergias" multiline fullWidth />
                        </Grid>
                    </Grid>
                    <div className="pt-4 d-flex justify-content-between">
                        <Button variant="contained" color="primary">
                            Buscar por CURP
                        </Button>
                        <Button variant="contained" color="success">
                            Confirmar
                        </Button>
                    </div>
                </form>
            </DialogContent >
        </div>
    );
}

export default RegistrarPacienteEspecialidad;