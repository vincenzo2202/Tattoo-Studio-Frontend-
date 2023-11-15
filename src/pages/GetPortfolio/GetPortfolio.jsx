import React, {useState, useEffect} from "react";
import "./GetPortfolio.css"
import { getPortfolio } from "../../services/apiCalls";
import { CardUser } from "../../common/CardUser/CardUser";

export const GetPortfolio = ()=>{
    
    const [portfolio, setportfolio] = useState([])

    useEffect(() => {
        if (portfolio.length === 0) {
            getPortfolio()
                .then(portfolio => {
                    // console.log(portfolio.data);
                    setportfolio(portfolio.data.data)
                })
                .catch(error => console.log(error))
        }
    }, [portfolio])
    console.log(portfolio);

    return (
        <div className="portfolio-body">
            {
                portfolio.length > 0
                    ? (<div className='portfolio-Roster'>
                        {
                            portfolio.map(portfolio => {
                                return (
                                    <CardUser
                                        key={portfolio.id}
                                        photo={portfolio.photo}
                                        full_name={portfolio.full_name}
                                        phone_number={portfolio.phone_number}
                                        email={portfolio.email}
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