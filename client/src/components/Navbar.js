import { Link } from '@reach/router';

const Navbar = (props) => {
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
          <li><Link to={'/user/login'}>Login</Link></li>
          <li style={{marginLeft: '5px', marginRight: "5px"}}>|</li>
          <li><Link to={'/user/new'}>Register</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;