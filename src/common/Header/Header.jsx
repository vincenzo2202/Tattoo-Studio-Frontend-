import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'
import { Navigate } from 'react-router-dom';

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout, selectToken } from "../../pages/userSlice";

export const Header = () => {
    const dispatch = useDispatch();
    const rdxToken = useSelector(selectToken);
    const [decodedToken, setDecodedToken] = useState(null);
    const [tokenExpired, setTokenExpired] = useState(false);

    useEffect(() => {
        try {
            const decoded = jwtDecode(rdxToken);
            setDecodedToken(decoded);
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }, [rdxToken]);

    const logOutMe = () => {
        dispatch(logout())
        Navigate("/")
    }
 
return (
    <div className='button-container'>
        <LinkButton
            className={"header-button"}
            path={"/home"}
            title={"Home"}
        />
        <LinkButton
            className={"header-button"}
            path={"/workers"}
            title={"Workers"}
        />
        <LinkButton
            className={"header-button"}
            path={"/portfolio"}
            title={"Portfolio"}
        />
        {
            rdxToken && tokenExpired == false
                ? (
                    <>
                        <LinkButton
                            className={"header-button"}
                            path={"/profile"}
                            title={"Profile"}
                        />
                        <LinkButton
                            className={"header-button"}
                            path={"/appointments"}
                            title={"Appointments"}
                        />
                        <div className='header-button' onClick={logOutMe}>
                            <LinkButton
                                classButton={"linkButtonDesign"}
                                path={"/login"}
                                title={"log out"}
                            />
                        </div>

                        {decodedToken && decodedToken.role === "super_admin" &&
                            (
                                <>
                                    <LinkButton
                                        className={"header-button"}
                                        path={"/getAllUsers"}
                                        title={"All Users"}
                                    />
                                    <LinkButton
                                        className={"header-button"}
                                        path={"/getAllAppointments"}
                                        title={"GetAllAppointments"}
                                    />
                                </>
                            )}
                    </>
                ) :
                (
                    <>
                        <LinkButton
                            className={"header-button"}
                            path={"/login"}
                            title={"Login"}
                        />
                        <LinkButton
                            className={"header-button"}
                            path={"/register"}
                            title={"Register"}
                        />
                    </>
                )
        }
    </div >
);
};


