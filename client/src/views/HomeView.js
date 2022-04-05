import { useState } from 'react';
import EditorPicks from '../components/EditorPicks';
import Navbar from '../components/Navbar';
import GameList from '../components/GameList';
import Recent from '../components/Recent';


const HomeView = (props) => {
  const { user } = props;
  return(
    <div style={{textAlign: 'center'}}>
      <div>
        <Navbar user={user} />
      </div>
      <div>
        <EditorPicks />
      </div>
      <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px"}}>
        <GameList />
        <Recent />
      </div>
    </div>
  )
}

export default HomeView;