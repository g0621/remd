import React, {useState} from "react";
import useRequest from '../hooks/use-request'
import Router from "next/router";

const EditPostComponent = (props) => {
    const content = props.content
    const [title, setTitle] = useState(content.title);
    const [link, setLink] = useState(content.link);
    const [about, setAbout] = useState(content.about);
    const [id, setId] = useState(content.id);
    const {doRequest, errors} = useRequest({
        url: '/api/posts',
        method: 'put',
        body: {
            title,
            link,
            about,
            id: content.id
        },
        onSuccess: () => {
            setAbout('')
            setLink('')
            setTitle('')
            handleCancle()
            Router.push('/')
        }
    });
    const handlePost = async () => {
        await doRequest();
    }
    const handleCancle = () => {
        props.exit(null)
    }
    const updateThings = () => {
        setTitle(content.title)
        setLink(content.link)
        setAbout(content.about)
        setId(content.id)
    }
    if (id !== content.id) updateThings()
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
            <button onClick={handlePost} className="signin-button">Edit</button>
            <button style={{background: '#ff99ff'}} onClick={handleCancle} className="signin-button">Cancel</button>
        </div>
    )
}
export default EditPostComponent