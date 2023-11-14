import React, { useState, useEffect } from "react";
import "./CreateAppointment.css"
import { Navigate, useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/Validations";
import { createAppointment } from "../../services/apiCalls";
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

    useEffect(() => {
        if (!rdxToken) {
            navigate("/login");
        }
    }, []);

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

    const Create = () => {
        if (appointment.date != "" &&
            appointment.shift != "" &&
            appointment.email != "" &&
            appointment.id != "") {

            const appointmentWithNumber = {
                ...appointment,
                id: parseInt(appointment.id, 10),
            };




            createAppointment(appointmentWithNumber, rdxToken)
                .then((response) => {
                    console.log(response.data);
                    const { message, error } = response.data;
                    setMessage(message);
                    if (error != "") {
                        setTimeout(() => {
                            navigate("/appointments");
                        }, 2000)
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        };

        return (
            <div className="appointment-body">

                <div className="input-card">


                    <CustomInput
                        design={"inputDesign"}
                        type={"date"}
                        name={"date"}
                        placeholder={"YYYY-MM-DD"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{appointmentError.dateError}</div>

                    <ShiftToggle
                        design={"inputDesign"}
                        selectedShift={appointment.shift}
                        onShiftChange={(value) =>
                            setAppointment((prevState) => ({ ...prevState, shift: value }))
                        }

                    />
                    <div className='errorMsg'>{appointmentError.dateError}</div>
                    <CustomInput
                        design={"inputDesign"}
                        type={"email"}
                        name={"email"}
                        placeholder={"user@gmail.com"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{appointmentError.emailError}</div>

                    <CustomInput
                        design={"inputDesign"}
                        type={"number"}
                        name={"id"}
                        placeholder={"55"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{appointmentError.idError}</div>

                    <div className='animated-button' onClick={Create}>Create</div>

                    <p>{message}</p>
                </div>
            </div>
        )
    }
}