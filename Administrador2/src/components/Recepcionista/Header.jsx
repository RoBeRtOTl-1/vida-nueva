import React, { useState, useEffect } from "react";

export default function Header() {
    const [fechaHora, setFechaHora] = useState('');
    useEffect(() => {
        function mostrarFechaHora() {
            const now = new Date();
            const options = {
                day: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric'
            };
            const currentTime = new Intl.DateTimeFormat('es-ES', options).format(now);

            setFechaHora(currentTime.replace(",",""));
        }
        const intervalId = setInterval(mostrarFechaHora, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="col-sm-12">
            <header className="navbar" style={{ backgroundColor: "#AECDF1", height: "80px" }}>
                <div className="container-fluid justify-content-end ">
                    <div className="border rounded border-gray shadow-custom p-3 d-flex align-items-center" style={{ color: "#000000", justifyContent: "center", backgroundColor: "white", height:"45px" }}>
                        {fechaHora}
                    </div>
                </div>
            </header>
        </div >
    )
}