import { get_Todas_Citas_BD } from "../Citas/CIT_CRUD";
import { DatoDeLaBDActivos } from "../Especialides/ESP_CRUD";
import { getCurrentDate, ts_to_date } from "../Fechas/Fechas";
import { db } from "../firebase"
import { collection, addDoc, getDocs, setDoc, doc, where, query, updateDoc, orderBy } from "firebase/firestore";
import { DatoDeLaBD as get_All_Usuarios } from "../../firebase/Ususarios/USU_CRUD";

/**
 * Inserta un nuevo turno en la coleccion TURNOS
 * Parametros, ID del servicio, y el contador del servicio
 */
export async function insertarTurno(id, count) {
    const newTurno = await addDoc(collection(db, 'TURNOS'), {
        "ID_TURNO": `${id}-${count}`,
        "ID_SERVICIO": id,
        "ID_ESTADOS": 4,
        "FECHAHORA": getCurrentDate(),

    });
    return newTurno.id
}



export async function datosNuevoTurno(id) {
    const datos = {};
    const querySnapshot = await getDocs(query(collection(db, "TURNOS")));
    querySnapshot.forEach((doc) => {
        if (doc.id == id) {
            datos["ID"] = doc.id;
            Object.assign(datos, doc.data())
        }
    });
    return datos;
}


export async function BD_Turnos_Actuales() {
    const datos = [];
    const llamado = []
    const fecha = new Date()
    const currentDate = {
        year: fecha.getFullYear(),
        month: fecha.getMonth(),
        day: fecha.getDate()
    }
    const turnosRef = collection(db, "TURNOS") //Apuntamos a la coleccion
    const q = query(turnosRef,
        where('ID_ESTADOS', 'in', [4, 6]),
        orderBy("FECHAHORA"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        let docDate = ts_to_date(doc.data().FECHAHORA)

        let year = docDate.getFullYear()
        let month = docDate.getMonth()
        let day = docDate.getDate()

        if (currentDate.day == day &&
            currentDate.month && month &&
            currentDate.year && year) {

            if (doc.data().ID_ESTADOS == 4) {
                let list_Data = doc.data()
                list_Data['ID'] = doc.id
                datos.push(list_Data);

            } else if (doc.data().ID_ESTADOS == 6) {
                let list_Data = doc.data()
                list_Data['ID'] = doc.id
                llamado.push(list_Data);
            }

        }


    });
    return [datos, llamado];
}

export async function DatosBD_Turnos() {
    /**
     * Se guarda la fecha actual
     */
    const datos = [];

    const fecha = new Date()
    const currentDate = {
        year: fecha.getFullYear(),
        month: fecha.getMonth(),
        day: fecha.getDate()
    }

    /* Apuntamos a la coleccion */
    const turnosRef = collection(db, "TURNOS")
    /* Ordenamos la consulta */
    const q = query(turnosRef, orderBy("FECHAHORA"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        /* Obtenemos la fecha del turno */
        let docDate = ts_to_date(doc.data().FECHAHORA)
        let year = docDate.getFullYear()
        let month = docDate.getMonth()
        let day = docDate.getDate()

        if (currentDate.day == day &&
            currentDate.month && month &&
            currentDate.year && year) {


            let list_Data = doc.data()
            list_Data['ID'] = doc.id
            datos.push(list_Data);


        }


    });
    return datos
}


//----------------------------------------------------------------------------------------------------------------------------------
//                                  Aqui empieza las estadisticas de citas
//----------------------------------------------------------------------------------------------------------------------------------

export async function EstadisticasCitas( ) {

    const especialidades = await DatoDeLaBDActivos()
    const allMedicos = await get_All_Usuarios()
    const allCitas = await get_Todas_Citas_BD()


    const new_Esp = new Map(especialidades.map((espe) => [espe.ID, espe.ESPECIALIDAD]))

    const allMedicos_2 = allMedicos.map((medico) => {
        const { ID_ESTADOS, ...medicoWithoutIDEstados } = medico;
        return medicoWithoutIDEstados;
    });


    const map_Medicos = new Map(
        allMedicos_2.map((medico) => [
            medico.ID,

            { ...medico, ID_ESPECIALIDAD: new_Esp.get(medico.ID_ESPECIALIDAD) },
        ])
    );


    const map_Citas = new Map(
        allCitas.map((cita) => [
            cita.ID,
            Object.assign(cita, map_Medicos.get(cita.ID_USUARIO))
            //{... cita, ID_USUARIO : map_Medicos.get( cita.ID_USUARIO)}
        ])
    );

    const map_Citas_2 = allCitas.map((medico) => {
        if (medico.ID_ESPECIALIDAD == 3) {
            return { ...medico, ID_ESPECIALIDAD: medico.ID_ESPECIALIDAD + " Atendidos" };
        } else if (medico.ID_ESTADOS == 5) {
            return { ...medico, ID_ESPECIALIDAD: medico.ID_ESPECIALIDAD + " Cancelados" };
        } else {
            return medico;
        }
    });


    let i = 0
    const index_Especialidades = new Map()




    // console.log(map_Citas_2)
    // console.log(index_Especialidades)

    const especialidadesTotales = new Map();

    map_Citas.forEach(medico => {
        const especialidad = medico.ID_ESPECIALIDAD;
        const estado = medico.ID_ESTADOS === 5 ? "Cancelados" : "Atendidos";
        const especialidadKey = `${especialidad} ${estado}`;

        if (especialidadesTotales.has(especialidadKey)) {
            const total = especialidadesTotales.get(especialidadKey);
            especialidadesTotales.set(especialidadKey, total + 1);
        } else {
            especialidadesTotales.set(especialidadKey, 1);
        }
    });


    const data = []

    const key = Array.from(especialidadesTotales.keys())
    
    key.map((espe) => {
        data.push(
            {
                NOMBRE: `${espe}`,
                TOTAL: `${especialidadesTotales.get(espe)}`
            }
        )
    })
    console.log(data)
    return data;

}