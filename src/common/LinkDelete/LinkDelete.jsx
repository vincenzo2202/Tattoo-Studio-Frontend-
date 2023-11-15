import './RemoveButton.css'

export const LinkDelete = ({ emit }) => {

    return (
        <div className="delete" onClick={() => emit(path)}>Remove</div>
    )
}