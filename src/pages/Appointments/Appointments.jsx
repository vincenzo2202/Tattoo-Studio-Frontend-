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
import { Pagination } from "../../common/Pagination/Pagination";

export const Appointments = () => {
    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken);
    const dispatch = useDispatch();


    const [appointment, setAppointments] = useState([]);
    const [page, setPage] = useState(1)

    useEffect(() => {

        if (rdxToken) {
            const pageString = page.toString()
            appointmentsUsers(rdxToken, pageString)
                .then(response => {
                    if (  response.data.data.length !=0 ) {
                        setAppointments(response.data.data)
                    } else {
                        setPage(page - 1)
                    }
                })
                .catch(error => console.log(error))
        } else {
            navigate("/login");
        }

    }, [page]);

    const rdxIdToUpdate = (id) => {
        dispatch(idToUpdate(id))
    }

    const removeAppointment = (token, id) => {
        deleteAppointment(token, id)
            .then(response => {
                console.log(response);
                setAppointments(prevAppointments => prevAppointments.filter(app => app.id !== id));
            })
            .catch(error => console.log(error));
    }

    const up = () => { 
            setPage(page + 1)
            console.log(page);
    }

    const down = () => {
        if (page >= 2) {
            setPage(page - 1)
            console.log(page);
        }
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
                <Pagination
                ClassPage={"previus"}
                text={"previus"}
                paginationChanger={() => down()}

            />
            <Pagination
                ClassPage={"next"}
                text={"next"}
                paginationChanger={() => up()}
            />
        </div>
    )
}