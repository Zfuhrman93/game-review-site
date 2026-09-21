import Login from '../components/Login';
import Register from '../components/Register';
import Navbar from '../components/Navbar';

const LoginRegister = (props) => {
  const { user } = props;

  return(
    <div>
      <Navbar />
      <div className="page">
        <div className="auth-grid">
          <Login user={user} />
          <Register user={user} />
        </div>
      </div>
    </div>
  )
}

export default LoginRegister;
