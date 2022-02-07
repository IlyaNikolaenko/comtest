import React from "react";

export const CustomPagination = ({setPosts,
                                     setPaginate,
                                     setCurrentPage,
                                     paginate,
                                     lastPage,
                                     setLastPage,
                                     currentPage}) => {

    const checkSymbol = (el) => {
        if(el === `&laquo; Previous`) return <>&laquo;</>
        else if (el === `Next &raquo;`) return <>&raquo;</>;
        else return el;
    }

    const checkButton = (event) => {
        if (event.target.textContent === '«') return +currentPage - 1;
        else if (event.target.textContent === '»') return +currentPage + 1;
        else if (event.target.textContent === "...") return currentPage;
        else return event.target.textContent;
    }

    const handleClick = (event) => {
        if (!(checkButton(event) === (+lastPage + 1) || checkButton(event) === 0)) {
            fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${checkButton(event)}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Success move pages");
                    setPaginate(data.links);
                    setPosts(data.data);
                    setCurrentPage(checkButton(event));
                    setLastPage(data.last_page);
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <nav>
            <ul className="pagination pagination-sm justify-content-center">
                {paginate.map((item, index) => (
                    <li key={index} className={`page-item ${item.active && "active"}`} >
                        <div onClick={handleClick} className="page-link">{checkSymbol(item.label)}</div>
                    </li>
                ))}
            </ul>
        </nav>
    )
}