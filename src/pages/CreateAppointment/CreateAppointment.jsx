import "./CreateAppointment.css"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/validations";
import { createAppointment, getPortfolio, getWorkers } from "../../services/apiCalls";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";


export const CreateAppointment = () => {

    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken);

    const [appointment, setAppointment] = useState({
        date: "",
        shift: "",
        email: "",
        id: ""
    });
    const [appointmentError, setAppointmentError] = useState({
        dateError: "",
        shiftError: "",
        emailError: "",
        idError: ""
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!rdxToken) {
            navigate("/login");
        }
    }, []);

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

    const Create = () => {
        if (appointment.date != "" &&
            appointment.shift != "" &&
            appointment.email != "" &&
            appointment.id != "") {

            const appointmentWithNumber = {
                ...appointment,
                id: parseInt(appointment.id, 10),
            };

            console.log(rdxToken);
            createAppointment(appointmentWithNumber, rdxToken)
                .then((response) => {
                    console.log(response.data);
                    const { message, error } = response.data;
                    setMessage(message);
                    console.log(message);
                    if (message == "Appointment created successfully") {
                        setTimeout(() => {
                            navigate("/appointments");
                        }, 2000)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setMessage("All fields are required")
        }
    }

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
            <div className="input-card-create">
                <div className="title-create">Book Now</div>
                <div className="inputs-create-container">
                    <CustomInput
                        design={"create-date"}
                        type={"date"}
                        name={"date"}
                        placeholder={"YYYY-MM-DD"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{appointmentError.dateError}</div>

                    <ShiftToggle
                        design={"shift-create"}
                        selectedShift={appointment.shift}
                        onShiftChange={(value) =>
                            setAppointment((prevState) => ({ ...prevState, shift: value }))
                        }
                    />
                    <div className='errorMsg'>{appointmentError.dateError}</div>
                    <div className="worker-dropdown">
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
                    </div>
                    <div className="portfolio-dropdown"></div>
                    {
                        gallery.length > 0 &&
                        <select className="tattoos" name="id" onChange={functionHandler}>
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
                <div className='animated-button' onClick={Create}>Create</div>
                <p>{message}</p>
            </div>
        </div>
    )
}
