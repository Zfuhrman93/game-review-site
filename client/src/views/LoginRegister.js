import Login from '../components/Login';
import Register from '../components/Register';
import Navbar from '../components/Navbar';

const LoginRegister = (props) => {
  const { user } = props;
  
  return(
    <div>
      <Navbar />
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Login user={user} />
        <Register user={user} />
      </div>
    </div>
  )
}

export default LoginRegister;