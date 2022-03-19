import { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Register = (props) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] =useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ errors, setErrors ] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const newUser = await axios.post('http://localhost:8000/api/register', {
      name,
      email,
      password,
      confirmPassword
    })
    console.log(newUser)
    }catch(err){
      console.log(err)
    }
    
  }
  return(
    <div>
      <div>
        <Navbar />
        <div>
          <form onSubmit={handleSubmit}>
            <label>User Name:</label><input type='text' onChange={e => {setName(e.target.value)}} /><br/>
            <label>E-mail:</label><input type='text' onChange={e => {setEmail(e.target.value)}} /><br/>
            <label>Password:</label><input type='text' onChange={e => {setPassword(e.target.value)}} /><br/>
            <label>Confirm Password:</label><input type='text' onChange={e => {setConfirmPassword(e.target.value)}} /><br/>
            <input type='submit' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;