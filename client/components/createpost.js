import React, {useState} from "react";
import useRequest from '../hooks/use-request'
import Router from "next/router";

const CreatePostComponent = (props) => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [about, setAbout] = useState('');
    const {doRequest, errors} = useRequest({
        url: '/api/posts',
        method: 'post',
        body: {
            title,
            link,
            about
        },
        onSuccess: () => {
            setAbout('')
            setLink('')
            setTitle('')
            Router.push('/')
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
                           value={about}
                           className="pass-input"
                           onChange={e => setAbout(e.target.value)}
                           placeholder="About"/></div>
            </div>
            {errors}
            <button onClick={handlePost} className="signin-button">Post</button>
        </div>
    )
}
export default CreatePostComponent