import { React, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

import Stack from '@mui/material/Stack';

export default function Success({valor}) {
    const [open, setOpen] = useState(valor);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setOpen(false);
        }, 5000);
        return () => clearTimeout(timerId);
    }, []);

    return (
        <>
            {open && (
                <Stack sx={{ width: '50%' }} spacing={2}>
                    <Alert
                        severity="success"
                        onClose={() => setOpen(false)}>
                        Usuario modificado
                    </Alert>
                </Stack>
            )}
        </>
    );
}
