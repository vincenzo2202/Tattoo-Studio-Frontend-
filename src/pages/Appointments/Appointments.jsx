import React, { useState, useEffect } from "react";
import "./Appointments.css"
import { CardsAppointments } from "../../common/CardsAppointment/CardsAppointment";
import { appointmentsUser } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";

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

    const localStorageId = (argumento) => {
        localStorage.setItem("appointmentId", argumento)
    }

    return (
        <div className="appointments-body">
            {
                appointment
                    ? (<div className='appointments-Roster'>

                        <div className='create-appointment-button'>
                            <LinkButton
                                path={"/createAppointment"}
                                title={"Create"}
                            />
                        </div>
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
                                        emit={()=>localStorageId(appointment.id)}
                                    />
                                )
                            })
                        }


                    </div>
                    )
                    : (
                        <div>Loading</div>
                    )
            }
        </div>
    )
}