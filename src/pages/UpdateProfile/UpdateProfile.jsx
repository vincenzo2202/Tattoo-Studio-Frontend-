import React, { useState, useEffect } from "react";
import "./UpdateProfile.css"
import { useNavigate } from "react-router-dom";
import { validator } from "../../services/Validations";
import { updateUser } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";

export const UpdateProfile = () => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        full_name: "",
        password: "",
        phone_number: "",
        photo: ""
    });

    const [credentialsError, setCredentialsError] = useState({
        full_nameError: "",
        passwordError: "",
        phone_numberError: "",
        photoError: ""
    });

    const [message, setMessage] = useState("");

    const functionHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const errorCheck = (e) => {

        let error = "";
        error = validator(e.target.name, e.target.value);

        setCredentialsError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }));
    }

    const photoDefault = (photo) => (photo === "" ? undefined : photo);

    const update = () => {
        if (credentials.full_name != "" &&
            credentials.password != "" &&
            credentials.phone_number != "") {
            const credentialsWithNumber = {
                ...credentials,
                phone_number: parseInt(credentials.phone_number, 10),
                photo: photoDefault(credentials.photo)
            };
            const token = localStorage.getItem("token");
            updateUser(credentialsWithNumber, token)
                .then((response) => {
                    console.log(response.data);
                    const { message, error } = response.data;
                    setMessage(message);
                    if (!error) {
                        setTimeout(() => {
                            navigate("/profile");
                        }, 2500)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="register-body">

            <div className="input-card">

                <CustomInput
                    design={"inputDesign"}
                    type={"name"}
                    name={"full_name"}
                    placeholder={"David Ochando"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.full_nameError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"password"}
                    name={"password"}
                    placeholder={"Aa1234@"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.passwordError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"number"}
                    name={"phone_number"}
                    placeholder={"666666666"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.phone_numberError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"text"}
                    name={"photo"}
                    placeholder={"URL photo"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.photoError}</div>
                <div className='class-button' onClick={update}>Update</div>

                <p>{message}</p>
            </div>
        </div>
    )
}