import React from 'react'
import {  useState } from 'react'
import axios from 'axios'
const CommentForm = ({loginStatus, id, getComments}) => {
    const [body, setBody]=useState('')
    const [msg, setMsg]=useState('')
    const postComment=(e)=>{
  
    e.preventDefault()
    const data={
        body:body,
        user_id:loginStatus,
        post_id:id,
        token:'reguser',
    }
    axios.post('http://localhost:9999/post/comment/', data).then(
        (res)=>{
         setMsg(res.data)
         setBody('')
         getComments()
        }
    ).catch((err)=>{
        console.log(err)
    })

    }

    return (
        <div>
           
               
            <div className="flex items-center justify-center mx-auto mb-4 shadow-lg">
            <form  className="w-full px-4 pt-2 bg-white rounded-lg" onSubmit={postComment}>
                <div className="flex flex-wrap mb-6 -mx-3">
                    <div className="w-full px-3 mt-2 mb-2 md:w-full">
                        <textarea value={body} onChange={(e)=>setBody(e.target.value)}  className="w-full h-20 px-3 py-2 leading-normal placeholder-gray-700 rounded resize-none bg-blue-50 font-base focus:outline-none " name="body" placeholder='Type Your Comment' required></textarea>
                    </div>
                    <div className="flex items-start justify-between w-full px-3 md:w-full">
                        
                        {msg?
                        <div className="w-1/2 p-4 font-bold text-white bg-green-400 rounded-xl">
                            <div className="flex flex-wrap justify-between">
                        {msg}
                        <button className="px-2 font-bold bg-red-600" onClick={()=>{setMsg('')}}>X</button>

                            </div>
                        </div>
                        :
                        null
                        }
                        <div className="-mr-1">
                        <button type="submit" className="px-4 py-3 mr-1 font-medium tracking-wide text-white bg-blue-500 rounded-lg hover:bg-blue-400" >Post Comment</button>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CommentForm
