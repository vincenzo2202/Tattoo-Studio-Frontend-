import React, { useState, useEffect } from "react";
import "./UpdateProfile.css"
import { useNavigate } from "react-router-dom";
import { validator } from "../../services/Validations";
import { updateUser } from "../../services/apiCalls";
import { CustomInput } from "../../common/CustomInput/CustomInput";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const UpdateProfile = () => {

    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken);


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

    useEffect(() => {
        if (!rdxToken) {
            navigate("/login");
        }
    }, []);

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
            updateUser(credentialsWithNumber, rdxToken)
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

            <div className="input-card-update ">
                <div className="title-update">Update Profile</div>
                <div className="inputs-update-container">
                    <CustomInput
                        design={"update-email"}
                        type={"name"}
                        name={"full_name"}
                        placeholder={"Full Name"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{credentialsError.full_nameError}</div>
                    <CustomInput
                        design={"update-password"}
                        type={"password"}
                        name={"password"}
                        placeholder={"Password"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{credentialsError.passwordError}</div>
                    <CustomInput
                        design={"update-number"}
                        type={"number"}
                        name={"phone_number"}
                        placeholder={"Phone Number"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{credentialsError.phone_numberError}</div>
                    <CustomInput
                        design={"url-avatar"}
                        type={"text"}
                        name={"photo"}
                        placeholder={"URL photo"}
                        functionProp={functionHandler}
                        functionBlur={errorCheck}
                    />
                    <div className='errorMsg'>{credentialsError.photoError}</div>
                </div>
                <div className='animated-button' onClick={update}>Update</div>

                <p>{message}</p>
            </div>
        </div>
    )
}