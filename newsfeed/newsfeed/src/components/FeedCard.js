import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import CommentForm from './CommentForm'
import Comment from './Comment'
import axios from 'axios'
import moment from 'moment'
const FeedCard = ({title, body, userFname, userLname, email, vote, id, image, isPublic, loginStatus,  getFeeds, profile_pic, postedIn}) => {
    const icon =`https://ui-avatars.com/api/?name=${userFname}+${userLname}&background=DBEAFE&color=1D4ED8`

    const [commentToggle, setcommentToggle]=useState(false);

    const[comments, setComments]=useState([])

    const[didVote, setDidvote]=useState([]);

    async function getComments(){
        const req=await axios.get(`http://localhost:9999/post/getComment/${id}`);
        setComments(req.data);
    }
    
useEffect(()=>{
    getComments();
},[])

async function checkVotes(){
    const req=await axios.get(`http://localhost:9999/post/getvotes/${loginStatus}/${id}`)
    setDidvote(req.data)
}
useEffect(()=>{
    checkVotes()
},[])


const upvote=()=>{
    
    const data={
        user_id:loginStatus,
        post_id:id,
        token:'reguser',
    }
    axios.post('http://localhost:9999/post/upvote/',data).then((res)=>{
        getFeeds()
        checkVotes()
    })
}

const downVote=()=>{
    
    const data={
        user_id:loginStatus,
        post_id:id,
        token:'reguser',
    }
    axios.post('http://localhost:9999/post/downvote/',data).then((res)=>{
        getFeeds()
        checkVotes()
    })
}


    return (
        <div>
         
            {loginStatus>0? 
           <div className="px-8 py-4 mx-4 my-20 bg-white rounded-lg shadow-lg">

            <div className="flex items-center justify-center -mt-16 md:justify-start">
                {profile_pic?
                
                <img className="object-cover w-20 h-20 rounded-full" src={process.env.PUBLIC_URL+`/images/${profile_pic}`} alt="profile"/>
                :
                
                <img className="object-cover w-20 h-20 rounded-full" src={icon} alt="profile"/>
                }
            </div>
            <div className="grid grid-cols-5">
            <div className="col-span-1">
            <p className="pl-4 text-lg text-left text-gray-800">{userFname} {userLname}</p>
            <p className="pl-4 text-base font-bold text-left text-gray-800">{email}</p>
            <div className="flex flex-wrap justify-start pt-4">
              
                {didVote.length>0?
                   <div>
                       {didVote[0].upvote==1? 
                          <button className="px-2 m-0 text-green-300 transition-all duration-150 ease-in-out">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                          </svg>
                          </button>
                        :
                        <button onClick={()=>upvote()} className="px-2 m-0 text-gray-300 transition-all duration-150 ease-in-out hover:text-green-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                        </svg>
                        </button>
                   }
              
                   </div>
                :
                <button onClick={()=>upvote()} className="px-2 m-0 text-gray-300 transition-all duration-150 ease-in-out hover:text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                </svg>
                </button>
                }
               

                <p className="px-2 text-lg font-bold text-gray-500 ">{vote}</p>

                {didVote.length>0? 
                    <div>
                         {didVote[0].downvote==1?
                          <button className="px-2 m-0 text-red-300 transition-all duration-150 ease-in-out">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                          </svg>
                          </button>
                         :
                         <button onClick={()=>downVote()} className="px-2 m-0 text-gray-300 transition-all duration-150 ease-in-out hover:text-red-300">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                         </svg>
                         </button>
                         }
                    </div>
                : 
                <button onClick={()=>downVote()} className="px-2 m-0 text-gray-300 transition-all duration-150 ease-in-out hover:text-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
                </button>
                }
                
         
                
            </div>
            </div>
            <div className="col-span-3 pl-2 text-left border-l-2">
            <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
            <p className="mt-1 text-gray-500">{moment(postedIn).fromNow()}</p>
                <p className="mt-2 text-gray-600">{body} </p>
            </div>
            <div>
                {image!=null?
                <div >
                    <img src={process.env.PUBLIC_URL+`/images/${image}`} alt="post_image"  className="object-cover shadow-xl rounded-xl"/>
                </div>
                :
               null
                
            }
            </div>
               
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={()=>{setcommentToggle(!commentToggle)}} className="flex flex-wrap items-center text-gray-300 transition-all duration-150 ease-in-out hover:text-green-500">
                <p className="mr-1 text-semibold">{comments.length}</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                </button>

               <button className="ml-4 text-gray-300 transition-all duration-150 ease-in-out hover:text-blue-500">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
               </button>

               <button className="ml-4 text-gray-300 transition-all duration-150 ease-in-out hover:text-yellow-500">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
               </button>
            </div>

                <div className="bg-gray-100">
                    {commentToggle ? <div> 
                        <CommentForm loginStatus={loginStatus} id={id} getComments={getComments}></CommentForm>
                        <Comment comments={comments}></Comment>
                        </div> :null}
                    
                </div>
            </div> 
        
        :
        <div>
        {isPublic!==0?
        <div>

            <div className="px-8 py-4 mx-4 my-20 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-center -mt-16 md:justify-start">
                <img className="object-cover w-20 h-20 rounded-full" src={icon} alt="profile"/>
            </div>
            <div className="grid grid-cols-5">
            <div className="col-span-1">
            <p className="pl-4 text-lg text-left text-gray-800">{userFname} {userLname}</p>
            <p className="pl-4 text-base font-bold text-left text-gray-800">{email}</p>
            <div className="flex flex-wrap justify-start pt-4">
                <NavLink to="/login" className="px-2 m-0 text-gray-300 transition-all duration-150 ease-in-out hover:text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                </svg>
                </NavLink>

                <p className="px-2 text-lg font-bold text-gray-500 ">{vote}</p>
                <NavLink to="/login" className="px-2 m-0 text-gray-300 transition-all duration-150 ease-in-out hover:text-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
                </NavLink>

            </div>
            </div>
            <div className="col-span-3 pl-2 text-left border-l-2">
            <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
                <p className="mt-2 text-gray-600">{body} </p>
            </div>
            <div>
                {image!=null?
                <div>
                    <img src={process.env.PUBLIC_URL+`/images/${image}`} alt="post_image" />
                </div>
                :
               null
                
            }
            </div>
            </div>
            </div>

            
        </div>
        
        
        :
            null
        }    
        </div>
        }
        </div>
    )
}

export default FeedCard
