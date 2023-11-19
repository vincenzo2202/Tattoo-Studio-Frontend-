import React, { useState, useEffect } from "react";
import "./GetAllUsers.css"
import { CardUser } from "../../common/CardUser/CardUser";
import { getAllUsers } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//Rdx
import { useSelector } from "react-redux";
import { selectToken } from "../userSlice";
import { Pagination } from "../../common/Pagination/Pagination";

export const GetAllUsers = () => {
    const navigate = useNavigate();
    const rdxToken = useSelector(selectToken);

    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (rdxToken) {
            const decoded = jwtDecode(rdxToken);
            if (decoded.role == "super_admin") {
                const pageString = page.toString()
                getAllUsers(rdxToken, pageString)
                    .then(user => {
                        if (Array.isArray(user.data.data)) {
                            setUsers(user.data.data)
                        } else {
                            setPage(page - 1)
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                navigate("/login");
            }
        } else {
            navigate("/");
        }
    }, [page])

    const up = () => {
        setPage(page + 1)
    }

    const down = () => {
        if (page >= 2) {
            setPage(page - 1)
        }
    }

    return (
        <div className="users-body">

            <div className="pagination-all-users">  
            <Pagination
                ClassPage={"previus"}
                text={"previus"}
                paginationChanger={() => down()}

            />
            <Pagination
                ClassPage={"next"}
                text={"next"}
                paginationChanger={() => up()}
            />
            </div>
            <div className="container-all-users">
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
        </div>
    )
}
