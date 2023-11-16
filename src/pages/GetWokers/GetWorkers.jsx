import React, { useState, useEffect } from "react";
import { getWorkers } from "../../services/apiCalls";
import { CardUser } from "../../common/CardUser/CardUser";
import "./GetWorkers.css" 
import { Pagination } from "../../common/Pagination/Pagination";

export const GetWorkers = () => {
    
    const [workers, setWorkers] = useState([]) 
    const [page, setPage] = useState(1)

    useEffect(() => {
        const pageString = page.toString()
            getWorkers(pageString)
                .then(worker => { 
                    if (Array.isArray(worker.data.data)) {
                    setWorkers(worker.data.data) 
                } else {
                    setPage(page - 1)
                }
                })
                .catch(error => console.log(error))
        
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
        <div className="workers-body">
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