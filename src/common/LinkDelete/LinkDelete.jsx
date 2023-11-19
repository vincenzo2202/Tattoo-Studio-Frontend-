import './LinkDelete.css'

export const LinkDelete = ({ deleted, title }) => {
    return (
        <div onClick={() => deleted()}>{title}</div>
    )
}