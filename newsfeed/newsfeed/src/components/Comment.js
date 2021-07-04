import React from 'react'

const Comment = ({comments}) => {

    return (
        <div>
            {comments.map((comment)=>(
                <div key={comment.id} className="mt-4 rounded-b-lg ">
            <div className="pt-4">
        <div className="flex flex-col items-center justify-center p-3 mb-4 bg-white rounded-lg shadow-lg md:items-start">
        <div className="flex flex-row justify-center mr-2">
            {comment.profile_pic?
             <img alt="avatar" width="48" height="48" className="w-10 h-10 mb-4 mr-4 rounded-full" src={process.env.PUBLIC_URL+`/images/${comment.profile_pic}`} />
            :
            <img alt="avatar" width="48" height="48" className="w-10 h-10 mb-4 mr-4 rounded-full" src={`https://ui-avatars.com/api/?name=${comment.first_name}+${comment.last_name}&background=DBEAFE&color=1D4ED8`} />
            }
            <div>
            <h3 className="text-lg font-semibold text-center text-black-600 md:text-left ">{comment.first_name} {comment.last_name}</h3>
            </div>
        </div> 
        <div className="p-4 m-2 bg-blue-100 rounded-lg">
            <p className="text-lg text-center text-gray-600 md:text-left">{comment.body}</p>
        </div>
        </div>
            </div>

        </div>
            ))}
            
        </div>
    )
}

export default Comment
