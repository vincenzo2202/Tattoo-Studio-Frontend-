import React, { useState, useEffect } from "react";
import "./Login.css"
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
import { logUser } from "../../services/apiCalls";

export const Login = () => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState(""); 

    const functionHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const logMe = () => {
        logUser(credentials)
            .then((response) => {
                console.log(response.data);
                const { message } = response.data;
                setMessage(message);
                // navigate("/profile");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="login-body">

            <CustomInput
                design={"inputDesign"}
                type={"email"}
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

            <div className='buttonSubmit' onClick={logMe}>Log in</div>

            {message && <p> {message}</p>} 
        </div>
    )
}