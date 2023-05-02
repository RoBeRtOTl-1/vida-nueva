import { getCurrentDate } from "../Fechas/Fechas";
import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, query, where } from "firebase/firestore";


/**
 * Inserta un nuevo turno en la coleccion TURNOS
 * Parametros, ID del servicio, y el contador del servicio
 */
export async function insertarTurno(id, count) {
    const newTurno = await addDoc(collection(db, 'TURNOS'), {
        "ID_TURNO": `${id}-${count}`,
        "ID_SERVICIO": id,
        "ID_ESTADOS": 1,
        "FECHAHORA": getCurrentDate(),
        
    });
    return newTurno.id
}



export async function datosNuevoTurno(id) {
    const datos = {};
    const querySnapshot = await getDocs(query(collection(db, "TURNOS"), where("ID_ESTADOS", "==", 1)));
    querySnapshot.forEach((doc) => {
        if (doc.id == id) {
            datos["ID"]= doc.id;
            Object.assign(datos, doc.data())
        }
    });
    return datos;
}



export async function DatosBD_Turnos() {
    const querySnapshot = await getDocs(collection(db, "TURNOS"));
    const datos = [];
    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    });
    
    return datos;
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
        "AI":datos.AI,
        "TP": datos.TP,
        "CM": datos.CM,
        "CE": datos.CE,
    });
}



