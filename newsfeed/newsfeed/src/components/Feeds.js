import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import FeedCard from './FeedCard';
import CreatePost from './CreatePost';

const Feeds = ({user,loginStatus}) => {
const[feeds, setfeeds]=useState([])
async function getFeeds(){
    const req=await axios.get("http://localhost:9999/feeds");
    setfeeds(req.data);
}

useEffect(()=>{
  getFeeds()
},[])

    return (
        <div>
            {loginStatus>0?
            <CreatePost  getFeeds={getFeeds}></CreatePost>
            :
            null
            }
            
         {feeds.map((feed)=>(
             <FeedCard key={feed.id} postedIn={feed.created_at} profile_pic={feed.profile_pic} userId={feed.user_id} getFeeds={getFeeds} loginStatus={loginStatus} isPublic={feed.isPublic} id={feed.id} title={feed.title} body={feed.body} image={feed.image} vote={feed.vote} userFname={feed.first_name} userLname={feed.last_name} email={feed.email}>
             </FeedCard>
         ))}

        </div>
    )
}

export default Feeds
