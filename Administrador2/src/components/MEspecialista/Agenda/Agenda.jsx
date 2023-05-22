import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { _, Grid } from 'gridjs-react';

import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

export default function Agenda() {
    //Usamos el useRef para apuntar al calendario
    const calendarRef = useRef(null);
    const [citasMedico, setCitasMedico] = ([{ // this object will be "parsed" into an Event Object
        title: 'The Title', // a property!
        start: '2023-05-21', // a property!
        end: '2023-05-21' // a property! ** see important note below about 'end' **
    }])

    useEffect(() => {

    }, []);


    return (

        <div className="rounded-4 pt-3 mt-4 border-gray shadow-custom" style={{ width: "111%", height: "630px" }} >
            <div className="container-fluid mt-4 d-flex justify-content-evenly" >
                <div className="col-12" >

                    <FullCalendar
                        height="70vh"

                        ref={calendarRef}

                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                            bootstrap5Plugin
                        ]}

                        headerToolbar={{
                            left: 'title',
                            center: "",
                            right: 'listDay,listWeek,listMonth'
                        }}


                        views={{
                            listDay: { buttonText: 'list day' },
                            listWeek: { buttonText: 'list week' },
                            listMonth: { buttonText: 'list month' }
                        }}

                        initialView="listDay" //Pone como defecto la vistaa por dia
                        
                        themeSystem= 'bootstrap5'
                        events={[
                            {
                                title: 'Meeting',
                                start: '2023-05-21T14:30:00',
                                extendedProps: {
                                    status: 'done'
                                },  
                                backgroundColor: 'green',
                                borderColor: 'green'
                            },
                            {
                                title: 'Birthday Party',
                                start: '2023-05-05T07:00:00',
                                backgroundColor: 'green',
                                borderColor: 'green'
                            }
                        ]}
                        locale={'es'}
                    />
                </div>
            </div>
        </div>

    );
}
