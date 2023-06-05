import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, where, query } from "firebase/firestore";
import { DatoBD_Dom_Filtrado, insertarDom } from "../Domicilio/Dom_CRUD";


export async function insertarUSU(datos) {
    try {
        const newUsuario = await addDoc(collection(db, 'USUARIOS'), {
            NOMBRE: datos.NOMBRE,
            AP_MATERNO: datos.AP_MATERNO,
            AP_PATERNO: datos.AP_PATERNO,
            CEDULA: datos.CEDULA,
            CLAVE: datos.CLAVE,
            EMAIL: datos.EMAIL,
            ID_DOMICILIO: datos.ID_DOMICILIO,
            ID_ESPECIALIDAD: datos.ID_ESPECIALIDAD,
            ID_SEXO: datos.ID_SEXO,
            ID_TDU: datos.ID_TDU,
            NACIMIENTO: datos.NACIMIENTO,
            TELEFONO: datos.TELEFONO,
            ID_ESTADOS: 1
        });
        
        return newUsuario.id
    } catch (error) {
        alert("OCURRIO UN ERROR - INSERTAR:"
            + "\n" + error)
    }
}

// export async function DatoDeLaBD() {
//     const querySnapshot = await getDocs(collection(db, "USUARIOS"));
//     const datos = [];
//     querySnapshot.map(async (doc) => {
//         let list_Data = doc.data()
//         list_Data['ID'] = doc.id
//         const domi = await DatoBD_Dom_Filtrado(doc.data().ID_DOMICILIO)
//         Object.assign(list_Data, ...domi)
//         datos.push(list_Data);

//     });

//     return datos;
// }

export async function DatoDeLaBD() {
    const querySnapshot = await getDocs(collection(db, "USUARIOS"));
    const datos = await Promise.all(querySnapshot.docs.map(async (doc) => {
        let list_Data = doc.data();
        list_Data['ID'] = doc.id;
        const domi = await DatoBD_Dom_Filtrado(doc.data().ID_DOMICILIO);
        Object.assign(list_Data, ...domi);
        return list_Data;
    }));
    return datos;
}

export async function DatoDeLaBDFiltrado(ID_ESP) {
    const datos = []; 
    const q = query(collection(db, "USUARIOS"), where("ID_ESPECIALIDAD", "==", ID_ESP));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let list_Data = doc.data()
      list_Data['ID'] = doc.id
      datos.push(list_Data);
    });
    return datos;
  }
  


export async function actualizarUsuario(id, datos) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "USUARIOS", id), {
        NOMBRE: datos.NOMBRE,
        AP_MATERNO: datos.AP_MATERNO,
        AP_PATERNO: datos.AP_PATERNO,
        CEDULA: datos.CEDULA,
        CLAVE: datos.CLAVE,
        EMAIL: datos.EMAIL,
        ID_DOMICILIO: datos.ID_DOMICILIO,
        ID_ESPECIALIDAD: datos.ID_ESPECIALIDAD,
        ID_SEXO: datos.ID_SEXO,
        ID_TDU: datos.ID_TDU,
        NACIMIENTO: datos.NACIMIENTO,
        TELEFONO: datos.TELEFONO,
        ID_ESTADOS: parseInt(datos.ID_ESTADOS)
    });
    
}





