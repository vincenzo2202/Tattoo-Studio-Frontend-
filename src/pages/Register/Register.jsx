import React, { useState, useEffect } from "react";
import "./Register.css"
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
import { validator } from "../../services/Validations";
import { logUser, registerUser } from "../../services/apiCalls";

 
//Importo Rdx

import { useDispatch } from "react-redux";  //useDispatch es necesario para emitir acciones
import { login } from "../userSlice";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const Register = () => {

    const navigate = useNavigate(); 
    const rdxToken = useSelector(selectToken); 
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        full_name: "",
        email: "",
        password: "",
        phone_number: "",
        photo: ""
    });

    const [credentialsError, setCredentialsError] = useState({
        full_nameError: "",
        emailError: "",
        passwordError: "",
        phone_numberError: "",
        photoError: ""
    });

    useEffect(() => {
        if (rdxToken) {
            navigate("/");
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

    const photoInputDefault = (photo) => (photo === "" ? undefined : photo);

    const SignUp = () => {
        if (credentials.full_name != "" &&
            credentials.password != "" &&
            credentials.email != "" &&
            credentials.phone_number != "") {

            const credentialsWithNumber = {
                ...credentials,
                phone_number: parseInt(credentials.phone_number, 10),
                photo: photoInputDefault(credentials.photo)
            };
            registerUser(credentialsWithNumber)
                .then((response) => { 
                    const { message } = response.data;
                    setMessage(message);
                    
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };  

    useEffect(()=>{
        if (message == "user registered succesfully" ){
            console.log("hola");
            console.log(credentials);
            logUser(credentials)
                .then((response) => {
                    const { message, token } = response.data;
                    setMessage(message); 
                    if (message === "user logged succesfully") {
                        dispatch(login(token))
                        console.log("andrew savage ");
                        
                        setTimeout(() => {
                            navigate("/profile");
                        }, 300)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },[message])

    return (
        <div className="register-body">

            <div className="input-card">

                <CustomInput
                    design={"inputDesign"}
                    type={"name"}
                    name={"full_name"}
                    placeholder={"Full name"}
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
                    placeholder={"Password"}
                    functionProp={functionHandler}
                    functionBlur={errorCheck}
                />
                <div className='errorMsg'>{credentialsError.passwordError}</div>
                <CustomInput
                    design={"inputDesign"}
                    type={"number"}
                    name={"phone_number"}
                    placeholder={"Phone Number"}
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

                <div className='animated-button' onClick={SignUp}>Sign up</div>

                <p>{message}</p>
            </div>
        </div>
    )
}