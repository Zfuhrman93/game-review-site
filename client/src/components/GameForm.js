import { useState } from 'react';
import Navbar from './Navbar';

const GameForm = (props) => {
  return(
    <div>
      <div>
        <Navbar />
        <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px", backgroundColor: "white"}}>
          <form>
            <label>Game Name:</label><br/><input type="text" /><br/>
            <label>Systems</label><br/>
            <input type='checkbox' /><label>Xbox One</label>
            <input type='checkbox' /><label>PS4</label>
            <input type='checkbox' /><label>Switch</label>
            <input type='checkbox' /><label>PC</label><br/>
            <label>Game Cover URL</label><br/><input type="text" /><br/>
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default GameForm;