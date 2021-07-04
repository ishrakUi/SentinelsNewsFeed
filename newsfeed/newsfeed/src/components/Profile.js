import React from 'react'
import Moment from 'moment';
import { useState } from 'react';
import { useHistory } from 'react-router'
import {  Redirect } from 'react-router-dom'
import axios from 'axios'
const Profile = ({user, setUser,loginStatus}) => {


    const[image, setImage]=useState()
    const [first_name, setfirst_name]=useState(user.first_name)
    const [last_name, setlast_name]=useState(user.last_name)
    const [email, setEmail]=useState(user.email)

    const [about, setAbout]=useState(user.about)
    const history=useHistory(); 
    console.log(loginStatus)
     if(loginStatus==0){
            console.log(loginStatus)
            return <Redirect to="/"/>
    }
    const edituser=(e)=>{
        e.preventDefault()
   
        const data= new FormData(); 
            data.append("first_name", first_name)
            data.append("last_name", last_name)
            data.append("email", email)
            data.append("about", about)
            data.append("token", 'reguser')
            data.append("image", image)
        
        axios.post(`http://localhost:9999/edit/user/${localStorage.getItem("user")}`, data).then(
            res=>{
                console.log(res)
              setUser(res.data.result[0])
              history.push('/')
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
     }
    

    return (
        <div>
            <div className="mx-auto my-48">
                    <div className="grid grid-cols-4">
                        <div className="relative w-full mx-4 bg-white shadow-xl">
                            <div className="flex justify-center">
                                {user.profile_pic? 
                             <img src={process.env.PUBLIC_URL+`/images/${user.profile_pic}`} alt="" className="absolute w-32 h-32 mx-auto rounded-full shadow-2xl -4 -white -top-20" />
                            :
                            <img src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=DBEAFE&color=1D4ED8`} alt="" className="absolute w-32 h-32 mx-auto rounded-full shadow-2xl -4 -white -top-20" />
                            }
                                  
                            </div>
                            
                            <div className="mt-16">
                                <h1 className="text-3xl font-bold text-center text-gray-900">{user.first_name} {user.last_name}</h1>
                                
                                <p>
                                    <span>
                                        
                                    </span>
                                </p>
                                <div className="my-5">
                                    <p className="block px-6 py-3 font-medium leading-6 text-center text-indigo-200 bg-blue-600">{user.email}</p>
                                </div>
                                <div className="w-full">
                                <h3 className="px-4 font-semibold text-left text-gray-600">Date Of birth:  {Moment(user.dob).format('d MMM, Y')}</h3>

                                <h3 className="px-4 mt-4 font-bold text-left text-gray-600">About</h3>
                                    <div className="w-full my-5">
                                        {user.about}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3">
                                <div className="pt-2">
                                    <div className="mx-auto">
                                        <div className="w-full max-w-2xl p-6 mx-auto bg-white shadow-lg inputs rounded-xl">
                                            <h2 className="text-2xl text-gray-900">Account Setting</h2>
                                            <form className="pt-4 mt-6 -t -white-400" onSubmit={edituser}>
                                                {/* <div className='flex flex-wrap mb-6 -mx-3'>
                                                    <div className='w-full px-3 mb-6 md:w-full'>
                                                        <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase' for='grid-text-1'>email address</label>
                                                        <input className='block w-full px-4 py-3 leading-tight text-gray-700 bg-blue-100 rounded-md appearance-none focus:outline-none focus:-blue-100'  id='grid-text-1' type='text' placeholder='Enter email'  required />
                                                    </div>
                                                    <div className='w-full px-3 mb-6 md:w-full'>
                                                        <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase' for='grid-text-1'>Change Password</label>
                                                        <input className='block w-full px-4 py-3 leading-tight text-gray-700 bg-blue-100 rounded-md appearance-none focus:outline-none focus:-blue-100' id='grid-text-1' type='text' placeholder='Current Password'  required />
                                                    </div>
                                                    <div className='w-full px-3 mb-6 md:w-full'>
                                                    
                                                        <input className='block w-full px-4 py-3 leading-tight text-gray-700 bg-blue-100 rounded-md appearance-none focus:outline-none focus:-blue-100' id='grid-text-1' type='text' placeholder='New Password'  required />
                                                    </div>
                                                    <div className='w-full px-3 mb-6 md:w-full'>
                                                    
                                                        <input className='block w-full px-4 py-3 leading-tight text-gray-700 bg-blue-100 rounded-md appearance-none focus:outline-none focus:-blue-100' id='grid-text-1' type='text' placeholder='Confirm Password'  required />
                                                    </div>

                                                    <div className="flex flex-wrap justify-end">
                                                            <button className="px-2 py-1 mr-4 font-bold text-white bg-blue-500 rounded-md shadow-sm appearance-none" type="submit">save changes</button>
                                                    </div>
                                                        
                                                    </div> */}
                                                    <div className="w-full personal ">
                                                    <div className="relative">
                                                    <div className="flex justify-center my-2 flexitems-center bg-grey-lighter">
                                                            <label className="flex flex-col items-center w-32 h-32 tracking-wide uppercase transition-all duration-150 ease-in-out rounded-lg rounded-full cursor-pointer bg-blue-50 text-blue hover:bg-blue hover:bg-blue-100">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 m-10" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                            </svg>
                                                                <input type='file' id="file" onChange={(e)=>{ const file=e.target.files[0];  setImage(file)}} accept="image/png, image/gif, image/jpeg" className="hidden" />
                                                            </label>
                                                    </div>
                                                    </div>
                                                        <div className="flex items-center justify-between mt-4">
                                                            <div className='w-full px-3 mb-6 md:w-1/2'>
                                                                <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase' >first name</label>
                                                                <input value={first_name} onChange={(e)=>setfirst_name(e.target.value)} className='block w-full px-4 py-3 leading-tight text-gray-700 bg-blue-100 rounded-md appearance-none focus:outline-none focus:-blue-100' type='text'  required />
                                                            </div>
                                                            <div className='w-full px-3 mb-6 md:w-1/2'>
                                                                <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase' >last name</label>
                                                                <input  value={last_name} onChange={(e)=>setlast_name(e.target.value)} className='block w-full px-4 py-3 leading-tight text-gray-700 bg-blue-100 rounded-md appearance-none focus:outline-none focus:-blue-100' type='text'  required />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-4">

                                                        <div className='w-full px-3 mb-6 md:w-1/2'>
                                                                <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase' >Email</label>
                                                                <input value={email} onChange={(e)=>setEmail(e.target.value)} className='block w-full px-4 py-3 leading-tight text-gray-700 bg-blue-100 rounded-md appearance-none focus:outline-none focus:-blue-100' type='email'  required />
                                                        </div>

                                                      
                                                        </div>
                                                        <div className='w-full px-3 mb-6 md:w-full'>
                                                            <label className='block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase' >About</label>
                                                            <textarea value={about} onChange={(e)=>setAbout(e.target.value)} className='w-full h-20 px-3 py-2 font-medium leading-normal placeholder-gray-700 bg-blue-100 rounded-md resize-none focus:outline-none focus:bg-white'  required></textarea>
                                                        </div>

                                                        

                                                        <div className="flex justify-end">
                                                            <button className="px-4 py-2 mt-5 mr-3 text-white bg-blue-500 rounded-md shadow-lg appearance-none" type="submit">save changes</button>
                                                        </div>
                                                    </div>
                                                    </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>
            </div>
      
    )
}

export default Profile
