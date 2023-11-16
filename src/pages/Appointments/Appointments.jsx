import React, { useState, useEffect } from "react";
import "./Appointments.css"
import { CardsAppointments } from "../../common/CardsAppointment/CardsAppointment";
import { appointmentsUsers, deleteAppointment } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";

//Rdx
import { useSelector, } from "react-redux";
import { selectToken } from "../userSlice";

import { useDispatch } from "react-redux";
import { idToUpdate } from "../appointmentSlice";

export const Appointments = () => {
    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken);
    const dispatch = useDispatch();


    const [appointment, setAppointments] = useState([]); 
    const [stop, setStop] = useState(false)
    useEffect(() => {

        if (rdxToken) {
            appointmentsUsers(rdxToken)
            
                .then(response => {
                    if (stop == false) {
                        setAppointments(response.data.data)  
                        setStop(true)
                    } 
                })
                .catch(error => console.log(error))
        } else {
            navigate("/login");
        }

    }, [appointment]); 

    const rdxIdToUpdate = (id) => {
        dispatch(idToUpdate(id))
    }

    const removeAppointment = ( token,id) => {
        deleteAppointment(token,id)
            .then(response => {
                console.log(response);
                setAppointments(prevAppointments => prevAppointments.filter(app => app.id !== id));
            })
            .catch(error => console.log(error));
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
                                        emit={() => rdxIdToUpdate(appointment.id)}
                                        deleted={() => removeAppointment(rdxToken, appointment.id)}
                                    />
                                )
                            })
                        }


                    </div>
                    )
                    : (
                        <div>Loading...</div>
                    )
            }
        </div>
    )
}