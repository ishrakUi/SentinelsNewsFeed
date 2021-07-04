import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar';
import Feeds from './components/Feeds'
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios'
import Profile from './components/Profile'
import { useState, useEffect } from 'react';
function App() {
  const [user, setUser]=useState([]);
  const [loginStatus, setloginStatus]=useState(0)
  
  useEffect(()=>{
    const loadStatus=async()=>{
      setloginStatus(localStorage.getItem("user"))
      const data =  getUser(localStorage.getItem("user"))
      setUser(data)
    }
loadStatus()
  },[])


  const logout =()=>{
    localStorage.clear();
    setloginStatus(0);
    setUser([]);
    return <Redirect to="/"/>
  }
  
  const getUser=async(id)=>{
    axios.get(`http://localhost:9999/user/${id}`).then((result)=>{
      setUser(result.data[0])
    })
  }

  return (
      <Router>
     <div className="App">

     <Route path="/login" exact component={()=><Login loginStatus={loginStatus} setUser={setUser} setloginStatus={setloginStatus}/>}/>
     <Route path="/register" exact component={()=><Register loginStatus={loginStatus} setUser={setUser} setloginStatus={setloginStatus}/>} />
    
       <div>
         <Navbar user={user} loginStatus={loginStatus} setloginStatus={setloginStatus} setUser={setUser} logout={logout}/>
         <div className="lg:px-48 md:px-16 sm:px-20">
         <Route path="/" exact render={(props)=>(
          <Feeds user={user} loginStatus={loginStatus}/>
          )} />
        </div>
      
       </div>

       <Route path="/profile" exact component={()=>(
         <div className="lg:px-48 md:px-16 sm:px-20">
           <Profile user={user} setUser={setUser} loginStatus={loginStatus} />
           </div>
        )} />
      

      </div>
      </Router>
  );
}

export default App;
