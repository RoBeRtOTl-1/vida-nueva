import { getCurrentDate, ts_to_date } from "../Fechas/Fechas";
import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, where, query, updateDoc, orderBy } from "firebase/firestore";


/**
 * Inserta un nuevo turno en la coleccion TURNOS
 * Parametros, ID del servicio, y el contador del servicio
 */
export async function insertarTurno(id, count) {
    const newTurno = await addDoc(collection(db, 'TURNOS'), {
        "ID_TURNO": `${id}-${count}`,
        "ID_SERVICIO": id,
        "ID_ESTADOS": 4,
        "FECHAHORA": getCurrentDate(),

    });
    return newTurno.id
}



export async function datosNuevoTurno(id) {
    const datos = {};
    const querySnapshot = await getDocs(query(collection(db, "TURNOS")));
    querySnapshot.forEach((doc) => {
        if (doc.id == id) {
            datos["ID"] = doc.id;
            Object.assign(datos, doc.data())
        }
    });
    return datos;
}


export async function BD_Turnos_Actuales() {
    const datos = [];
    const llamado = []
    const fecha = new Date()
    const currentDate = {
        year: fecha.getFullYear(),
        month: fecha.getMonth(),
        day: fecha.getDate()
    }
    const turnosRef = collection(db, "TURNOS") //Apuntamos a la coleccion
    const q = query(turnosRef,
        where('ID_ESTADOS', 'in', [4, 6]),
        orderBy("FECHAHORA"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        let docDate = ts_to_date(doc.data().FECHAHORA)

        let year = docDate.getFullYear()
        let month = docDate.getMonth()
        let day = docDate.getDate()

        if (currentDate.day == day &&
            currentDate.month && month &&
            currentDate.year && year) {

            if (doc.data().ID_ESTADOS == 4) {
                let list_Data = doc.data()
                list_Data['ID'] = doc.id
                datos.push(list_Data);

            } else if (doc.data().ID_ESTADOS == 6) {
                let list_Data = doc.data()
                list_Data['ID'] = doc.id
                llamado.push(list_Data);
            }

        }


    });
    return [datos, llamado];
}

export async function DatosBD_Turnos() {
    /**
     * Se guarda la fecha actual
     */
    const datos = [];

    const fecha = new Date()
    const currentDate = {
        year: fecha.getFullYear(),
        month: fecha.getMonth(),
        day: fecha.getDate()
    }

    /* Apuntamos a la coleccion */
    const turnosRef = collection(db, "TURNOS")
    /* Ordenamos la consulta */
    const q = query(turnosRef, orderBy("FECHAHORA", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        /* Obtenemos la fecha del turno */
        let docDate = ts_to_date(doc.data().FECHAHORA)
        let year = docDate.getFullYear()
        let month = docDate.getMonth()
        let day = docDate.getDate()

        if (currentDate.day == day &&
            currentDate.month && month &&
            currentDate.year && year) {


            let list_Data = doc.data()
            list_Data['ID'] = doc.id
            datos.push(list_Data);


        }


    });
    return datos
}

