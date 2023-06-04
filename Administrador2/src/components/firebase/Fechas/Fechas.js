import { Timestamp } from "firebase/firestore";

const DIAS = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
];

const MESES = ["Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];


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

export function formatearFechaHora(timestamp) {
    const fechaConsulta = ts_to_date(timestamp);

    const year = fechaConsulta.getFullYear()
    const month = fechaConsulta.getMonth() ;
    const day = fechaConsulta.getDay()
    const dayMonth = fechaConsulta.getDate();

    const hours = fechaConsulta.getHours();
    const minutes = fechaConsulta.getMinutes();
    return `${DIAS[day]} ${dayMonth} de ${MESES[month]} del ${year} ${hours}:${String(minutes).padStart(2, '0')} `
}

