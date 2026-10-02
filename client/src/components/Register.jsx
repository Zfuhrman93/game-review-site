import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

const Register = (props) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] =useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ errors, setErrors ] = useState({});
  const [ formError, setFormError ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setFormError('');
    const postData = { name, email, password, confirmPassword };
    try{
      const result = await axios.post(`${API_BASE}/api/register`, postData)
      console.log(result)
      alert('Successful Registration!');
    }catch(err){
      console.log(err.response)
      // Mongoose validation failures come back as { errors: { field: {...} } };
      // everything else (duplicate email, rate limit) as { error: "..." }.
      setErrors(err.response?.data?.errors || {})
      setFormError(err.response?.data?.error || '')
    }

  }
  return(
    <div className="form-card">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>User Name</label>
          <input type='text' onChange={e => {setName(e.target.value)}} />
          {errors && errors.name ? <p className="error-text">{errors.name.message}</p> : null}
        </div>
        <div className="field">
          <label>E-mail</label>
          <input type='text' onChange={e => {setEmail(e.target.value)}} />
          {errors && errors.email ? <p className="error-text">{errors.email.message}</p> : null}
        </div>
        <div className="field">
          <label>Password</label>
          <input type='password' onChange={e => {setPassword(e.target.value)}} />
          {errors && errors.password ? <p className="error-text">{errors.password.message}</p> : null}
        </div>
        <div className="field">
          <label>Confirm Password</label>
          <input type='password' onChange={e => {setConfirmPassword(e.target.value)}} />
          {errors && errors.confirmPassword ? <p className="error-text">{errors.confirmPassword.message}</p> : null}
        </div>
        {formError ? <p className="error-text">{formError}</p> : null}
        <input type='submit' value="Sign up" className="btn-primary-gradient" />
      </form>
    </div>
  )
}

export default Register;
