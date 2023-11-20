import './LinkButton.css'

import { useNavigate } from 'react-router-dom';

export const LinkButton = ({path, title, className,emit}) => {

     const navigate = useNavigate();
     const superEmit = (argumento) =>{
        navigate(argumento)
        emit()
    }
     return (
         <div className={className} onClick={()=>superEmit(path)}>
            {title}
         </div>
     )
}