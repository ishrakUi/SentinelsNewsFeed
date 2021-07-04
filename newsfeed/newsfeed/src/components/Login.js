import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import gif from '../public/login.jpg'
const Login = ({setloginStatus, loginStatus, setUser}) => {

    const history=useHistory();
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [error, setError]=useState('')

    if(loginStatus>0){
      return <Redirect to="/" />
    }
    axios.defaults.withCredentials=true;
    const letmeIn=(e)=>{
        e.preventDefault()
        const data={      
            email: email,
            password: password,
        }
        axios.post('http://localhost:9999/verify', data).then(
            (res)=>{
              if(res.data.error){
                setError(res.data.error)
              } 
              else{
                setloginStatus(res.data[0].id)  
                setUser(res.data[0])
                localStorage.setItem("user",res.data[0].id)
                history.push('/')
              }
            }
        ).catch((err)=>{
            console.log(err)
        })
    }

    
    return (
        <div>
            
          <section  className="flex flex-col items-center h-screen md:flex-row ">
            <div  className="hidden w-full h-screen bg-white lg:block md:w-1/3 lg:w-2/3">
              <img src={gif} alt=""  className="object-contain w-full h-full p-32" />
            </div>
            <div  className="flex items-center justify-center w-full h-screen px-6 bg-white shadow-lg md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
              <div  className="w-full h-100">
                <NavLink to="/"  className="flex items-center mb-4 font-medium text-blueGray-900 title-font md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                    <h2 className="block p-2 text-4xl font-medium tracking-tighter text-black transition duration-500 ease-in-out transform cursor-pointer hover:text-blueGray-500 lg:text-x lg:mr-8"> iFeeds </h2>
                </NavLink>
                <h1  className="mt-12 text-2xl font-semibold text-left text-black tracking-ringtighter sm:text-3xl title-font">Log in to your account</h1>
                <form  className="mt-6" onSubmit={letmeIn}>
                  <div>
                    <label  className="block text-sm font-medium leading-relaxed tracking-tighter text-left text-blueGray-700">Email Address</label>
                    <input type="email" name="email" value={email} placeholder="Your Email " onChange={(e)=> setEmail(e.target.value)}  className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blue-50 bg-blueGray-100 focus:border-blueGray-500 focus:outline-none ring-offset-current ring-offset-2 " required />
                  </div>
                  <div  className="mt-4">
                    <label  className="block text-sm font-medium leading-relaxed tracking-tighter text-left text-blueGray-700">Password</label>
                    <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Your Password" className="w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blue-50 bg-blueGray-100 focus:border-blueGray-500 focus:outline-none ring-offset-current ring-offset-2 " required />
                  </div>
                  <button type="submit"  className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blueGray-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">Log In</button>
                </form>
                <hr  className="w-full my-6 border-blueGray-300" />
                <div  className="flex justify-center">
                 {error? 
                  <p className="text-red-500">{error}</p>
                  :
                  null
                }
                </div>
                <p  className="mt-8 text-center">Need an account? <NavLink to="/register"  className="font-semibold text-blue-500 hover:text-blue-700">Sign Up</NavLink></p>
              </div>
            </div>
          </section>
        
        </div>
    )
}

export default Login
