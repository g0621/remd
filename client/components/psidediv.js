import React from "react";
import CreatePersonalComponent from "./createpersonal";
import EditPersonalComponent from "./editpersonal";

const PsideDivComponent = ({exit, content, user}) => {
    return (
        <div id={'pside'}>
            {
                content ?
                    <EditPersonalComponent exit={exit} content={content}/> :
                    <CreatePersonalComponent/>
            }
        </div>
    )
}
export default PsideDivComponent