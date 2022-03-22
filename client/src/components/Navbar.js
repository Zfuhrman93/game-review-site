import { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';



const Navbar = (props) => {
  const handleLogout = async () => {
    try{
      const request = await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
      console.log(request);
      navigate('/home');
      window.location.reload(false);
    }catch(err){
      console.log(err.response)
    }
  }
  const { user } = props
  return(
    <div>
      <div className="nav-bar">
        <ul>
          <li><Link to={"/home"}>Home</Link></li>
          <li style={{marginLeft: '5px', marginRight: "5px"}}>|</li>
          <li><Link to={"/game/new"}>Add a Game</Link></li>
          <li style={{marginLeft: '5px', marginRight: "5px"}}>|</li>
          <li><Link to={"/review/new"}>Add Review</Link></li>
        </ul>
        <ul>
          { user ? <li style={{marginLeft: '5px', marginRight: "5px"}}>Welcome, { user.name }! | <button className="btn-small btn-danger" onClick={handleLogout}>LOGOUT</button></li> : <div style={{display: 'flex'}}> <li><Link to={'/user/login'}>Login</Link></li> <li style={{marginLeft: '5px', marginRight: "5px"}}>|</li> <li><Link to={'/user/new'}>Register</Link></li></div>}
        </ul>
      </div>
    </div>
  )
}

export default Navbar;