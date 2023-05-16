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

export async function get_Horario_Medico_BD(id){
    const datos = {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {}
    };

    const querySnapshot = await getDocs(collection(db, "HORARIOS"));
    querySnapshot.forEach((doc) => {
        if(doc.data().ID_USUARIO == id){
            datos[1] = getSlots(doc.data().LUNES) 
            datos[2] = getSlots(doc.data().MARTES) 
            datos[3] = getSlots(doc.data().MIERCOLES) 
            datos[4] = getSlots(doc.data().JUEVES) 
            datos[5] = getSlots(doc.data().VIERNES) 
        }
    });
    return datos;
}

/**
 * Devuelve al hora minima y maxima de entrada
 * Recive el horario delimitado por | 
 */
function getSlots(horario){
    if(horario){
        const intervalos = horario.split('|')
        const horas = intervalos.map( (inter) => {return inter.split('-');} ) 
        const min = horas[0][0]+':00'
        const max = horas[horas.length - 1  ][1]+':00'
        
        return {min, max}
    }else{
        return {
            min: "00:00:00",
            max: "00:00:00"
        }
    }
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
}


