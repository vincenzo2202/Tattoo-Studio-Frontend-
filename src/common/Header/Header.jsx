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
        </div>
    )
}