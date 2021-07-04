import React from 'react'
import Select from './Select'
import { useState } from 'react'
import axios from 'axios'

const CreatePost = ({getFeeds}) => {
    const ispublic = [
        { id: 1, name: 'public', value:1, unavailable: false },
        { id: 2, name: 'private', value:0, unavailable: false },
    ]
    const [selectedOption, setselectedOption] = useState(ispublic[0])
    const [title, setTitle]=useState()
    const [body, setBody]=useState()
    const[image, setImage]=useState()
    const post=(e)=>{
        e.preventDefault()
        const data= new FormData();
        data.append("user_id", localStorage.getItem("user"))
        data.append("title", title)
        data.append("body", body)
        data.append("isPublic", selectedOption.value)
        data.append("token",'reguser')
        data.append("image", image)
        axios.post("http://localhost:9999/create/post",data).then((res)=>{
        getFeeds()
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div>
             <div className="px-8 py-4 mx-4 my-20 bg-white rounded-lg shadow-lg">
                     <form>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-3">
                                <div className="flex flex-wrap">
                                <input type="text" name="title" value={title} onChange={(e)=> setTitle(e.target.value)} className="w-full p-2 mb-2 rounded-lg bg-blue-50" placeholder="title"/>
                                </div>
                                <textarea name="body" id="" value={body} onChange={(e)=> setBody(e.target.value)} className="w-full p-2 m-0 rounded-lg bg-blue-50" cols="80" rows="5" placeholder="write your article" ></textarea>
                            </div>

                            <div>

                            <Select ispublic={ispublic} selectedOption={selectedOption} setSelectedOption={setselectedOption}></Select>

                            
                            <div className="justify-center my-2 flexitems-center bg-grey-lighter">
                            <label className="flex flex-col items-center w-full px-4 py-6 tracking-wide uppercase transition-all duration-150 ease-in-out rounded-lg cursor-pointer bg-blue-50 text-blue hover:bg-blue hover:bg-blue-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                                <span className="mt-1 text-base leading-normal">Upload</span>
                                <input type='file' id="file" onChange={(e)=>{ const file=e.target.files[0];  setImage(file)}} accept="image/png, image/gif, image/jpeg" className="hidden" />
                                
                            </label>
                            </div>
                            <input type="submit" onClick={post} className="w-full px-8 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-400" value="post" /> 
                            </div>
                        </div>
                     </form>
             </div>
        </div>
    )
}

export default CreatePost
