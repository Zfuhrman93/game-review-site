import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { navigate } from '@reach/router';

const Login = (props) => {
  const [ email, setEmail ] =useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { email, password };
    try{
      const result = axios.post('http://localhost:8000/api/login', 
      postData, 
      { withCredentials: true }
    )
      console.log(result);
      navigate('/home');
    }catch(err){
      console.log(err.message);
    }
  }
  
  return(
    <div className="login">
      <div>
        <Navbar />
        <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px"}}>
          <form onSubmit={handleSubmit}>
            <label>E-mail:</label><br/><input type='text' onChange={e => {setEmail(e.target.value)}} /><br/>
            <label>Password:</label><br/><input type='text' onChange={e => {setPassword(e.target.value)}} /><br/>
            <input type='submit' style={{marginTop: "5px"}} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;