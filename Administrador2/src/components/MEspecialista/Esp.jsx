import React, { useState } from "react";
import Success from "../Alertas/Success";
import { Button } from "@mui/material";

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Especialista() {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2500);
    };

    return (
        <>
            <button onClick={handleClick}>Mostrar alerta</button>
            {open && (
                <div>

                    
                    <Stack sx={{ width: '50%' }} spacing={2}>
                        <Alert  severity="success">
                            Usuario modificado
                        </Alert>
                    </Stack>
                </div>
            )}
        </>
    );
}