import React, {useEffect, useState} from "react";

import {CustomPagination} from "./CustomPagination";
import {Spinner} from "./Spinner";
import {Post} from "./Post";
import {LoadMore} from "./LoadMore";

export const PostsList = ({fetchState}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginate, setPaginate] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);


    useEffect(() => {
        setLoading(true);
        fetch(`https://jordan.ashton.fashion/api/goods/30/comments`)
            .then(response => response.json())
            .then(data => {
                console.log("Success componentDidMount");
                setPaginate(data.links);
                setPosts(data.data);
                setLoading(false);
                setLastPage(data.last_page);
                setTotalPosts(data.total);
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        if(fetchState) {
            fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${currentPage}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Success add comment");
                    setPaginate(data.links);
                    setPosts(data.data);
                    setLastPage(data.last_page);
                    setTotalPosts(data.total);
                })
                .catch(error => console.log(error));
            }
        },[fetchState, currentPage])

    return loading ? (<Spinner />) : (
        <div className='container'>
            Total posts {totalPosts}
            <ul className="list-group mb-3 mx-auto">
                {posts.map((item) => (
                    <Post item={item} key={item.id} />
                ))}
            </ul>
            <LoadMore currentPage={currentPage}
                      setPaginate={setPaginate}
                      setPosts={setPosts}
                      posts={posts}
                      lastPage={lastPage}
                      setLastPage={setLastPage}
                      setTotalPosts={setTotalPosts}
                      setCurrentPage={setCurrentPage}/>
            <CustomPagination currentPage={currentPage}
                              setPaginate={setPaginate}
                              setPosts={setPosts}
                              paginate={paginate}
                              lastPage={lastPage}
                              setLastPage={setLastPage}
                              setTotalPosts={setTotalPosts}
                              setCurrentPage={setCurrentPage}/>
        </div>
    )
}