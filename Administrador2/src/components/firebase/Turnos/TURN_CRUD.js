import { getCurrentDate } from "../Fechas/Fechas";
import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, query, where } from "firebase/firestore";

export async function insertarTurno(id) {
    const newTurno = await addDoc(collection(db, 'TURNOS'), {
        "ID_TURNO": `${id}-1`,
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

