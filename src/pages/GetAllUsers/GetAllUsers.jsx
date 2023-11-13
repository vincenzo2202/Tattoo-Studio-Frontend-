import React, {useState, useEffect} from "react";
import "./GetAllUsers.css"
import { CardUser } from "../../common/CardUser/CardUser"; 
import { getAllUsers } from "../../services/apiCalls";


export const GetAllUsers = ()=>{
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
                                return (
                                    <CardUser
                                        key={users.id}
                                        photo={users.photo}
                                        full_name={users.full_name}
                                        phone_number={users.phone_number}
                                        email={users.email}
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