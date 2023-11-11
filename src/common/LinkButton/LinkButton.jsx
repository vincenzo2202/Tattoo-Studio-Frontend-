
import './LinkButton.css'

import { useNavigate } from 'react-router-dom';

export const LinkButton = ({path, title, className}) => {

     const navigate = useNavigate();

     return (
         <div className={className} onClick={()=>navigate(path)}>
            {title}
         </div>
     )
}