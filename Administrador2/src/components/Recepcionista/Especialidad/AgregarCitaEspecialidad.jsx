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

import RegistrarPacienteEspecialidad from "./modales/RegistrarPacienteEspecialidad";
import FechaModalEspecialidad from "./modales/FechaModalEspecialidad.jsx";
import VisualizarInformacionPacienteEspecialidad from "./modales/VisualizarInformacionPacienteEspecialidad.jsx";

const AgregarCitaEspecialidad = ({especialidad,id}) => {
    const [open, setOpen] = useState(false);
    const [steps,setSteps] = useState(0);

    return (
        <div>
            <Button className="bg-light border border-dark-subtle rounded-4 text-black shadow  mb-5 bg-body-tertiary rounded"
                    style={{ width: "100%", height: "100%", fontSize: "20px" }}
                    onClick={() => setOpen(true)}>
                <span className="text-primary" style={{ fontSize: "30px" }}>&gt;</span> {especialidad}
            </Button>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
                PaperProps={{
                    style: {
                        maxWidth: '1000px',
                    },
                }}>
              <VisualizarInformacionPacienteEspecialidad/>

            </Dialog>
        </div>
    );
}

export default AgregarCitaEspecialidad;