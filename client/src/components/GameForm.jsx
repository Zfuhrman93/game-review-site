import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const GameForm = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  const [ name, setName ] = useState("");
  const [ xbox, setXbox ] = useState(false);
  const [ PS4, setPS4 ] = useState(false);
  const [ nSwitch, setNSwitch ] = useState(false);
  const [ PC, setPC ] = useState(false);
  const [ gameCover, setGameCover ] = useState("");
  const [ errors, setErrors ] = useState([]);
  let formData = new FormData();

  useEffect(() => {
    if(!user || !user.admin) navigate('/');
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

    formData.append('name', name)
    formData.append('xbox',xbox)
    formData.append('PS4',PS4)
    formData.append('nSwitch',nSwitch)
    formData.append('PC',PC)
    formData.append('file',gameCover)

    try{
      const result = await axios.post(`${API_BASE}/api/game/add`, formData, { withCredentials: true })
      console.log(result);
      navigate('/')
      window.location.reload(false);;
    }catch(err){
      console.log(err.response.data);
      setErrors(err.response.data.errors);
    }
  }

  return(
    <div>
      <Navbar user={user} />
      <div className="page page-narrow">
        <div className="form-card">
          <h2>Add a game</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Game Name</label>
              <input name="name" type="text" onChange={(e) => setName(e.target.value)} />
              {errors.name ? <p className="error-text">{errors.name.message}</p> : null}
            </div>
            <div className="field">
              <span className="field-label">Systems</span>
              <div className="checks">
                <label className="check"><input type='checkbox' name='xbox' value={xbox} onChange={() => setXbox(!xbox)} />Xbox One</label>
                <label className="check"><input type='checkbox' name='PS4' value={PS4} onChange={() => setPS4(!PS4)} />PS4</label>
                <label className="check"><input type='checkbox' name='nSwitch' value={nSwitch} onChange={() => setNSwitch(!nSwitch)} />Switch</label>
                <label className="check"><input type='checkbox' name='PC' value={PC} onChange={() => setPC(!PC)} />PC</label>
              </div>
              {!xbox && !PS4 && !nSwitch && !PC ? <p className="error-text">Please select at least one system</p> : null}
            </div>
            <div className="field">
              <label>Game Cover</label>
              <input name='file' type="file" accept=".jpeg, .jpg, .png" onChange={((e) => setGameCover(e.target.files[0]))} />
            </div>
            <input type="submit" value="Add Game" className="btn-primary-gradient" disabled={user && user.admin ? false : true} />
            {user && user.admin ? null : <p className="error-text">Only admins can add a game.</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default GameForm;
