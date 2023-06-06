import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http"
import cors from "cors"
import { PORT } from "./config.js";

let cola_turnos = []
let turnosActual = {}
let cola_publicidad = []


const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true
    }
})
app.use(cors())
app.use(morgan("dev"));
server.listen(PORT)
console.log("Server esuchando http://localhost:" + PORT)


io.on('connection', (socket) => {

    /**
     * Escucha el evento "nuevoTurno" 
     * Recibe el objeto "turno" creado, despues añade el 
     * objeto a la cola, y emite el evento "colaTurnos" para 
     * cambiar la cola  turnos que se muestran en la pantalla
     * 
     */
    socket.on("nuevoTurno", (nuevoTurno) => {
        cola_turnos.push(nuevoTurno) //Añade el objeto al array
        io.emit("colaTurnos", cola_turnos) //Pasa como parametro la cola que contiene todos los turnos
    });

    /**
     * Escucha el evento "anvanzaTurno"
     * Quita el el primero objeto de la cola de turnos y la guarda
     * en una variable, despues emite el evento "setNextTurno" 
     * y "colaTurnos"
     */
    socket.on("avanzarTurno", () => {
        turnosActual = cola_turnos.shift() //Quita el primer objeto de la cola y lo guarda
        io.emit("setNextTurno", turnosActual) // Pasa como parametro el objeto quitado
        io.emit("colaTurnos", cola_turnos) // Emite el evento "colaTurnos" para actualizar los turnos 
        // de la pantalla 
    });


    /**
     * Escucha el evento de "Datos actuales"
     * Realiza una consulta a firebase para obtener los turnos con las siguientes condiciones:
     *      -Que sean del dia actual
     *      -Que tengan el estado "en cola" o "llamado"
     * 
     */
    socket.on("DatosActuales", async (data) => {
        cola_turnos = data[0]
        turnosActual = data[1][0] ? data[1][0] : null

        io.emit("setNextTurno", turnosActual)
        io.emit("colaTurnos", cola_turnos) // Emite el evento "colaTurnos" para actualizar los turnos 
        //                                    // de la pantalla 
    });

    socket.on("PublicidadActiva", async (data) => {
        if (!(cola_publicidad[0])) {
            cola_publicidad = data
        }
        await io.emit('publicidad', await cola_publicidad)
        // console.log( cola_publicidad[0] ? 'si' : 'no')
    })


    socket.on("ActualizarPublicidad", async (data) => {

        cola_publicidad = data;
        console.log('---------------------------------------------------------------------------------------')
        console.log(cola_publicidad)
        await io.emit('publicidad', await cola_publicidad)
        await io.emit('publicidad', await cola_publicidad)
        await io.emit('publicidad', await cola_publicidad)
    })

})
