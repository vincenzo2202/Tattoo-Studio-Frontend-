import React from "react";
import "./CustomInput.css"

export const CustomInput = ({design, type, name, placeholder, functionProp}) => {
    return (
        <input
            className={design}
            type={type}
            name={name}
            placeholder={placeholder} 
            onChange={(e) => functionProp(e)} 
        />
    )
}