import React, { useState, useEffect } from "react";
import "./GetPortfolio.css"
import { getPortfolio } from "../../services/apiCalls"; 
import { CardPortfolio } from "../../common/CardPortfolio/CardPortfolio";
import { Pagination } from "../../common/Pagination/Pagination";
import { Rating } from "../../common/Rating/Rating";

export const GetPortfolio = () => {

    const [portfolio, setportfolio] = useState([])
    const [page, setPage] = useState(1)
    useEffect(() => {
        const pageString = page.toString()
        getPortfolio(pageString)
            .then(portfolio => {
                if(Array.isArray(portfolio.data.data)){
                    setportfolio(portfolio.data.data)
                    setStop(true)
                }else{
                    setPage(page-1)
                }  
            })
            .catch(error => console.log(error))

    }, [page])  

const up =()=>{
    setPage(page+1)
}

const down =()=>{
    if(page >= 2){
        setPage(page-1)
    }
}

    return (
        <div className="portfolio-body">
            <div className="pagination-portfolio"> 
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
            
            {
                portfolio.length > 0
                    ? (<div className='portfolio-Roster'>
                        {
                            portfolio.map(portfolio => {
                                return (
                                    <div className="inside-card"> 
                                    <CardPortfolio
                                        key={portfolio.id}
                                        image={portfolio.image}
                                        name={portfolio.name}
                                        category={portfolio.category}
                                        price={portfolio.price + " €"}
                                    /> 
                                    </div>
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