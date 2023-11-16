import './LinkDelete.css'

export const LinkDelete = ({ deleted }) => {

    return (
        <div className="delete" onClick={() => deleted()}>Remove</div>
    )
}