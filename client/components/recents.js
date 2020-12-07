import React from 'react';
import CardComponent from "./card";

const RecentComponet = ({posts,handleEdit,currentUser}) => {
    const r = posts.map((d) => {
        return (
            <CardComponent currentUser={currentUser} handleEdit={handleEdit} key={d.id} d={d}/>
        )
    })
    return (
        <div id={'recent'}>
            <h1 style={{width: '70%', marginLeft: '5%'}}>Recent created posts</h1>
            <hr/>
            {r}
        </div>
    )
}

export default RecentComponet