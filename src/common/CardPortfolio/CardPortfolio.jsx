import React from "react";
import "./CardPortfolio.css";
import { Rating } from "@mantine/core";

export const CardPortfolio = ({ id,image, name, category, price }) => {
    return (
        <div className="card-portfolio " dragable="false">

            <img className="portfolio " src={image} alt={name} />

            <div className="desc-portfolio " key={id}>
                <div className="name ">{name}</div>
                <div className="category">{category}</div>
                <div className="price">{price}</div>
            </div>
 
        </div>
    );
};



