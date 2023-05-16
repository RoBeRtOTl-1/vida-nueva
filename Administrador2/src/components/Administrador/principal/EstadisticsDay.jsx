import React, { useEffect, useState } from "react";
import { Filler } from "chart.js";


import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

import { Line } from "react-chartjs-2";
import { BD_Turnos_Principal } from "../../firebase/Turnos/TURN_CRUD";
ChartJS.defaults.color = 'white';
ChartJS.register(Filler);

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

export default function BarChart() {

  const [turnos, setTurnos] = useState([])

  const obtenerTActuales = async () =>{
    await setTurnos( await BD_Turnos_Principal() )
  }
  useEffect(()=>{
    obtenerTActuales()
  }, [])

  const data = {
    labels: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    datasets: [
      {
        label: 'Turnos',
        data: turnos,
        backgroundColor: 'white',
        borderColor: 'white',
        pointBorderColor: 'white',
        tension: .15,
        color: "black",
        fill: {
          target: 'origin',
          above: 'rgba(255, 255, 255, 0.2)',   // Area will be red above the origin
          below: 'rgb(10,10,10)'    // And blue below the origin
        }
      }
    ]
  }
  

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: true
    },
    scales: {
      y: {
        display: false,
        beginAtZero: true
      },

    }
  }

  return (
    <div className="border mt-5 rounded-4  border-gray shadow-custom " style={{ width: '1150px', height: '300px', marginLeft: "50px", backgroundColor: "#0170C2", color: "white" }}>
      <Line
        data={data}
        options={options}
      ></Line>
    </div>
  );
}