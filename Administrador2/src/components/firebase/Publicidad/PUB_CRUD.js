import { date_to_ts, ts_to_date } from "../Fechas/Fechas";
import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, query, where, updateDoc, and } from "firebase/firestore";

export async function  insertarPublicidad(datos) {
    console.log(datos)
    try {
        const newPublicidad = await addDoc(collection(db, 'PUBLICIDAD'), {
            "NOMBRE": datos.NOMBRE,
            "DESCRIPCION": datos.DESCRIPCION,
            "TIEMPO": datos.TIEMPO,
            "FECHA_TERMINACION": datos.FECHA_TERMINACION,
            "ID_ESTADOS": 8,
            "URL": datos.URL
        });

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

export async function get_BD_Publicidad_Activos() {
    const querySnapshot = await getDocs(collection(db, "PUBLICIDAD"));
    const datos = [];
    querySnapshot.forEach((doc) => {
        if (doc.data().ID_ESTADOS != 5){
            let list_Data = doc.data()
            list_Data['ID'] = doc.id
            datos.push(list_Data);
        }
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


export async function actualizarPublicidad(id, datos, estado) {
    // Add a new document in collection "cities"
    await updateDoc(doc(db, "PUBLICIDAD", id), {
        "NOMBRE": datos.NOMBRE,
        "DESCRIPCION": datos.DESCRIPCION,
        "TIEMPO": datos.TIEMPO,
        "FECHA_TERMINACION": datos.FECHA_TERMINACION,
        "ID_ESTADOS": 8,
    });
}



export async function vencerPublicidad(datos) {
    const currentDate =  new Date();
    const c_year = currentDate.getFullYear()
    const c_mes = currentDate.getMonth();
    const    c_dia = currentDate.getDate()

    datos.forEach( async (publicidad) => {
        let p_date = ts_to_date(publicidad.FECHA_TERMINACION)
        let p_year = p_date.getFullYear()
        let p_mes = p_date.getMonth()
        let p_dia = p_date.getDate()

        
        if (!(p_year >= c_year && p_mes >= c_mes &&p_dia >= c_dia)){
            await actualizarEstados(publicidad.ID, 5)
        }else{
            await actualizarEstados(publicidad.ID, 8)
        }
    })
}
export async function actualizarEstados(id, estado) {
    // Add a new document in collection "cities"
    await updateDoc(doc(db, "PUBLICIDAD", id), {
        "ID_ESTADOS": estado,
    });
}




