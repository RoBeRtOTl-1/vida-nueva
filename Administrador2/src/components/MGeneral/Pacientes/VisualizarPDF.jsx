import { Document, Page, Line, Text, Svg, Image, View, StyleSheet } from '@react-pdf/renderer'
import TIPOS_DE_SANGRE from '../../firebase/TiposSangre/TS_CRUD';
import { useState } from 'react';
import { formatearFechaHora } from '../../firebase/Fechas/Fechas';

export default function VisualizarPDF({ DATOS_PACIENTE, MEDICOS ,DATA }) {
    const [tiposSangre, setTiposSangre] = useState(new Map(TIPOS_DE_SANGRE().map(
        (tip) => [tip.ID, tip.TIPO_SANGRE]))
    );

    const styles = {
        body: {
            paddingTop: 35,
            paddingBottom: 0,
            paddingHorizontal: 35
        },
        title: {
            fontSize: 24,
            textAlign: 'center',
        },
        author: {
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 15,
        },
        subtitle: {
            fontSize: 18,
            margin: 12,

        },
        text: {
            margin: 12,
            fontSize: 14,
            textAlign: 'justify'
        },
        image: {
            marginVertical: 50,
            marginHorizontal: 50,
            paddingHorizontal: 50,
            width: 50,
            height: 50
        },
        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: 'center',
            color: 'grey',
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },
    }

    return (
        <Document>
            {console.log(DATOS_PACIENTE)}
            {console.log('------------------')}
            {console.log(DATA)}
            <Page size='A4' style={styles.body}>

                <Text style={styles.author}>Martes 25 de mayo del 2023 <br /> 15:23</Text>
                <Text style={styles.title}>
                    <Image
                        style={styles.image}
                        src="src/css/img/asidebar/logo.png"
                    />Vida Nueva Consultorio Médico
                </Text>
                <Text style={styles.author}>Expediente</Text>

                <Svg height="1" width="525">
                    <Line x1="0" y1="0" x2="525" y2="0"
                        strokeWidth={1}
                        stroke="rgb(0,0,0)"
                    />
                </Svg>

                {/**
                 * Aqui van los datos personal del paciente
                 */}
                <Text style={styles.header} >Datos personales </Text>

                <Text style={styles.text} >Nombre: {DATOS_PACIENTE.NOMBRE + ' ' + DATOS_PACIENTE.AP_PATERNO + ' ' + DATOS_PACIENTE.AP_MATERNO} </Text>
                <Text style={styles.text} >Fecha de nacimiento: 15/10/2002</Text>
                <Text style={styles.text} >CURP: {DATOS_PACIENTE.CURP}</Text>
                <Text style={styles.text} >Email: {DATOS_PACIENTE.EMAIL}           Telefono: {DATOS_PACIENTE.TELEFONO}</Text>
                <Text style={styles.text} >Alergias: {DATOS_PACIENTE.ALERGIAS} </Text>
                <Text style={styles.text} >Tipo de sangre: {tiposSangre.get(DATOS_PACIENTE.ID_TIP_SANGRE)}</Text>


            </Page>


            {DATA.map((dato) => {
                return (
                    <Page size='A4' style={styles.body}>
                        <Text style={styles.author}>Martes 25 de mayo del 2023 <br /> 15:23</Text>
                        <Text style={styles.title}>
                            <Image
                                style={styles.image}
                                src="src/css/img/asidebar/logo.png"
                            />Vida Nueva Consultorio Médico
                        </Text>
                        <Text style={styles.author}>Expediente</Text>

                        <Svg height="1" width="525">
                            <Line x1="0" y1="0" x2="525" y2="0"
                                strokeWidth={1}
                                stroke="rgb(0,0,0)"
                            />
                        </Svg>
                        

                        {/* <Text style={styles.text} >Medico: {MEDICO} </Text> */}
                        <Text style={styles.text} >Fecha de elaboracion:  {formatearFechaHora(dato.FECHAHORA)}</Text>
                        <Text style={styles.text} >Medico: {MEDICOS.get(dato.ID_USUARIO)}</Text>

                        <Text style={styles.text} >Peso: {dato.PESO} kg Estatura: {dato.ESTATURA} cm  IMC {dato.IMC}</Text>

                        <Text style={styles.text} > Presion diast: {dato.PRESION_DIAST} Presion diast: {dato.PRESION_SIAST}</Text>

                        <Text style={styles.text} >Sintomas: {dato.SINTOMAS}</Text>
                        <Text style={styles.text} >Diagnostico: {dato.DIAGNOSTICO}</Text>
                        <Text style={styles.text} >Medicamentos: {dato.MEDICAMENTOS}</Text>
                        
                    </Page>
                );
            })}

        </Document>

    );

}

