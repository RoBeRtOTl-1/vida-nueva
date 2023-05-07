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



// export async function DatosBD_Turnos() {
//     const turnosRef = collection(db, "TURNOS");
//     const q = query(turnosRef, 
//         orderBy("FECHAHORA"),
//         where ('ID_ESTADOS', 'in', ['4','6']));
//     const querySnapshot = await getDocs(q);
//     const datos = [];

//     querySnapshot.forEach((doc) => {
//         let list_Data = doc.data()
//         list_Data['ID'] = doc.id
//         datos.push(list_Data);
//     });
//     console.log(datos)
//     return datos;
// }


// export async function DatosBD_Turnos() {
//     const turnosRef = collection(db, "TURNOS");
//     const q = query(turnosRef, 
//         where ('ID_ESTADOS', 'in', [4,6]),
//         orderBy("FECHAHORA"));
//     const querySnapshot = await getDocs(q);
//     const datos = [];

//     querySnapshot.forEach((doc) => {
//         let list_Data = doc.data()
//         list_Data['ID'] = doc.id
//         datos.push(list_Data);
//     });
//     return datos;
// }

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
    const querySnapshot = await getDocs(collection(db, "TURNOS"), orderBy("FECHAHORA"));
    const datos = [];
    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    });

    return datos;
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



