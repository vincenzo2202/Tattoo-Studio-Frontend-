import React from "react";
import "./CardUser.css"

export const CardUser = ({full_name,photo,phone_number,email,key,is_active,role_id}) => {



    return (
        <div className="card-body" key={key}>
            <img className="photo" src={photo} alt={photo} />
            <div className="name">{full_name}</div>  
            <div className="email">{email}</div>
            <div className="phone">{phone_number}</div>
            <div className="is_active">{is_active}</div>
            <div className="role_id">{role_id}</div> 
        </div>
    )
}