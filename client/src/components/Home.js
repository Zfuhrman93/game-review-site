import { useState } from 'react';
import Navbar from './Navbar';
import GameList from './GameList';
import Recent from './Recent';


const Home = (props) => {
  return(
    <div>
      <div>
        <Navbar />
      </div>
      <div style ={{display: "flex", padding: "5px"}}>
        <GameList />
        <Recent />
      </div>
    </div>
  )
}

export default Home;