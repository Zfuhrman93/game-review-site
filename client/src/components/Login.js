import { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Login = (props) => {
  const [ email, setEmail ] =useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const newLogin = axios.post('http://localhost:8000/api/login',
      email,
      password
      )
      console.log(newLogin)
    }catch(err){
      console.log(err);
    }
  }
  
  return(
    <div>
      <div>
        <Navbar />
        <div>
          <form onSubmit={handleSubmit}>
            <label>E-mail:</label><input type='text' onChange={e => {setEmail(e.target.value)}} /><br/>
            <label>Password:</label><input type='text' onChange={e => {setPassword(e.target.value)}} /><br/>
            <input type='submit' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;