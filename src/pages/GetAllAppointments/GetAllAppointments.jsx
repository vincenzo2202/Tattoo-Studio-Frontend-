import React, { useState, useEffect } from "react";
import "./GetAllAppointments.css"
import { getAllAppointment } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { CardsAppointments } from "../../common/CardsAppointment/CardsAppointment";

export const GetAllAppointments = () => {
    const [appointment, setAppointments] = useState([]);



    useEffect(() => {


        const token = localStorage.getItem("token");
        if (token) {
            getAllAppointment(token)
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

                                if (appointment.status) {
                                    appointment.status = "pending"
                                } else if (!appointment.status) {
                                    appointment.status = "done"
                                }

                                return (
                                    <CardsAppointments
                                        appointmentId={appointment.id}
                                        nameProduct={appointment.name}
                                        imageProduct={appointment.image}
                                        categoryProduct={appointment.category}
                                        emailWorker={appointment.worker_email}
                                        nameWorker={appointment.worker_name}
                                        date={appointment.date}
                                        shift={appointment.shift}
                                        price={appointment.price}
                                        client_email={appointment.user_email}
                                        client_name={appointment.user_name}
                                        status={appointment.status}
                                        emit={() => localStorageId(appointment.id)}
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