import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();
  const [ email, setEmail ] =useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { email, password };
    try{
      const result = await axios.post(`${API_BASE}/api/login`,
      postData,
      { withCredentials: true }
    )
      console.log(result);
      navigate('/');
      window.location.reload(false);
    }catch(err){
      console.log(err.response.data);
      setErrors(err.response.data);
    }
  }

  return(
    <div className="form-card login">
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit}>
        {errors && errors.error ? <p className="error-text">{errors.error}</p> : null}
        <div className="field">
          <label>E-mail</label>
          <input type='text' onChange={e => {setEmail(e.target.value)}} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type='password' onChange={e => {setPassword(e.target.value)}} />
        </div>
        <input type='submit' value="Log in" className="btn-primary-gradient" />
      </form>
    </div>
  )
}

export default Login;
