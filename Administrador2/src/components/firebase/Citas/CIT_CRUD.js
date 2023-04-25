import { db } from "../firebase"
import { collection, addDoc ,getDocs, setDoc, doc} from "firebase/firestore";

export function insertar(datos) {
    console.log(datos)
    try {
        const tiposDU = addDoc(collection(db, 'ESPECIALIDADES'), {
            "ESPECIALIDAD": datos.nombre,
            "ID_ESTADOS": 1
        });
        alert("NUEVA ESPECLIALIDAD INSERTADA")
    } catch (error) {
        alert("OCURRIO UN ERROR - INSERTAR:"
            + "\n" + error)
    }
}

export async function DatoDeLaBD() {
    const querySnapshot = await getDocs(collection(db, "CITAS"));
    const datos = [];
    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    });
    return datos;
}


export async function actualizarCita(id, datos) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "ESPECIALIDADES", id), {
        "ESPECIALIDAD": datos.nombre,
        "ID_ESTADOS": parseInt(datos.estado),
    });
    alert("ESPECIALIDADES ACTUALIZADA")
}





