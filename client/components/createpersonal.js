import React, {useState} from "react";
import useRequest from '../hooks/use-request'
import Router from "next/router";

const CreatePersonalComponent = (props) => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [note, setNote] = useState('');
    const {doRequest, errors} = useRequest({
        url: '/api/personal',
        method: 'post',
        body: {
            title,
            link,
            note
        },
        onSuccess: () => {
            setNote('')
            setLink('')
            setTitle('')
            Router.push('/personal')
        }
    });
    const handlePost = async () => {
        await doRequest();
    }
    return (
        <div className="login-div">
            <div className="fields">
                <div className="username">
                    <input type="text"
                           value={title}
                           className="user-input"
                           onChange={e => setTitle(e.target.value)}
                           placeholder="Title"/></div>
                <div className="username">
                    <input type="text"
                           value={link}
                           className="pass-input"
                           onChange={e => setLink(e.target.value)}
                           placeholder="Link"/></div>
                <div className="username">
                    <input type="text"
                           value={note}
                           className="pass-input"
                           onChange={e => setNote(e.target.value)}
                           placeholder="Note"/></div>
            </div>
            {errors}
            <button onClick={handlePost} className="signin-button">Create</button>
        </div>
    )
}
export default CreatePersonalComponent