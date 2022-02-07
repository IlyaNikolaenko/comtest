import React, {useEffect, useState} from "react";

export const RegistrationForm = ({setFetchState, fetchState}) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [commentDirty, setCommentDirty] = useState(false);
    const [nameError, setNameError] = useState('Name cannot be empty');
    const [commentError, setCommentError] = useState('Comment cannot be empty');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (nameError || commentError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, commentError])

    const blurHandle = (e) => {
        switch (e.target.name){
            case "name": {
                setNameDirty(true);
                break;
            }
            case "comment": {
                setCommentDirty(true);
                break;
            }
            default: break;
        }
    }

    const handleInputName = (e) => {
        setName(e.target.value);
        const nameRegex = /^[a-zA-Z]+$/;
        if (e.target.value === "") {
            setNameError("Name cannot be empty")
        } else if(!nameRegex.test(String(e.target.value).toLowerCase())){
            setNameError("Your name is not valid. Only characters A-Z and a-z are acceptable.");
        } else {
            setNameError("")
        }
    }

    const handleInputComment = (e) => {
        setComment(e.target.value);
        const nameRegex = /^[a-z0-9.,]+$/;
        if (e.target.value === "") {
            setCommentError("Comment cannot be empty")
        } else if(!nameRegex.test(String(e.target.value).toLowerCase())){
            setCommentError("Your comment is not valid. Only characters A-Z, a-z and numbers are acceptable.");
        } else {
            setCommentError("")
        }
    }

    const handlePostClick = (e) => {
        e.preventDefault();
        fetch(`https://jordan.ashton.fashion/api/goods/30/comments`, {
            method: 'POST',
            body: JSON.stringify({name: name, text: comment}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => setFetchState(+fetchState + +data))
            .catch(error => console.log(error));
        setName('');
        setComment('');
    }

    return(
        <div className="container">
            <form className="row justify-content-end m-sm-5 p-3">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text"
                           name="name"
                           placeholder="Jack"
                           className="form-control"
                           value={name}
                           onBlur={blurHandle}
                           onChange={handleInputName}/>
                    {nameDirty && <div style={{color: "red"}}>{nameError}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="validationTextarea" className="form-label">Comments</label>
                    <textarea className="form-control"
                              name="comment"
                              value={comment}
                              onBlur={blurHandle}
                              onChange={handleInputComment}/>
                    {commentDirty && <div style={{color: "red"}}>{commentError}</div>}
                </div>
                <div className="col-auto">
                    <button disabled={!formValid} className="btn btn-primary" onClick={handlePostClick}>POST</button>
                </div>
            </form>
        </div>
    )
}