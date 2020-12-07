import React from "react";
import useRequest from '../hooks/use-request'
import Router from "next/router";

const CardComponent = ({d, handleEdit, currentUser}) => {
    const {doRequest, errors} = useRequest({
        url: '/api/posts',
        method: 'delete',
        body: {
            id : d.id
        },
        onSuccess: () => {
            Router.push('/')
        }
    });
    const likeReq = useRequest({
        url: '/api/posts/liked',
        method: 'put',
        body: {
            id: d.id
        },
        onSuccess: () => {
            Router.push('/')
        }
    });
    const doReqLike = likeReq.doRequest
    const likeErr = likeReq.errors
    const handleClickEdit = () => {
        handleEdit(d)
    }
    const handleClickLike = () => {
        doReqLike()
    }
    const handleClickDelete = () => {
        doRequest()
    }
    return (
        <div key={d.id} className="item-container">
            <div className="item-card">
                <div className="item-card-body">
                    <div className="item-card-text">
                        <a href={d.link} target="_blank">
                            <h3>{d.title} | {d.likes} Likes </h3>
                        </a>
                        {errors}
                        {likeErr}
                        <p>{d.about}</p>
                    </div>
                    <div className={'item-card-body-button'}>
                        {currentUser && d.userId === currentUser.id &&
                        <button onClick={handleClickDelete}>Delete</button>}
                        {currentUser && d.userId === currentUser.id && <button onClick={handleClickEdit}>Edit</button>}
                        {currentUser && d.userId !== currentUser.id && <button onClick={handleClickLike}>Like</button>}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default CardComponent