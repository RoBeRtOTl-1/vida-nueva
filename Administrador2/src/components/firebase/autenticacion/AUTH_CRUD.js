import { tdu_Filtrado } from "../TiposDeUsuarios/TDU_CRUD";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function IniciarSesion(EMAIL, CLAVE) {

    const especRef = collection(db, "USUARIOS");
    const q = query(especRef, where("EMAIL", "==", EMAIL), where("CLAVE", "==", CLAVE));
    const querySnapshot = await getDocs(q);
    const datos = await Promise.all(querySnapshot.docs.map(async (doc) => {
        let list_Data = {}
        const permisos = await tdu_Filtrado(doc.data().ID_TDU);
        Object.assign(list_Data, ...permisos, {"ID_USUARIO":doc.id});
        return list_Data;
    }));
    return datos[0];

}




