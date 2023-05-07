import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, where, query } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";


export async function insertarConsulta(datos) {
    try {
        const newUsuario = await addDoc(collection(db, 'EXPEDIENTES'), {
            ID_PACIENTES: datos.ID_PACIENTE,
            ID_USUARIO: datos.ID_USUARIO,
            PESO: datos.PESO,
            ESTATURA: datos.ESTATURA,
            IMC: datos.IMC,
            FECHAHORA: datos.FECHAHORA,
            PRESION_SIAST: datos.PRESION_SIAST,
            PRESION_DIAST: datos.PRESION_DIAST,
            SINTOMAS: datos.SINTOMAS,
            DIAGNOSTICO: datos.DIAGNOSTICO,
            MEDICAMENTOS: datos.MEDICAMENTOS
        });
        return newUsuario.id
    } catch (error) {
        alert("OCURRIO UN ERROR - INSERTAR:"
            + "\n" + error)
    }
}


export async function get_Expendientes_Paciente(ID_PACIENTES) {
    const datos = []
    const querySnapshot = await getDocs(query(collection(db, 'EXPEDIENTES')));
    querySnapshot.forEach((doc) => {
        if (doc.data().ID_PACIENTES == ID_PACIENTES) {
            let list_Data = doc.data()
            list_Data['ID'] = doc.id
            datos.push(list_Data);
        }
    });
    return datos;
}
