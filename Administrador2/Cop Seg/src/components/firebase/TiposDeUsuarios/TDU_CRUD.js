import { db } from "../firebase"
import { collection, addDoc ,getDocs, setDoc, doc, query, where } from "firebase/firestore";

export function insertar(datos) {
    console.log(datos)
    try {
        const tiposDU = addDoc(collection(db, 'TIPO_DE_USUARIO'), {
            "NOMBRE": datos.nombre,
            "ID_ESTADOS": 1,
            "ADMINISTRACION": datos.admin,
            "RECEPCION": datos.recepcion,
            "TURNOS": datos.turnos,
            "MEDICOGENERAL": datos.medicoGral,
            "ESPECIALISTA": datos.especialista
        });
        alert("NUEVO ROL INSERTADO")
    } catch (error) {
        alert("OCURRIO UN ERROR - INSERTAR:"
            + "\n" + error)
    }
}

export async function DatoDeLaBD() {
    const querySnapshot = await getDocs(collection(db, "TIPO_DE_USUARIO"));
    const datos = [];
    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    });
    return datos;
}

export async function tdu_Activos() {
    const especRef = collection(db, "TIPO_DE_USUARIO");
    const q = query(especRef, where("ID_ESTADOS", "==", 1));
    
    const datos = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    });
    return datos;
}


export async function actualizarRol(id, datos) {
    console.log(datos)
    // Add a new document in collection "cities"
    await setDoc(doc(db, "TIPO_DE_USUARIO", id), {
        "NOMBRE": datos.nombre,
        "ID_ESTADOS": parseInt(datos.estado),
        "ADMINISTRACION": datos.admin,
        "RECEPCION": datos.recepcion,
        "TURNOS": datos.turnos,
        "MEDICOGENERAL": datos.medicoGral,
        "ESPECIALISTA": datos.especialista
    });
    alert("Rol actualizado")
}





