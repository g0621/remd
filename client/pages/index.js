import RecentComponet from "../components/recents";
import LikedComponet from "../components/liked";
import SideDivComponent from "../components/sidediv";
import {useState} from 'react'

const LandingPage = ({currentUser, recentPosts, likedPosts}) => {
    const [editMode, setMode] = useState(null)
    const handleEdit = (data) => {
        setMode(data)
    }

    return (
        <div className="container">
            <SideDivComponent exit={setMode} content={editMode} currentUser={currentUser}/>
            <LikedComponet currentUser={currentUser} handleEdit={handleEdit} posts={likedPosts}/>
            <RecentComponet currentUser={currentUser} handleEdit={handleEdit} posts={recentPosts}/>
        </div>
    )
};


LandingPage.getInitialProps = async (context, client, currentUser) => {
    const recents = await client.get('/api/recents/getrecents')
    const mostLiked = await client.get('/api/recents/getmostliked')

    return {recentPosts: recents.data, likedPosts: mostLiked.data, currentUser};
};

export default LandingPage;
