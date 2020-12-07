import React from "react";
import useRequest from '../hooks/use-request'
import Router from "next/router";

const PersonalCardComponent = ({d, handleEdit, currentUser}) => {
    const {doRequest, errors} = useRequest({
        url: '/api/personal',
        method: 'delete',
        body: {
            id: d.id
        },
        onSuccess: () => {
            Router.push('/personal')
        }
    });
    const formatDate = (date) => {
        const x = new Date(date)
        let dd = x.getDate()
        let mm = x.getMonth()
        let yyyy = x.getFullYear()
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        const today = dd + '-' + mm + '-' + yyyy;
        return today
    }
    const doneReq = useRequest({
        url: '/api/personal/done',
        method: 'put',
        body: {
            id: d.id
        },
        onSuccess: () => {
            Router.push('/personal')
        }
    });
    const resetReq = useRequest({
        url: '/api/personal/reset',
        method: 'put',
        body: {
            id: d.id
        },
        onSuccess: () => {
            Router.push('/personal')
        }
    });
    console.log(d)
    const handleClickEdit = () => {
        handleEdit(d)
    }
    const handleClickDelete = () => {
        doRequest()
    }
    const handleDone = () => {
        doneReq.doRequest()
    }
    const handleReset = () => {
        resetReq.doRequest()
    }
    return (
        <div key={d.id} className="item-container">
            <div className="item-card">
                <div className="item-card-body">
                    <div className="item-card-text">
                        <a href={d.link} target="_blank">
                            <h3>{d.title}</h3>
                        </a>
                        {errors}
                        {doneReq.errors}
                        {resetReq.errors}
                        <p>{d.note}</p>
                        <p>Last done on : {formatDate(d.lastDone)}</p>
                        <p>Practice Again befor : {formatDate(d.nextDo)}</p>
                    </div>
                    <div className={'item-card-body-button'}>
                        <button onClick={handleDone}>Did Today</button>
                        <button style={{background : "#bfa13f"}} onClick={handleReset}>Reset</button>
                        <button style={{background : "#39cce5"}} onClick={handleClickEdit}>Edit</button>
                        <button style={{background : "#e54066"}} onClick={handleClickDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default PersonalCardComponent