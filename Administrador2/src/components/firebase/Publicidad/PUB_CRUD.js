import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, query, where } from "firebase/firestore";

export function insertarPublicidad(datos) {
    console.log(datos)
    try {
        const newPublicidad = addDoc(collection(db, 'PUBLICIDAD'), {
            "NOMBRE": datos.NOMBRE,
            "DESCRIPCION": datos.DESCRIPCION,
            "TIEMPO": datos.TIEMPO,
            "FECHA_TERMINACION": datos.FECHA_TERMINACION,
            "ID_ESTADOS": 8,
            "URL": datos.URL
        });
        alert("NUEVO PUBLICIDAD INSERTADO")
    } catch (error) {
        alert("OCURRIO UN ERROR - INSERTAR:"
            + "\n" + error)
    }
}

export async function get_BD_Publicidad() {
    const querySnapshot = await getDocs(collection(db, "PUBLICIDAD"));
    const datos = [];
    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    });
    return datos;
}

// export async function tdu_Activos() {
//     const especRef = collection(db, "TIPO_DE_USUARIO");
//     const q = query(especRef, where("ID_ESTADOS", "==", 1));

//     const datos = [];
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         let list_Data = doc.data()
//         list_Data['ID'] = doc.id
//         datos.push(list_Data);
//     });
//     return datos;
// }

// export async function tdu_Filtrado(ID_TDU) {
//     const datos = [];
//     const querySnapshot = await getDocs(query(collection(db, "TIPO_DE_USUARIO")));
//     querySnapshot.forEach((doc) => {
//         if (doc.id == ID_TDU) {
//             datos.push(doc.data())
//             datos.push({"ID_TDU":doc.id})
//             //Object.assign(datos, doc.data(), {"ID_TDU": doc.id})
//         }
//     });
//     return datos;
// }


// export async function actualizarRol(id, datos) {
//     // Add a new document in collection "cities"
//     await setDoc(doc(db, "TIPO_DE_USUARIO", id), {
//         "NOMBRE": datos.nombre,
//         "ID_ESTADOS": parseInt(datos.estado),
//         "ADMINISTRACION": datos.admin,
//         "RECEPCION": datos.recepcion,
//         "TURNOS": datos.turnos,
//         "MEDICOGENERAL": datos.medicoGral,
//         "ESPECIALISTA": datos.especialista
//     });
//     alert("Rol actualizado")
// }





