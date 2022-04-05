import { useState } from 'react';
import axios from 'axios';

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
      alert('Successful Registration!');
    }catch(err){
      console.log(err.response)
      setErrors(err.response.data.errors)
    }
    
  }
  return(
    <div>
      <div>
        <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px", backgroundColor: "white", width: "275px", marginTop: "35px"}}>
          <form onSubmit={handleSubmit}>
            <label>User Name:</label><br/><input type='text' onChange={e => {setName(e.target.value)}} /><br/>
            {errors && errors.name ? <p style={{color: "red"}}>{errors.name.message}</p> : null}
            <label>E-mail:</label><br/><input type='text' onChange={e => {setEmail(e.target.value)}} /><br/>
            {errors && errors.email ? <p style={{color: "red"}}>{errors.email.message}</p> : null}
            <label>Password:</label><br/><input type='password' onChange={e => {setPassword(e.target.value)}} /><br/>
            {errors && errors.password ? <p style={{color: "red"}}>{errors.password.message}</p> : null}
            <label>Confirm Password:</label><br/><input type='password' onChange={e => {setConfirmPassword(e.target.value)}} /><br/>
            {errors && errors.confirmPassword ? <p style={{color: "red"}}>{errors.confirmPassword.message}</p> : null}
            <input type='submit' style={{marginTop: "5px"}} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;