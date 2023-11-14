import React, { useState, useEffect } from "react";
import "./Profile.css"
import { getProfile } from "../../services/apiCalls";
import { LinkButton } from "../../common/LinkButton/LinkButton";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";


export const Profile = () => {

    const rdxToken = useSelector(selectToken);

    const [user, setUser] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        photo: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);

        rdxToken
        if (rdxToken) {
            getProfile(rdxToken)
                .then((response) => {
                    console.log(response.data);
                    setUser(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div className="profile-body">
            {
                user
                    ? (
                        <div className="div-photo">
                            <img src={user.photo} alt="User" />
                            <h1>Hola, {user.full_name}!</h1>
                            <div>Name: {user.full_name}</div>
                            <div>Email: {user.email}</div>
                            <div>Phone: {user.phone_number}</div>
                            <div className="update-profile">
                                <LinkButton
                                    className={"class-button"}
                                    path={"/UpdateProfile"}
                                    title={"Update"}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}


        </div>
    );

};