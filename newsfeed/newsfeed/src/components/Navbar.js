import React from 'react'
import {NavLink} from 'react-router-dom'


const Navbar = ({loginStatus, user, logout}) => {


    return (
        <div>
           <div className="items-center">
            <div className="transition duration-500 ease-in-out transform bg-white border rounded-lg text-blueGray-700 ">
              <div className="flex flex-col flex-wrap p-5 pb-0 mx-auto md:items-center md:flex-row">
                <NavLink to="/" className="pr-2 lg:pr-8 lg:px-6 focus:outline-none">
                  <div className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                    <h2 className="block p-2 text-xl font-medium tracking-tighter text-black transition duration-500 ease-in-out transform cursor-pointer hover:text-blueGray-500 lg:text-x lg:mr-8"> iFeeds </h2>
                  </div>
                </NavLink>
                <nav className="flex flex-wrap items-end justify-center pb-0 mb-0 text-base md:ml-auto md:mr-auto">
                  <ul className="items-end inline-block list-none lg:inline-flex">
                    <li>
                        <NavLink to='/' exact={true} activeClassName="border-blue-500" className="px-4 py-4 mx-4 text-base font-bold transition-all duration-150 ease-in-out border-b-2 border-white hover:border-blue-500">News Feed</NavLink>
                    </li>
                    {loginStatus>0 ?
                    <li>
                        <NavLink to='/profile' exact={true} activeClassName="border-blue-500" className="px-4 py-4 mx-4 text-base font-bold transition-all duration-150 ease-in-out border-b-2 border-white hover:border-blue-500">Profile</NavLink>
                    </li>
                  :
                  null
                  }
                  </ul>
                </nav>
                  {loginStatus>0 ?
                  <div>
                        {user?
                        <>
                       
                            {user.profile_pic?
                              <NavLink to="/profile">
                         <div className="flex items-center justify-center mb-2 md:justify-start">
                         <img className="object-cover w-10 h-10 rounded-full" src={process.env.PUBLIC_URL+`/images/${user.profile_pic}`} alt="profile"/>
                         <button onClick={logout} className="w-auto px-8 py-2 my-2 ml-4 text-base font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:b-gblue-700 ">Logout</button>
                         </div>
                         </NavLink>
                             :  

                        <NavLink to="/profile">
                         <div className="flex items-center justify-center mb-2 md:justify-start">
                         <img className="object-cover w-10 h-10 rounded-full" src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=DBEAFE&color=1D4ED8`} alt="profile"/>
                         <button onClick={logout} className="w-auto px-8 py-2 my-2 ml-4 text-base font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:b-gblue-700 ">Logout</button>
                         </div>
                         </NavLink>
                            }
                        </>
                      :
                          <button  onClick={logout} className="w-auto px-8 py-2 my-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:b-gblue-700 ">Logout</button>
                      }
                      </div>
                  :
                <NavLink to="/login" className="w-auto px-8 py-2 my-2 text-base font-medium text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:b-gblue-700 ">Login </NavLink>
                  }
                
              </div>
            </div>
          </div>
        </div>
    )
}

export default Navbar
