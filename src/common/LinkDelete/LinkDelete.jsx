
import './LinkDelete.css'

import { useNavigate } from 'react-router-dom';

export const LinkButton = ({path, className,emit}) => {

     const navigate = useNavigate();

     const superEmit = (argumento) =>{
        navigate(argumento)
        emit()
    }

     return (
         <div className={className} onClick={()=>superEmit(path)}> 
         </div>
     )
}