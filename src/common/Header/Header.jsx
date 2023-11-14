import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'
import { Navigate } from 'react-router-dom';

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout, selectToken } from "../../pages/userSlice";

export const Header = () => {

    const dispatch = useDispatch();
    const rdxToken = useSelector(selectToken);


    const logOutMe = () => {
        dispatch(logout())
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

            {
                rdxToken
                    ? (
                        <>

                            <LinkButton
                                className={"linkButtonDesign"}
                                path={"/profile"}
                                title={"Profile"}
                            />

                            <LinkButton
                                className={"linkButtonDesign"}
                                path={"/appointments"}
                                title={"Appointments"}
                            />

                            <div className='linkButtonDesign' onClick={logOutMe}>
                                <LinkButton
                                    classButton={"linkButtonDesign"}
                                    path={"/"}
                                    title={"log out"}
                                />
                            </div>
                        </>
                    ) :
                    (
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
                    )
            }
            {
                rdxToken
                    ? (
                        <>
                            <LinkButton
                                className={"linkButtonDesign"}
                                path={"/getAllUsers"}
                                title={"All Users"}
                            />
                            <LinkButton
                                className={"linkButtonDesign"}
                                path={"/getAllAppointments"}
                                title={"GetAllAppointments"}
                            />
                        </>
                    )
                    : (<></>)
            }


        </div >
    );
};


