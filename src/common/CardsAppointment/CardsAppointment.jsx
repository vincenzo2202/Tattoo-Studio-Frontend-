import React from "react";
import "./CardsAppointment.css" 

export const CardsAppointments = ({ nameProduct, imageProduct, categoryProduct, emailWorker, nameWorker, appointmentId, date, shift, price }) => {
    return (
        <div className="card-body" key={appointmentId}>
            <div className="nameProduct">{nameProduct}</div>
            <img className="photo" src={imageProduct} alt={nameProduct} />
            <div className="categoryProduct">{categoryProduct}</div>
            <div className="emailWorker">{emailWorker}</div>
            <div className="nameWorker">{nameWorker}</div>
            <div className="appointmentId">{appointmentId}</div>
            <div className="date">{date}</div>
            <div className="shift">{shift}</div> 
            <div className="price">{price}</div>
        </div>
    );
};