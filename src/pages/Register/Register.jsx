import React, { useState, useEffect } from "react";
import "./Register.css"
import { CustomInput } from "../../common/CustomInput/CustomInput"; 
import { useNavigate } from "react-router-dom"; 
import { validator } from "../../services/Validations"; 
import { registerUser } from "../../services/apiCalls";

export const Register = () => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        full_name: "",
        email: "",
        password: "",
        phone_number: ""
    });

    const [credentialsError, setCredentialsError] = useState({
        full_nameError: "",
        emailError: "",
        passwordError: "",
        phone_numberError: ""
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

    const SignUp = () => {
        if (credentials.full_name != "" &&
            credentials.password != "" &&
            credentials.email != "" &&
            credentials.phone_number != "") {
            const credentialsWithNumber = {
                ...credentials,
                phone_number: parseInt(credentials.phone_number, 10)
            };
            registerUser(credentialsWithNumber)
                .then((response) => {
                    console.log(response.data);
                    const { message } = response.data;
                    setMessage(message);
                    setTimeout(()=>{ 
                        navigate("/login");
                    },2000)
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
                    type={"mail"}
                    name={"email"}
                    placeholder={"user@gmail.com"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.emailError}</div>
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

                <div className='buttonSubmit' onClick={SignUp}>Sign up</div>

                <p>{message}</p>
            </div>
        </div>
    )
}