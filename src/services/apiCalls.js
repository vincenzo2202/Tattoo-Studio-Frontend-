import axios from "axios";

export const logUser = async (body) => {

    console.log(body);
 
    return await axios.post(`http://localhost:5173/api/user/login`, body);
 
  
 

}