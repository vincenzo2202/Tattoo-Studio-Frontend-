import React, { useState, useEffect } from "react";
import "./GetAllAppointments.css"
import { getAllAppointment } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";
import { CardsAppointments } from "../../common/CardsAppointment/CardsAppointment";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { useDispatch } from "react-redux";
import { idToUpdate } from "../appointmentSlice";
import { Pagination } from "../../common/Pagination/Pagination";


export const GetAllAppointments = () => {
    const rdxToken = useSelector(selectToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [appointments, setAppointments] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (rdxToken) {
            const decoded = jwtDecode(rdxToken);
            if (decoded.role == "super_admin") {
                const pageString = page.toString()
                getAllAppointment(rdxToken, pageString)
                    .then(
                        response => {
                            if (Array.isArray(response.data.data)) {
                                setAppointments(response.data.data);
                            } else {
                                setPage(page - 1)
                            }
                        })
                    .catch(error => console.log(error));
            } else {
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [page]);

    const rdxIdToUpdate = (id) => {
        dispatch(idToUpdate(id))
    }

    const up = () => {
        setPage(page + 1)
    }

    const down = () => {
        if (page >= 2) {
            setPage(page - 1)
        }
    }

    return (
        <div className="getAllAppointments-body">
            <div className="pagination-appointments">
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
            {
                appointments.length > 0
                    ? (<div className='appointments-Roster'>

                        <div className='create-appointment-admin-button'>
                            <LinkButton
                                path={"/createAppointment"}
                                title={"Create"}
                            />
                        </div>
                        {
                            appointments.map(appointment => {

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
                                        client_name={appointment.username}
                                        status={appointment.status}
                                        emit={() => rdxIdToUpdate(appointment.id)}
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