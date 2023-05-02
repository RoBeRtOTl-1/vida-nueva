import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http"
import cors from "cors"
import { PORT } from "./config.js";
import { cola_turnos } from "./cola.js";



const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})
app.use(cors())
app.use(morgan("dev"));
server.listen(PORT)
console.log("Server esuchando"+PORT)


io.on('connection', (socket) => {

    socket.on("nuevoTurno", (nuevoTurno) => {
        cola_turnos.push(nuevoTurno)
        io.emit("colaTurnos", cola_turnos)
    });

    socket.on("avanzarTurno", () => {
        let dato = cola_turnos.shift()
        io.emit("setNextTurno", dato) //
        io.emit("colaTurnos", cola_turnos)
    });

})
