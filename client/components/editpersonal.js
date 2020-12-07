import React, {useState} from "react";
import useRequest from '../hooks/use-request'
import Router from "next/router";

const EditPersonalComponent = (props) => {
    const content = props.content
    const [title, setTitle] = useState(content.title);
    const [link, setLink] = useState(content.link);
    const [note, setNote] = useState(content.note);
    const [id, setId] = useState(content.id);
    const {doRequest, errors} = useRequest({
        url: '/api/personal',
        method: 'put',
        body: {
            title,
            link,
            note,
            id:content.id
        },
        onSuccess: () => {
            setNote('')
            setLink('')
            setTitle('')
            handleCancle()
            Router.push('/personal')
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
        setNote(content.note)
        setId(content.id)
    }
    if(id !== content.id) updateThings()
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
            <button onClick={handlePost} className="signin-button">Edit</button>
            <button style={{background: '#ff99ff'}} onClick={handleCancle} className="signin-button">Cancel</button>
        </div>
    )
}
export default EditPersonalComponent