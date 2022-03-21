import { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';



const Navbar = (props) => {
  const { user } = props
/*   const [ user, setUser ] = useState("");
 */
/*   useEffect(()  => {
    async function fetchData() {
      try{
        const userData = await axios.get('http://localhost:8000/api/protected', 
        { withCredentials: true });
        try{
          const userName = await axios.get(`http://localhost:8000/api/user/${userData.data}`)
          console.log(userName);
          setUser(userName.data[0].name);
        }catch(err){
          console.log(err);
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  }, []) */
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
          { user ? <li style={{marginLeft: '5px', marginRight: "5px"}}>Welcome, { user.name }!</li> : <div style={{display: 'flex'}}> <li><Link to={'/user/login'}>Login</Link></li> <li style={{marginLeft: '5px', marginRight: "5px"}}>|</li> <li><Link to={'/user/new'}>Register</Link></li></div>}
        </ul>
      </div>
    </div>
  )
}

export default Navbar;