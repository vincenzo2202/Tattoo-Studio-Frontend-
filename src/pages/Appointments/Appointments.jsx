import React, { useState, useEffect } from "react";
import "./Appointments.css" 
import { CardsAppointments } from "../../common/CardsAppointment/CardsAppointment"; 
import { appointmentsUser } from "../../services/apiCalls";

export const Appointments = () => {
    const [appointment, setAppointments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            appointmentsUser(token)
                .then(response => {
                    console.log(appointment);
                    setAppointments(response.data.data)
                })
                .catch(error => console.log(error))
        }
    }, []);

    
    console.log(appointment);

    return (
        <div className="appointments-body">
            {
                appointment
                    ? (<div className='appointments-Roster'>
                        {
                            appointment.map(appointment => {
                                return (
                                    <CardsAppointments
                                        appointmentId={appointment.id}
                                        nameProduct={appointment.name}
                                        imageProduct={appointment.image}
                                        categoryProduct={appointment.category}
                                        emailWorker={appointment.email}
                                        nameWorker={appointment.full_name}
                                        date={appointment.date}
                                        shift={appointment.shift}
                                        price={appointment.price}
                                    />
                                )
                            }
                            )}
                    </div>
                    )
                    : (
                        <div>Loading</div>
                    )
            }
        </div>
    )
}