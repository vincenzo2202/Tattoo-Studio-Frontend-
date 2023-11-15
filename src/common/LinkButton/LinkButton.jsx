
import './LinkButton.css' 

export const LinkButton = ({emit}) => { 
 
     return (
         <div className={className} onClick={()=>emit()}>Delete</div>
     )
}