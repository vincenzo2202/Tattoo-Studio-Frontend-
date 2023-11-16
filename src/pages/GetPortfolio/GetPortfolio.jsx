import React, { useState, useEffect } from "react";
import "./GetPortfolio.css"
import { getPortfolio } from "../../services/apiCalls"; 
import { CardPortfolio } from "../../common/CardPortfolio/CardPortfolio";

export const GetPortfolio = () => {

    const [portfolio, setportfolio] = useState([])
    const [stop, setStop] = useState(false)

    useEffect(() => {
        getPortfolio()
            .then(portfolio => {
                if (stop == false) {
                    setportfolio(portfolio.data.data)
                    setStop(true)
                }
            })
            .catch(error => console.log(error))

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
                                    <CardPortfolio
                                        key={portfolio.id}
                                        image={portfolio.image}
                                        name={portfolio.name}
                                        category={portfolio.category}
                                        price={portfolio.price + " €"}
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