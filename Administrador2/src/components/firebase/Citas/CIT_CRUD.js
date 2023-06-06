
import { ts_to_date } from "../Fechas/Fechas";
import { get_Pacientes_BD } from "../Pacientes/PAC_CRUD";
import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, where, query, updateDoc, orderBy } from "firebase/firestore";

/**
 * Inserta una cita en firebase con 
 */
export async function insertarCita(datos) {

    try {
        const tiposDU = await addDoc(collection(db, 'CITAS'), {
            'ID_PACIENTES': datos.ID_PACIENTE,
            'ID_USUARIO': datos.ID_USUARIO,
            'ID_ESTADOS': 7,
            'DATEINICIO': datos.DATEINICIO,
            'DATEFIN': datos.DATEFIN

        });
        return tiposDU.id
    } catch (error) {
        alert("OCURRIO UN ERROR - INSERTAR:"
            + "\n" + error)
    }
}

export async function get_Citas_BD() {
    const datos = [];
    const citasRef = collection(db, "CITAS")
    const q = query(citasRef, where('ID_ESTADOS', 'in', [5, 3, 7]))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    });
    return datos;
}

export async function get_Todas_Citas_BD() {
    const datos = [];
    const citasRef = collection(db, "CITAS")
    const q = query(citasRef, where('ID_ESTADOS', 'in', [5, 3]))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        let list_Data = doc.data()
        list_Data['ID'] = doc.id
        datos.push(list_Data);
    });
    return datos;
}

export async function get_Cita_Especifica_BD(id) {
    const datos = {};
    const citasRef = collection(db, "CITAS")
    const q = query(citasRef, where('ID_ESTADOS', 'in', [5, 3, 7]))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        if (doc.id == id) {
            let list_Data = doc.data()
            list_Data['ID'] = doc.id
            Object.assign(datos, list_Data)
        }
    });
    console.log(datos)
    return datos;
}

/**
 * Recibe el ID_USUARIO (MEDICO)
 * Retorna todas las citas pendientes del medico
 */
export async function get_Citas_Filtradas_BD(ID_USUARIO) {
    const pacientes = new Map((await get_Pacientes_BD()).map(pac => [pac.ID, pac.NOMBRE + ' ' + pac.AP_PATERNO + ' ' + pac.AP_MATERNO]))

    console.log(pacientes)

    const datos = []
    const turnosRef = collection(db, "CITAS") //Apuntamos a la coleccion
    const q = query(turnosRef,
        where('ID_ESTADOS', '==', 7));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

        /**
         * Filtra los documentos con, aceptando solo los que tienen un docuemento
         * pendiente, y ademas que pertezcan al medico deseado
         */
        if (doc.data().ID_ESTADOS == 7 && doc.data().ID_USUARIO == ID_USUARIO) {
            let list_Data = doc.data()

            let cita = {
                id: doc.id,
                title: pacientes.get(doc.data().ID_PACIENTES),
                start: ts_to_date(list_Data.DATEINICIO),
                end: ts_to_date(list_Data.DATEFIN),
                data: doc.data()
            }
            datos.push(cita);
        }

    });
    return datos;
}


export async function actualizarCita(id, estado) {
    await updateDoc(doc(db, "CITAS", id), {
        "ID_ESTADOS": parseInt(estado),
    });
}

