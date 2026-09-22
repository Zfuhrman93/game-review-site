import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Navbar = (props) => {
  const navigate = useNavigate();
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
    <div className="nav-bar">
      <ul>
        <li className="nav-brand"><Link to={"/"}>Game Review</Link></li>
        {user && user.admin ? <li><Link to={"/game/new"}>+ Add a Game</Link></li> : null}
      </ul>
      <ul>
        { user ? <>
          <li className="nav-welcome"><span className="nav-welcome-text">Welcome, </span><strong>{ user.name }</strong></li>
          <li><button className="btn-ghost danger" onClick={handleLogout}>Log out</button></li>
        </> : <li><Link className="nav-cta" to={'/login-register'}>Sign in</Link></li>}
      </ul>
    </div>
  )
}

export default Navbar;
