import React, { useState, useEffect } from "react";
import "./CardsAppointment.css"
import { LinkButton } from "../LinkButton/LinkButton";

export const CardsAppointments = ({ nameProduct, imageProduct, categoryProduct, emailWorker, nameWorker, appointmentId, date, shift, price, emit, client_name, client_email, status }) => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="card-appointment" key={appointmentId}>
            <div className="date-category">
                <div>Date: </div>
                <div className="date">{date}</div>
                <div>Shift: </div>
                <div className="shift">{shift}</div>
                <div>Category Product : </div>
                <div className="service"> {categoryProduct }</div>
                <div className="status"> {status }</div>
                <div className="client_name">{client_name } </div>
                <div className="client_email">{client_email } </div>
            </div>
            <button className="button-spoiler" onClick={toggleCollapse}>
                {collapsed ? "Details" : "Hide"}
            </button>
            {!collapsed && (
                <div className="card-appointment-right">
                    <div className="nameProduct">{nameProduct}</div>
                    <img className="photo" src={imageProduct} alt={nameProduct} />
                    <div className="priceProduct">{price} €</div>
                    <div className="tattoo-artist-card-container">
                        <div>Worker: </div>
                        <div className="worker"> {nameWorker}</div>
                    </div>
                    <div className="email"> {emailWorker}</div>
                    <LinkButton
                        classButton={"button-update-appointment"}
                        path={"/updateAppointment"}
                        title={<div className="button-update-appointment" >
                            <img src="https://cdn.icon-icons.com/icons2/1558/PNG/512/353430-checkbox-edit-pen-pencil_107516.png" alt="" />
                        </div>}
                        emit={() => emit()}
                    />
                </div>
            )}
        </div>
    );
};

