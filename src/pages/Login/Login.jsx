import React, { useState, useEffect } from "react";
import "./Login.css"
import { CustomInput } from "../../common/CustomInput/CustomInput";

export const Login = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const functionHandler = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    // useEffect(() => {
    //     console.log(credentials);
    // }, [credentials]);

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

        </div>
    )
}