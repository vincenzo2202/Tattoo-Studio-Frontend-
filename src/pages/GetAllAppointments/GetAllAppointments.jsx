import React, { useState, useEffect } from "react";
import "./GetAllAppointments.css"
import { getAllAppointment } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { CardsAppointments } from "../../common/CardsAppointment/CardsAppointment";
import { useNavigate } from "react-router-dom";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const GetAllAppointments = () => {


    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken);

    const [appointment, setAppointments] = useState([]);

    useEffect(() => { 
           
            if (rdxToken && appointment.length === 0) {
                getAllAppointment(rdxToken)
                    .then(response => {
                        console.log(appointment);
                        setAppointments(response.data.data)
                    })
                    .catch(error => console.log(error))
            } else {
                navigate("/login");
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