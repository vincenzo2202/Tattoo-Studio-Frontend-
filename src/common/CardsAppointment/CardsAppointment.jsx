import React, { useState, useEffect } from "react";
import "./CardsAppointment.css"
import { LinkButton } from "../LinkButton/LinkButton";
import { LinkDelete } from "../LinkDelete/LinkDelete";

export const CardsAppointments = ({ nameProduct, imageProduct, categoryProduct, emailWorker, nameWorker, appointmentId, date, shift, price, emit, client_name, client_email, status, deleted }) => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="card-appointment" key={appointmentId}>

            <button className="button-spoiler" onClick={toggleCollapse}>
                {collapsed ? "Details" : "Hide"}
            </button>
            {!collapsed

                ? (
                    <div className="card-appointment-board">






                        <div className="left picture">
                            <div className="nameProduct">{nameProduct}</div>
                            <img className="photo" src={imageProduct} alt={nameProduct} />
                        </div>



                        <div className="center">
                            <div className="desc-col">Worker: </div>
                            <div className="nameWorker"> {nameWorker}</div>

                            <div className="desc-col">Price: </div>
 
                            <div className="priceProduct">{price} €</div>
                            <div className="desc-col">Email: </div>

                            <div className="email"> {emailWorker}</div>

                        </div>


                        <div className="right">

                            <div className="desc-col">Date: </div>
                            <div className="date">{date}</div>
                            <div className="desc-col">Shift: </div>
                            <div className="shift">{shift}</div>
                            <div className="desc-col">Category Product : </div>
                            <div className="service"> {categoryProduct}</div>
                            <div className="status"> {status}</div>
                            <div className="client_name">{client_name} </div>
                            <div className="client_email">{client_email} </div>
 
                        </div>



                        <div className="buttons-card-appointments">
                            <LinkButton
                                classButton={"button-update-appointment"}
                                path={"/updateAppointment"}
                                title={<div className="button-update-appointment" >
                                    <img src="https://cdn.icon-icons.com/icons2/1558/PNG/512/353430-checkbox-edit-pen-pencil_107516.png" alt="" />
                                </div>}
                                emit={() => emit()}
                            />
                            <LinkDelete
                                deleted={() => deleted()}
                            />
                        </div>
                    </div>
                )

                : (
                    <div className="date-category">
                        <div>Date: </div>
                        <div className="date">{date}</div>
                        <div>Shift: </div>
                        <div className="shift">{shift}</div>
                        <div>Category Product : </div>
                        <div className="service"> {categoryProduct}</div>
                        <div className="status"> {status}</div>
                        <div className="client_name">{client_name} </div>
                        <div className="client_email">{client_email} </div>
                    </div>
                )

            }
        </div>
    );
};

