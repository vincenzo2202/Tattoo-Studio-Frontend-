import React, { useState, useEffect } from "react";
import "./Profile.css"
import { getProfile } from "../../services/apiCalls";

export const Profile = () => {
    const [user, setUser] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        photo: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);

        getProfile(token)
            .then((response) => {
                console.log(response.data);
                setUser(response.data.data);
            })
            .catch((error) => {
                console.log(error);

            });

    }, []);

 
    return (
        <div className="profile-body">
            {
                user
                    ? (
                        <div className="div-photo">
                            <img src={user.photo} alt="User" />
                            <h1>Welcome, {user.full_name}!</h1>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
        </div>
    );
 
};