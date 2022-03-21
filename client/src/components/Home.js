import { useState } from 'react';
import Navbar from './Navbar';
import GameList from './GameList';
import Recent from './Recent';


const Home = (props) => {
  const { user } = props;
  return(
    <div>
      <div>
        <Navbar user={user} />
      </div>
      <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px"}}>
        <GameList />
        <Recent />
      </div>
    </div>
  )
}

export default Home;