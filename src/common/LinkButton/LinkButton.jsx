import './LinkButton.css'

import { useNavigate } from 'react-router-dom';

export const LinkButton = ({path, title, className,action}) => {

     const navigate = useNavigate();
     const superEmit = (argumento) =>{
        navigate(argumento)
        action()
    }
     return (
         <div className={className} onClick={()=>superEmit(path)}>
            {title}
         </div>
     )
}