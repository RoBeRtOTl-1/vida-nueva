import { Timestamp } from "firebase/firestore";

export function ts_to_date(ts) {
    return new Timestamp(ts.seconds, ts.nanoseconds).toDate()
}

export function date_to_ts(date) {
    const ts = new Date(date)
    return Timestamp.fromDate(ts)
}

export function getCurrentDate() {
    const fechaActual = new Date();
    return fechaActual;
}

export function formatearHorario(cadena) {
    const cadenaFormateada = cadena.replace(/\|/g, '<br>');
    return cadenaFormateada;
}


export function ts_to_HM(timestamp) {
    const fecha = ts_to_date(timestamp)
    const horas = String(fecha.getHours()).padStart(2, '0'); // Obtiene las horas en formato de 24h y asegura que tenga dos dígitos
    const minutos = String(fecha.getMinutes()).padStart(2, '0'); // Obtiene los minutos y asegura que tenga dos dígitos
    return horas + ':' + minutos;
}