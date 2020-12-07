import React from 'react';
import CreatePostComponet from "./createpost";
import LoginSignUp from "./loginsignup";
import EditPostComponent from "./editpost";

const SideDivComponent = ({currentUser,content,exit}) => {
    return (
        <div id={'sidediv'}>
            {   content?
                <EditPostComponent exit={exit} content={content} /> :
                currentUser ?
                    <CreatePostComponet/> :
                    <LoginSignUp/>
            }
        </div>
    )
}

export default SideDivComponent