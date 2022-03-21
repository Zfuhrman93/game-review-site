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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const result = axios.post('http://localhost:8000/api/game', {
        name,
        systems: [xbox, PS4, nSwitch, PC],
        gameCover
      })
      console.log(result);
      navigate('/home')
    }catch(err){
      console.log(err);
    }
  }

  return(
    <div>
      <div>
        <Navbar user={user} />
        <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px", backgroundColor: "white", width: "275px", marginTop: "35px"}}>
          <form onSubmit={handleSubmit}>
            <label>Game Name:</label><br/><input type="text" onChange={(e) => setName(e.target.value)} /><br/>
            <label>Systems</label><br/>
            <input type='checkbox' value={xbox} onChange={() => setXbox(!xbox)} /><label style={{marginRight: "5px"}}>Xbox One</label>
            <input type='checkbox' value={PS4} onChange={() => setPS4(!PS4)} /><label style={{marginRight: "5px"}}>PS4</label>
            <input type='checkbox' value={nSwitch} onChange={() => setNSwitch(!nSwitch)} /><label style={{marginRight: "5px"}}>Switch</label>
            <input type='checkbox' value={PC} onChange={() => setPC(!PC)} /><label style={{marginRight: "5px"}}>PC</label><br/>
            <label>Game Cover URL</label><br/><input type="text" onChange={(e) => setGameCover(e.target.value)}  /><br/>
            <input type="submit" value="Add Game" disabled={user ? false : true} />
            {user ? null : <p style={{color: "red"}}>Please log in to add a game!</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default GameForm;