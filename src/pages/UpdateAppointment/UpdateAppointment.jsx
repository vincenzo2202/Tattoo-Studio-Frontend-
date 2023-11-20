import React, { useState, useEffect } from "react";
import "./UpdateAppointment.css"
import { getPortfolio, getWorkers, updateAppointment } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { validator } from "../../services/Validations";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";

import { useSelector } from "react-redux";
import { selectIdToUpdate } from "../appointmentSlice";
import { selectToken } from "../userSlice";

export const UpdateAppointment = () => {
    const rdxIdtoUpdate = useSelector(selectIdToUpdate)
    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken);

    const [appointment, setAppointment] = useState({
        id: "",
        date: "",
        shift: "",
        email: "",
        portfolioId: "",
    });

    const [appointmentError, setAppointmentError] = useState({
        idError: "",
        dateError: "",
        shiftError: "",
        emailError: "",
        portfolioIdError: "",
    });

    const [stop, setStop] = useState(false)

    useEffect(() => {
        console.log("aqui");
        if (rdxToken && rdxIdtoUpdate) {
            if (stop == false) {
                setAppointment((prevState) => ({ ...prevState, id: rdxIdtoUpdate }));
                setStop(true)
            }
        } else {
            navigate("/login");
        }
    }, [])

    const [message, setMessage] = useState("");

    const functionHandler = (e) => {
        setAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {
        let error = "";
        error = validator(e.target.name, e.target.value);
        setAppointmentError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const Update = () => {
        if (appointment.date != "" &&
            appointment.shift != "" &&
            appointment.email != "" &&
            appointment.portfolioId != "" &&
            appointment.id != "") {

            const appointmentWithNumber = {
                ...appointment,
                id: parseInt(appointment.id, 10),
                portfolioId: parseInt(appointment.portfolioId, 10)
            };

            updateAppointment(appointmentWithNumber, rdxToken)
                .then((response) => {
                    const { message } = response.data;
                    setMessage(message);
                    console.log(message);
                    if (message == "appointment created succesfully") {
                        setTimeout(() => {
                            navigate("/appointments");
                        }, 2000)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }else {
            setMessage("All fields are required")
        }
    };

    const [workers, setWorkers] = useState([]);
    const [gallery, setgallery] = useState("");

    useEffect(() => {
        if (workers.length === 0) {
            getWorkers()
                .then(
                    results => {
                        setWorkers(results.data.data)
                    }
                )
                .catch(error => console.log(error))
        } else {
            console.log("artists vale...", workers)
        }
    }, [workers]);

    useEffect(() => {
        if (gallery.length === 0) {
            getPortfolio()
                .then(
                    response => {
                        setgallery(response.data.data)
                    }
                )
                .catch(error => console.log(error))
        } else {
            console.log(gallery)
        }
    }, [gallery]);

    return (
        <div className="appointment-body">
            <div className="input-card-update-appointment">
                <div className="title-update">Update Appointment</div>
                <div className="inputs-update-appointment-container"> 
                <CustomInput
                    design={"date-appointment"}
                    type={"date"}
                    name={"date"}
                    placeholder={"YYYY-MM-DD"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.dateError}</div>
                <ShiftToggle
                    design={"shift-appointment"}
                    selectedShift={appointment.shift}
                    onShiftChange={(value) =>
                        setAppointment((prevState) => ({ ...prevState, shift: value }))
                    }
                />
                <div className='errorMsg'>{appointmentError.dateError}</div>
                {
                    workers.length > 0 &&
                    <select className="dropdown" name="email" onChange={functionHandler}>
                        <option>Select a worker</option>
                        {
                            workers.map(
                                worker => {
                                    return (
                                        <option key={worker.id} value={worker.email}>{worker.full_name}</option>
                                    )
                                }
                            )
                        }
                    </select>
                }
                {
                    gallery.length > 0 &&

                    <select className="tattoos" name="portfolioId" onChange={functionHandler}>
                        <option>Select a service</option>
                        {
                            gallery.map(
                                service => {
                                    return (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    )
                                } 
                            )
                        }
                    </select>
                } 
                </div>
                <div className='animated-button' onClick={Update}>Update</div>
                <p>{message}</p>
            </div>
        </div>
    )
}