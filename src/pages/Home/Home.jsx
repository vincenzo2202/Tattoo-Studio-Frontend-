import React, { useState, useEffect } from "react";
import "./Home.css"
import { LinkButton } from "../../common/LinkButton/LinkButton";

export const Home = () => {
    return (
        <div className="home-body">
            <div className="home-justify">
                <div className="logo"><img src="" alt="" /></div>
                <div className="title">Malcriada <br></br> Tattoo Studio</div>
                <LinkButton
                    className={"landing-button"}
                    path={"/createAppointment"}
                    title={"Book Now"}
                />

            </div>
        </div>
    )
}