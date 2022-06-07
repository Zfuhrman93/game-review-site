import { Link, navigate } from '@reach/router';
import axios from 'axios';



const Navbar = (props) => {
  const handleLogout = async () => {
    try{
      const request = await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
      navigate('/');
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
          <li><Link to={"/"}>Home</Link></li>
          <li style={{marginLeft: '5px', marginRight: "5px"}}></li>
          {user ? <li style={{marginRight: "5px"}}><span>| </span><Link to={"/game/new"}>  Add a Game </Link></li> : null}
        </ul>
        <ul>
          { user ? <li style={{color: "black", marginLeft: '5px', marginRight: "5px"}}>Welcome, { user.name }! | <button className="btn-small btn-danger" onClick={handleLogout}>LOGOUT</button></li> : <li><Link style={{marginTop: "15px", border: "2px solid black", paddingBottom: "8px", paddingRight: "8px", paddingLeft: "8px", backgroundColor: "white", borderRadius: "20px"}} to={'/login-register'}>Sign-In</Link></li>}
        </ul>
      </div>
    </div>
  )
}

export default Navbar;