import React from "react";
import "./CardPortfolio.css";

export const CardPortfolio = ({ image, name, category, price }) => {
    return (
        <div className="card-body">
            <img className="photo" src={image} alt={name} />
            <div className="name">{name}</div>
            <div className="category">{category}</div>
            <div className="price">{price}</div> 
        </div>
    );
};