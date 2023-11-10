import React, { useState, useEffect } from "react";
import "./Register.css"
import { CustomInput } from "../../common/CustomInput/CustomInput";

export const Register = () => {
    const [credentials, setCredentials] = useState({
        full_name: "",
         email: "",
         password: "",
         phone_number: 0
       });

    const [message, setMessage] = useState("");

    const functionHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const SignUp = () => {
        logUser(credentials)
            .then((response) => {
                console.log(response.data);
                const { message } = response.data;
                setMessage(message);
                navigate("/login");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="register-body">

<div className="input-card">

            <CustomInput
                design={"inputDesign"}
                type={"full-name"}
                name={"full-name"}
                placeholder={"David Ochando"}
                functionProp={functionHandler}
            />
            <CustomInput
                design={"inputDesign"}
                type={"mail"}
                name={"email"}
                placeholder={"user@gmail.com"}
                functionProp={functionHandler}
            />
            <CustomInput
                design={"inputDesign"}
                type={"password"}
                name={"password"}
                placeholder={"Aa1234@"}
                functionProp={functionHandler}
            />
            <CustomInput
                design={"inputDesign"}
                type={"Phone"}
                name={"Phone"}
                placeholder={"666666666"}
                functionProp={functionHandler}
            />
           

            <div className='buttonSubmit' onClick={SignUp}>Sign up</div>

            {message && <p> {message}</p>}
        </div>
        </div>
    )
}