import './Pagination.css'

export const Pagination = ({ClassPage, text, paginationChanger }) => {

    return (
        <div className={ClassPage} onClick={() => paginationChanger()}  >
            {text}
            </div>
    )
}