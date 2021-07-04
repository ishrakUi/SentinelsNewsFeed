import React from 'react'
import { NavLink,Redirect } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
const Register = ({setloginStatus, loginStatus, setUser}) => {

    const [first_name, setfirst_name]=useState('')
    const [last_name, setlast_name]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [confirm, setConfirm]=useState('')
    const [dob, setDob]=useState('')

    const history=useHistory();
    
    if(loginStatus>0){
      return <Redirect to="/" />
    }
    
    const regSubmit=(e)=>{
        e.preventDefault()
        if(password!==confirm){
            alert("password mismatched")
            return
        }

        const data={
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            dob: dob,
        }
        axios.post('http://localhost:9999/register/user', data).then(
            res=>{
              setloginStatus(res.data.result[0].id)
              setUser(res.data.result[0])
              localStorage.setItem("user", res.data.result[0].id)
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
            
          <div className="flex flex-col items-center h-screen md:flex-row">
            <div className="container mx-auto">
              <div className="flex justify-center px-2 py-6 ">
                <div className="flex w-full rounded-lg xl:w-3/4 lg:w-11/12 lg:shadow-xl ">
                  <div className="relative hidden w-full h-auto bg-white bg-cover border-r rounded-l-lg lg:block lg:w-6/12">
                    <div className="relative z-10 m-12 text-left ">
                    <div  className="pr-2 lg:pr-8 lg:px-6 focus:outline-none">
                  <div className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                    <h2 className="block p-2 text-xl font-medium tracking-tighter text-black transition duration-500 ease-in-out transform cursor-pointer hover:text-blueGray-500 lg:text-x lg:mr-8"> iFeeds </h2>
                  </div>
                </div>
                      <h2 className="mt-12 mb-2 text-2xl font-semibold tracking-tighter text-black sm:text-3xl title-font"> Create an account. </h2>
                      <div className="w-full mt-16 mb-8 text-base leading-relaxed text-blueGray-900 sm:md:w-3/3 lg:text-1xl "> Register and join the community. share what you want. vote what you love. the place is yours.</div>
                    </div>
                  </div>
                  <div className="w-full px-8 py-24 bg-white rounded-lg border-blueGray-100 lg:w-8/12 lg:px-24 lg:py-4 lg:rounded-l-none s">
                    <div className="relative z-10 text-left ">
                      <form className="mt-6" onSubmit={regSubmit}>
                        <div className="flex justify-between felx-wrap">
                            <div>
                            <label className="block text-base font-medium leading-relaxed text-black">First Name</label>
                            <input type="text" name="first_name" vale={first_name} placeholder="Your First Name " className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blue-50 bg-blueGray-100 focus:outline-none ext-black focus:border-blueGray-500"
                            onChange={(e)=> setfirst_name(e.target.value)} required/>
                            </div>

                            <div>
                            <label className="block text-base font-medium leading-relaxed text-black">Last Name</label>
                            <input type="text" name="last_name" value={last_name} placeholder="Your Last Name " className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blue-50 bg-blueGray-100 focus:outline-none ext-black focus:border-blueGray-500" 
                            onChange={(e)=> setlast_name(e.target.value)} required/>
                            </div>

                          
                        </div>
                        <div className="mt-4">
                          <label className="block text-base font-medium leading-relaxed text-black">Email Address</label>
                          <input type="email" name="email" value={email} placeholder="Your Email" onChange={(e)=> setEmail(e.target.value)} className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blue-50 focus:outline-none ext-black focus:border-blueGray-500"   required />
                        </div>
                        <div className="flex flex-wrap mt-4 mb-6 -mx-3">
                          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                            <label className="text-base font-medium leading-relaxed text-black"> Password </label>
                            <input className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blue-50 focus:outline-none ext-black focus:border-blueGray-500" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} minLength="6" type="password" placeholder="Your Password" required />
                            <p className="mt-1 text-xs italic text-black">Please fill out this field. minimum 6 characters</p>
                          </div>
                          <div className="w-full px-3 md:w-1/2">
                            <label className="text-base font-medium leading-relaxed text-black"> Confirm </label>
                            <input className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blue-50 focus:outline-none ext-black focus:border-blueGray-500 " name="confirm" type="password" value={confirm} onChange={(e)=> setConfirm(e.target.value)} placeholder="Confirm" required/>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-base font-medium leading-relaxed text-black">Date of Birth</label>
                          <input type="date" name="dob" value={dob} onChange={(e)=> setDob(e.target.value)}  placeholder="Date of Birth" className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blue-50 focus:outline-none ext-black focus:border-blueGray-500"   required />
                        </div>

                        <button type="submit" className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blue-400">Log In</button>
                      </form>
                      <p className="mt-8 text-center">Already have an account? <NavLink to="/login" className="font-semibold text-blue-500 hover:text-blue-400">Sign In</NavLink></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
    )
}

export default Register
