import React, { useState, useEffect } from "react";
import { getWorkers } from "../../services/apiCalls";
import { CardUser } from "../../common/CardUser/CardUser";
import "./GetWorkers.css"

export const GetWorkers = () => {
    
    const [workers, setWorkers] = useState([])
    // ---------------------------------------
    // const [message, setMsgError] = useState([]) 
    // ---------------------------------------

    useEffect(() => {
        if (workers.length === 0) {
            getWorkers()
                .then(worker => {
                    // console.log(worker.data);
                    setWorkers(worker.data.data)
                    // ---------------------------------------
                    // esto es para que  no entre en bucle infinito
                    // if(results.data.data.length !== 0){
                    //     setPersonajes(results.data.data)
                    // } else {
                    //     setMsgError(results.data.message)
                    // }
                    // ---------------------------------------
                })
                .catch(error => console.log(error))
        }
    }, [workers])
    console.log(workers);

    return (
        <div className="workers-body">
            {
                workers.length > 0
                    ? (<div className='worker-Roster'>
                        {
                            workers.map(workers => {
                                return (
                                    <CardUser
                                        key={workers.id}
                                        photo={workers.photo}
                                        full_name={workers.full_name}
                                        phone_number={workers.phone_number}
                                        email={workers.email}
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