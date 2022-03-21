import { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Register = (props) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] =useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ errors, setErrors ] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { name, email, password, confirmPassword };
    try{
      const result = await axios.post("http://localhost:8000/api/register", postData)
      console.log(result)
    }catch(err){
      console.log(err)
    }
    
  }
  return(
    <div>
      <div>
        <Navbar />
        <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px", width: "275px", marginTop: "35px"}}>
          <form onSubmit={handleSubmit}>
            <label>User Name:</label><br/><input type='text' onChange={e => {setName(e.target.value)}} /><br/>
            <label>E-mail:</label><br/><input type='text' onChange={e => {setEmail(e.target.value)}} /><br/>
            <label>Password:</label><br/><input type='text' onChange={e => {setPassword(e.target.value)}} /><br/>
            <label>Confirm Password:</label><br/><input type='text' onChange={e => {setConfirmPassword(e.target.value)}} /><br/>
            <input type='submit' style={{marginTop: "5px"}} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;