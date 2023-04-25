import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, where, query } from "firebase/firestore";

export async function insertarHorario(ID) {
    try {
        const domicilio = await addDoc(collection(db, 'HORARIOS'), {
            ID_USUARIO: ID,
            LUNES: "",
            MARTES: "",
            MIERCOLES: "",
            JUEVES: "",
            VIERNES: ""
        });
        alert("NUEVA HORARIO INSERTADADO")
    } catch (error) {
        alert("OCURRIO UN ERROR - INSERTAR:"
            + "\n" + error)
    }

}

export async function DatosBD_Horarios() {
    const querySnapshot = await getDocs(collection(db, "HORARIOS"));
    const datos = [];
    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    });
    return datos;
}




export async function actualizarHorario(id, datos) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "HORARIOS", id), {
        LUNES: datos.LUNES,
        MARTES: datos.MARTES,
        MIERCOLES: datos.MIERCOLES,
        JUEVES: datos.JUEVES,
        VIERNES: datos.VIERNES
    }, {merge: true});
    alert("HORARIO ACTUALIZADO")
}


