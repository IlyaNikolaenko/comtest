import React from "react";

export const LoadMore = ({currentPage,
                             setPaginate,
                             setPosts,
                             posts,
                             lastPage,
                             setLastPage,
                             setTotalPosts,
                             setCurrentPage}) => {

    const handleClick = () => {
        fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${+currentPage + 1}`)
            .then(response => response.json())
            .then(data => {
                console.log("Success load more posts");
                setPaginate(data.links);
                setPosts([...posts, ...data.data]);
                setCurrentPage(+currentPage + 1);
                setLastPage(data.last_page);
                setTotalPosts(data.total);
            })
            .catch(error => console.log(error));
    }

    return (+lastPage === +currentPage) || (
        <div className="d-grid gap-2 col-6 mx-auto my-2">
            <button type="button" onClick={handleClick} className="btn btn-outline-dark">Load more ...</button>
        </div>
    )
}