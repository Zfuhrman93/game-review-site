import { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';



const Navbar = (props) => {
  const handleLogout = async () => {
    try{
      const request = await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
      console.log(request);
      navigate('/');
      window.location.reload(false);
    }catch(err){
      console.log(err.response)
    }
  }
  const { user } = props
  console.log(user);
  return(
    <div>
      <div className="nav-bar">
        <ul>
          <li><Link to={"/"}>Home</Link></li>
          <li style={{marginLeft: '5px', marginRight: "5px"}}></li>
          {user && user.admin ? <li style={{marginRight: "5px"}}><span>|</span><Link to={"/game/new"}>  Add a Game </Link></li> : null}
        </ul>
        <ul>
          { user ? <li style={{marginLeft: '5px', marginRight: "5px"}}>Welcome, { user.name }! | <button className="btn-small btn-danger" onClick={handleLogout}>LOGOUT</button></li> : <div style={{display: 'flex'}}> <li><Link style={{marginTop: "15px", border: "2px solid black", paddingBottom: "8px", paddingRight: "8px", paddingLeft: "8px", backgroundColor: "white", borderRadius: "20px"}} to={'/login-register'}>Sign-In</Link></li></div>}
        </ul>
      </div>
    </div>
  )
}

export default Navbar;