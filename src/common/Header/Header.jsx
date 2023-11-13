import React from 'react'
import './Header.css'
import { LinkButton } from '../LinkButton/LinkButton'

export const Header = () => {

    return (
        <div className='button-container'>
            <LinkButton
                className={"linkButtonDesign"}
                path={"/home"}
                title={"Home"}
            />
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
            <LinkButton
                className={"appointment-button"}
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
                title={" Appointments SS"}
            />
        </div>
    )
}