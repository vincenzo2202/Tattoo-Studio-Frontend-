import React, { useState, useEffect } from "react";
import "./GetAllUsers.css"
import { CardUser } from "../../common/CardUser/CardUser";
import { getAllUsers } from "../../services/apiCalls";


export const GetAllUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (users.length === 0) {
            const token = localStorage.getItem("token");
            getAllUsers(token)
                .then(user => {
                    // console.log(worker.data);
                    setUsers(user.data.data)
                })
                .catch(error => console.log(error))
        }
    }, [users])
    console.log(users);

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
                                } else if (users.role_id == 3){
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