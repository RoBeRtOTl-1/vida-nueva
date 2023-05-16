import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, where, query } from "firebase/firestore";
import { DatoBD_Dom_Filtrado, insertarDom } from "../Domicilio/Dom_CRUD";


export async function insertarPaciente(datos) {
    try {
        const newUsuario = await addDoc(collection(db, 'PACIENTES'), {
            NOMBRE: datos.NOMBRE,
            AP_MATERNO: datos.AP_MATERNO,
            AP_PATERNO: datos.AP_PATERNO,
            ID_TIP_SANGRE: datos.ID_TIP_SANGRE,
            TELEFONO: datos.TELEFONO,
            CURP: datos.CURP,
            ID_SEXO: datos.ID_SEXO,
            NACIMIENTO: datos.NACIMIENTO,
            EMAIL: datos.EMAIL,
            ALERGIAS: datos.ALERGIAS,
            ID_DOMICILIO: datos.ID_DOMICILIO,
            ID_ESTADOS: 1
        });
        return newUsuario.id
    } catch (error) {
        alert("OCURRIO UN ERROR - INSERTAR:"
            + "\n" + error)
    }
}

export async function get_Pacientes_BD() {
    const querySnapshot = await getDocs(collection(db, "PACIENTES"));
    const datos = [];
    querySnapshot.forEach(async (doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);

    });
    return datos;
}

export async function get_Pacientes_Filtrado_BD(curp) {
    const datos = []
    const pacientesRef = collection(db, "PACIENTES");
    const q = query(pacientesRef, where('CURP', '==', curp));
    const querySnapshot = await getDocs(q);


    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    })

    const domi = await DatoBD_Dom_Filtrado(datos[0].ID_DOMICILIO);
    datos.push(domi[0])
    return datos;
    // const querySnapshot = await getDocs(collection(db, "PACIENTES"));
    // const datos = await Promise.all(querySnapshot.docs.map(async (doc) => {
    //     if(doc.data().CURP = curp){
    //         let list_Data = doc.data();
    //         list_Data['ID'] = doc.id;
    //         const domi = await DatoBD_Dom_Filtrado(doc.data().ID_DOMICILIO);
    //         Object.assign(list_Data, ...domi);
    //         return list_Data;
    //     }
    // }));
}
