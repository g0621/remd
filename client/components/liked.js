import React from 'react';
import CardComponent from "./card";


const LikedComponent = ({posts,handleEdit,currentUser}) => {

    const r = posts.map((d) => {
        return (
            <CardComponent currentUser={currentUser} handleEdit={handleEdit} key={d.id} d={d}/>
        )
    })
    return (
        <div id={'liked'}>
            <h2 style={{width: '70%', marginLeft: '5%'}}>Top Liked posts</h2>
            <hr/>
            {r}
        </div>
    )
}

export default LikedComponent