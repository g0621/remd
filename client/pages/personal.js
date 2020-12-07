import React, {useState} from "react";
import PersonalComponent from '../components/personal'
import PsideDivComponent from "../components/psidediv";

const PersonalPage = ({currentUser, personals}) => {
    const [mode, setMode] = useState(null);

    const handleEdit = (data) => {
        setMode(data)
    }

    return (
        <div className="per-container">
            <PersonalComponent handle={handleEdit} posts={personals} user={currentUser}/>
            <PsideDivComponent exit={setMode} content={mode} user={currentUser}/>
        </div>
    )
};


PersonalPage.getInitialProps = async (context, client, currentUser) => {
    const {data} = await client.get('/api/personal')
    return {personals: data, currentUser};
};

export default PersonalPage;
