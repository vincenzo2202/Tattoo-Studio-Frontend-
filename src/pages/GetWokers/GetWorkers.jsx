import React, { useState, useEffect } from "react";
import { getWorkers } from "../../services/apiCalls";
import { CardUser } from "../../common/CardUser/CardUser";
import "./GetWorkers.css"

export const GetWorkers = () => {
    
    const [workers, setWorkers] = useState([]) 
    const [stop , setStop] = useState(false)

    useEffect(() => {
     
            getWorkers()
                .then(worker => { 
                    if (stop == false) {
                    setWorkers(worker.data.data) 
                    setStop(true)
                }
                })
                .catch(error => console.log(error))
        
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