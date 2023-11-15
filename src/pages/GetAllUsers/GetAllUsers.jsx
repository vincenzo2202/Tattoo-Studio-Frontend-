import React, { useState, useEffect } from "react";
import "./GetAllUsers.css"
import { CardUser } from "../../common/CardUser/CardUser";
import { getAllUsers } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";

export const GetAllUsers = () => {
    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken);

    const [users, setUsers] = useState([])

    useEffect(() => {
        if (rdxToken) {
            const decoded = jwtDecode(rdxToken);
            if (decoded.role == "super_admin") {
                getAllUsers(rdxToken)
                    .then(user => {
                        if (users.length == 0) {
                            setUsers(user.data.data)
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                navigate("/login");
            }
        } else {
            navigate("/");
        }
    }, [users])

    return (
        <div className="users-body">
            {
                users.length > 0 
                    ? (<div className='users-Roster'>
                        {
                            users.map(users => {
                                if (users.is_active == true) {
                                    users.is_active = "Active"
                                } else if (users.is_active == false) {
                                    users.is_active = "Not Active"
                                }

                                if (users.role_id == 1) {
                                    users.role_id = "usuario"
                                } else if (users.role_id == 2) {
                                    users.role_id = "Tatuador"
                                } else if (users.role_id == 3) {
                                    users.role_id = "Super Admin"
                                }

                                return (
                                    <CardUser
                                        key={users.id}
                                        photo={users.photo}
                                        full_name={users.full_name}
                                        phone_number={users.phone_number}
                                        email={users.email}
                                        role_id={users.role_id}
                                        is_active={users.is_active}


                                    />
                                )
                            }
                            )}
                    </div>
                    )
                    : (
                        <div>Loading</div>
                    )
            }
        </div>
    )
}
