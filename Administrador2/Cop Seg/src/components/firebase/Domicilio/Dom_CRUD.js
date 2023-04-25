import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, where, query } from "firebase/firestore";

export async function insertarDom(datos) {

    try {
        const domicilio = await addDoc(collection(db, 'DOMICILIOS'), {
            CALLE: datos.CALLE,
            CIUDAD: datos.CIUDAD,
            COD_POSTAL: datos.COD_POSTAL,
            COLONIA: datos.COLONIA,
            NUM_EXTERIOR: datos.NUM_EXTERIOR,
            NUM_INTERIOR: datos.NUM_INTERIOR
        });
        alert("NUEVA DOMICILIO INSERTADADO")
        return domicilio.id
    } catch (error) {
        alert("OCURRIO UN ERROR - INSERTAR:"
            + "\n" + error)
    }

}

export async function DatoDeLaBD() {
    const querySnapshot = await getDocs(collection(db, "DOMICILIOS"));
    const datos = [];
    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    });

    return datos;
}


export async function DatoBD_Dom_Filtrado(ID_DOMICILIO) {
    const datos = [];
    const querySnapshot = await getDocs(query(collection(db, "DOMICILIOS")));
    querySnapshot.forEach((doc) => {
        if(doc.id == ID_DOMICILIO){
            let list_Data = doc.data()
            list_Data['ID'] = doc.id
            datos.push(list_Data);
        }
    });
    return datos;
}


export async function actualizarEsp(id, datos) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "ESPECIALIDADES", id), {
        "ESPECIALIDAD": datos.nombre,
        "ID_ESTADOS": parseInt(datos.estado),
    });
    alert("ESPECIALIDADES ACTUALIZADA")
}