export async function BD_Turnos_Estadisticas(DATE_INICIO, DATE_FIN) {

    const datos = [
        {
            NOMBRE: "CM Atendidos",
            TOTAL: 0,
        },
        {
            NOMBRE: "CM Cancelados",
            TOTAL: 0
        },
        {
            NOMBRE: "TP Atendidos",
            TOTAL: 0,
        },
        {
            NOMBRE: "TP Cancelados",
            TOTAL: 0
        },
        {
            NOMBRE: "AI Atendidos",
            TOTAL: 0,
        },
        {
            NOMBRE: "AI Cancelados",
            TOTAL: 0
        },
        {
            NOMBRE: "CE Atendidos",
            TOTAL: 0,
        },
        {
            NOMBRE: "CE Cancelado",
            TOTAL: 0
        }
    ];


    /* Apuntamos a la coleccion */
    const turnosRef = collection(db, "TURNOS")
    /* Nos traemos los turnos con estados de 
        Cancelado -> 5
        Atendido -> 3
    */
    const q = query(turnosRef, where('ID_ESTADOS', 'in', [5, 3]));
    const querySnapshot = await getDocs(q);

    if (DATE_INICIO && DATE_FIN) {
        // /*Obtenemos la fecha de DATE_INICIO*/
        // let StartDate = ts_to_date(DATE_INICIO)
        // let start_year = StartDate.getFullYear()
        // let start_month = StartDate.getMonth()
        // let start_day = StartDate.getDate()

        // /*Obtenemos la fecha de DATE_FIN*/
        // let EndDate = ts_to_date(DATE_INICIO)
        // let end_year = EndDate.getFullYear()
        // let end_month = EndDate.getMonth()
        // let end_day = EndDate.getDate()



        querySnapshot.forEach((doc) => {
            //Almacena el ID_SERVICIO
            let id_s = doc.data().ID_SERVICIO
            //Almacena el ID_ESTADOS
            let id_e = doc.data().ID_ESTADOS

            // /* Obtenemos la fecha del turno */
            let docDate = ts_to_date(doc.data().FECHAHORA)
            // let doc_year = docDate.getFullYear()
            // let doc_month = docDate.getMonth()
            // let doc_day = docDate.getDate()

            if (DATE_INICIO <= docDate && docDate <= DATE_FIN) {
                if (id_s == 'CM') {
                    if (id_e == 3) {
                        datos[0].TOTAL += 1
                    }
                    if (id_e == 5) {
                        datos[1].TOTAL += 1
                    }
                } else if (id_s == 'TP') {
                    if (id_e == 3) {
                        datos[2].TOTAL += 1
                    }
                    if (id_e == 5) {
                        datos[3].TOTAL += 1
                    }
                } else if (id_s == 'AI') {
                    if (id_e == 3) {
                        datos[4].TOTAL += 1
                    }
                    if (id_e == 5) {
                        datos[5].TOTAL += 1
                    }
                } else if (id_s == 'CE') {
                    if (id_e == 3) {
                        datos[6].TOTAL += 1
                    }
                    if (id_e == 5) {
                        datos[7].TOTAL += 1
                    }
                }
            }

        });
    } else {

        querySnapshot.forEach((doc) => {
            //Almacena el ID_SERVICIO
            let id_s = doc.data().ID_SERVICIO
            //Almacena el ID_ESTADOS
            let id_e = doc.data().ID_ESTADOS

            if (id_s == 'CM') {
                if (id_e == 3) {
                    datos[0].TOTAL += 1
                }
                if (id_e == 5) {
                    datos[1].TOTAL += 1
                }
            } else if (id_s == 'TP') {
                if (id_e == 3) {
                    datos[2].TOTAL += 1
                }
                if (id_e == 5) {
                    datos[3].TOTAL += 1
                }
            } else if (id_s == 'AI') {
                if (id_e == 3) {
                    datos[4].TOTAL += 1
                }
                if (id_e == 5) {
                    datos[5].TOTAL += 1
                }
            } else if (id_s == 'CE') {
                if (id_e == 3) {
                    datos[6].TOTAL += 1
                }
                if (id_e == 5) {
                    datos[7].TOTAL += 1
                }
            }


        });
    }
    return datos
}

export async function BD_Turnos_Principal() {

    const datos = {
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0
    };

    const fecha = new Date()
    const currentDate = {
        year: fecha.getFullYear(),
        month: fecha.getMonth(),
        day: fecha.getDate()
    }

    /* Apuntamos a la coleccion */
    const turnosRef = collection(db, "TURNOS")
    const q = query(turnosRef, orderBy("FECHAHORA"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        /* Obtenemos la fecha del turno */
        let docDate = ts_to_date(doc.data().FECHAHORA)
        let year = docDate.getFullYear()
        let month = docDate.getMonth()
        let day = docDate.getDate()

        if (currentDate.day == day &&
            currentDate.month && month &&
            currentDate.year && year) {

            let hora = docDate.getHours()
            let minute = docDate.getMinutes()

            datos[hora] += 1

            //console.log(doc.data())
        }
    });
    return Object.values(datos)
}


export async function actualizarTurno(id, datos) {
    await updateDoc(doc(db, "TURNOS", id), {
        "ID_ESTADOS": datos
    });
}




//Este query obtiene los contadores de los servicios que estan almacenados en firebase
export async function getCounters() {
    const querySnapshot = await getDocs(collection(db, "CONTADOR"));
    const datos = [];
    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        //list_Data['ID'] = doc.id
        datos.push(list_Data);
    });
    return datos;
}

/**
 * 
 * @param {  } id 
 * @param {*} datos 
 */
export async function actualizarContadores(datos) {
    await setDoc(doc(db, "CONTADOR", "CONTADOR"), {
        "AI": datos.AI,
        "TP": datos.TP,
        "CM": datos.CM,
        "CE": datos.CE,
    });
}



