import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { Navigate } from 'react-router-dom';

export const Header = () => {

    const dispatch = useDispatch();

    const rdxCredentials = useSelector(userData);

    const logOutMe = () => {

        dispatch(logout({ credentials: "" }))

        Navigate("/")

    }

    return (
        <div className='button-container'>
            <LinkButton
                className={"linkButtonDesign"}
                path={"/home"}
                title={"Home"}
            />

            <LinkButton
                className={"linkButtonDesign"}
                path={"/workers"}
                title={"Workers"}
            />
            <LinkButton
                className={"linkButtonDesign"}
                path={"/portfolio"}
                title={"Portfolio"}
            />

           
                    <>

                        <LinkButton
                            className={"linkButtonDesign"}
                            path={"/login"}
                            title={"Login"}
                        />
                        <LinkButton
                            className={"linkButtonDesign"}
                            path={"/register"}
                            title={"Register"}
                        />
                    </>
                    <>
                       
                        <LinkButton
                            className={"linkButtonDesign"}
                            path={"/appointments"}
                            title={"Appointments"}
                        />
                        <LinkButton
                            className={"linkButtonDesign"}
                            path={"/getAllUsers"}
                            title={"All Users"}
                        />
                        <LinkButton
                            className={"appointment-button"}
                            path={"/getAllAppointments"}
                            title={rdxCredentials.credentials.firstName}
                        />
                        <div className="linkButtonDesign" onClick={logOutMe}>
                            <LinkButton path={"/"} title={"log out"} />
                        </div>
                    </>
               
        </div>
    );
};
