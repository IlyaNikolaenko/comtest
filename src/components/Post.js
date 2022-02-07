import React from "react";

export const Post = ({item}) => {
    return (
        <li className="list-group-item">
            <div className="ms-2 me-auto text-break">
                <div className="fw-bold">{item.name}</div>
                {item.text}
            </div>
        </li>
    )
}