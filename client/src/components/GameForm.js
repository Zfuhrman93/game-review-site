import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { navigate } from '@reach/router';

const GameForm = (props) => {
  const { user } = props;
  const [ name, setName ] = useState("");
  const [ xbox, setXbox ] = useState(false);
  const [ PS4, setPS4 ] = useState(false);
  const [ nSwitch, setNSwitch ] = useState(false);
  const [ PC, setPC ] = useState(false);
  const [ gameCover, setGameCover ] = useState("");
  const [ errors, setErrors ] = useState([]);
  let formData = new FormData();

  useEffect(() => {
    if(!user) navigate('/');
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
      const result = await axios.post('http://localhost:8000/api/game/add', formData)
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
      <div>
        <Navbar user={user} />
        <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px", backgroundColor: "white", width: "275px", marginTop: "35px"}}>
          <form  onSubmit={handleSubmit}>
            <label>Game Name:</label><br/><input name="name" type="text" onChange={(e) => setName(e.target.value)} /><br/>
            {errors.name ? <p style={{color: "red"}}>{errors.name.message}</p> : null}
            <label>Systems</label><br/>
            <input type='checkbox' name='xbox' value={xbox} onChange={() => setXbox(!xbox)} /><label style={{marginRight: "5px"}}>Xbox One</label>
            <input type='checkbox' name='PS4' value={PS4} onChange={() => setPS4(!PS4)} /><label style={{marginRight: "5px"}}>PS4</label>
            <input type='checkbox' name='nSwitch' value={nSwitch} onChange={() => setNSwitch(!nSwitch)} /><label style={{marginRight: "5px"}}>Switch</label>
            <input type='checkbox' name='PC' value={PC} onChange={() => setPC(!PC)} /><label style={{marginRight: "5px"}}>PC</label><br/>
            {!xbox && !PS4 && !nSwitch && !PC ? <p style={{color: "red"}}>Please select at least one system</p> : null}
            <label>Game Cover URL</label><br/><input name='file' type="file" accept=".jpeg, .jpg, .png" onChange={((e) => setGameCover(e.target.files[0]))} /><br/>
            <input type="submit" value="Add Game" style={{marginTop: "7px"}} disabled={user ? false : true} />
            {user ? null : <p style={{color: "red"}}>Please log in to add a game!</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default GameForm;