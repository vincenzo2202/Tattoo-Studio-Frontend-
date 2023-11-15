import React, { useState, useEffect } from "react";
import "./UpdateAppointment.css"
import { updateAppointment } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { validator } from "../../services/Validations";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import ShiftToggle from "../../common/ShiftToggle/ShiftToggle";

//Rdx
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

    const [stop , setStop] = useState(false)

    useEffect(() => {
        if (rdxToken && rdxIdtoUpdate) {
            if(stop == false){
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
        }
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
                    type={"number"}
                    name={"portfolioId"}
                    placeholder={"55"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.portfolioIdError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"email"}
                    name={"email"}
                    placeholder={"user@gmail.com"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{appointmentError.emailError}</div>



                <div className='animated-button' onClick={Update}>Update</div>

                <p>{message}</p>
            </div>
        </div>
    )
}