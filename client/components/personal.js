import React from "react";
import PersonalCardComponent from "./pcard";

const PersonalComponent = ({posts, handle, user}) => {
    const current = new Date().getTime()

    posts.sort((a, b) => {
        const p = (new Date(a.nextDo)).getTime() - current;
        const q = (new Date(b.nextDo)).getTime() - current;
        return p - q
    })
    const r = posts.map((d) => {
        return (
            <PersonalCardComponent currentUser={user} handleEdit={handle} key={d.id} d={d}/>
        )
    })
    return (
        <div id={'personal'}>
            <h2 style={{width: '70%', marginLeft: '5%'}}>Your personal items | Sorted by practice again</h2>
            <hr/>
            {r}
        </div>
    )
}
export default PersonalComponent;