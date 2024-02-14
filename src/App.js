import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import { auth } from './firebase'


export default function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setUserName(user.displayName);
      }
      else{
        setUserName("");
      }
      console.log(user);
    });
  },[]);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        setUserName(""); // Clear the user name from state
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/' element={<Home name={userName} handleSignOut={handleSignOut}/>}/>
        </Routes>
      </Router>
    </div>
  )
}
