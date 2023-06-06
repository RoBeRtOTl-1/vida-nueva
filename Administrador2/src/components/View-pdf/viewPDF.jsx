import React, { useEffect, useState } from 'react';
import { Document, Page, Line, Text, Svg, Image, View, StyleSheet, PDFViewer } from '@react-pdf/renderer'
import TIPOS_DE_SANGRE from '../firebase/TiposSangre/TS_CRUD';
import { date_to_ts, formatearFechaHora } from '../firebase/Fechas/Fechas';
import { get_Unique_Pacientes_BD } from '../firebase/Pacientes/PAC_CRUD';
import { get_Expendientes_Paciente } from '../firebase/Consultas/CTAS_CRUD';

const Expediente = () => {
    const [propsData, setPropsData] = useState(null);
    const [dataPac, setDataPac] = useState(null);
    const [expediente, setExpediente] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [tiposSangre, setTiposSangre] = useState(new Map(TIPOS_DE_SANGRE().map(
        (tip) => [tip.ID, tip.TIPO_SANGRE]))
    );

    const obtenerDatos = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const propsString = queryParams.get('props');

        if (propsString) {
            const parsedProps = JSON.parse(decodeURIComponent(propsString));
            setPropsData(parsedProps);

            try {
                const dataPacientes = await get_Unique_Pacientes_BD(parsedProps.ID_PACIENTE);
                setDataPac(dataPacientes);
                const dataExpedientes = await get_Expendientes_Paciente(parsedProps.ID_PACIENTE)
                setExpediente(dataExpedientes);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false)
        }
    };

    useEffect(() => {
        obtenerDatos();
    }, []);

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
        <div>
            {isLoading ? (
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (

                <div>
                    <PDFViewer showToolbar={true} style={{ width: '100%', height: '100vh' }}>
                        <Document>
                            <Page size='A4' style={styles.body}>
                                <Text style={styles.author}>{formatearFechaHora(date_to_ts(new Date()))} </Text>
                                <Text style={styles.title}>
                                    <Image
                                        style={styles.image}
                                        src="src/css/img/asidebar/logo.png" />
                                    Vida Nueva Consultorio Médico
                                </Text>
                                <Text style={styles.author}>Expediente</Text>

                                <Svg height="1" width="525">
                                    <Line x1="0" y1="0" x2="525" y2="0"
                                        strokeWidth={1}
                                        stroke="rgb(0,0,0)" />
                                </Svg>


                                <Text style={styles.header} >Datos personales </Text>

                                {dataPac && <Text style={styles.text}>Nombre: {dataPac.NOMBRE} {dataPac.AP_PATERNO} {dataPac.AP_MATERNO}</Text>}
                                {dataPac && <Text style={styles.text} >Nacimiento: {formatearFechaHora(dataPac.NACIMIENTO)}</Text>}
                                {dataPac && <Text style={styles.text} >CURP: {dataPac.CURP}</Text>}
                                {dataPac && <Text style={styles.text} >Email: {dataPac.EMAIL}          Telefono: {dataPac.TELEFONO}</Text>}
                                {dataPac && <Text style={styles.text} >Alergias: {dataPac.ALERGIAS}</Text>}
                                {dataPac && <Text style={styles.text} >Tipo de sangre: {tiposSangre.get(dataPac.ID_TIP_SANGRE)}</Text>}

                            </Page>

                            {expediente && expediente.map((consulta) => {
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
                                        <Text style={styles.text} >Fecha de elaboracion:  {formatearFechaHora(consulta.FECHAHORA)}</Text>

                                        <Text style={styles.text} >Peso: {consulta.PESO} kg Estatura: {consulta.ESTATURA} cm  IMC {consulta.IMC}</Text>

                                        <Svg height="1" width="525">
                                            <Line x1="0" y1="0" x2="525" y2="0"
                                                strokeWidth={1}
                                                stroke="rgb(0,0,0)"
                                            />
                                        </Svg>
                                        <Text style={styles.text} > Presion diast: {consulta.PRESION_DIAST} Presion diast: {consulta.PRESION_SIAST}</Text>

                                        <Svg height="1" width="525">
                                            <Line x1="0" y1="0" x2="525" y2="0"
                                                strokeWidth={1}
                                                stroke="rgb(0,0,0)"
                                            />
                                        </Svg>
                                        <Text style={styles.text} >Sintomas: {consulta.SINTOMAS}</Text>
                                        
                                        <Text style={styles.text} >Diagnostico: {consulta.DIAGNOSTICO}</Text>
                                        <Text style={styles.text} >Medicamentos: {consulta.MEDICAMENTOS}</Text>

                                    </Page>
                                );
                            })}

                        </Document>
                    </PDFViewer>
                </div>
            )
            }

        </div>

    );
};

export default Expediente;


