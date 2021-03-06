import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

const GameList = (props) => {
  const [ gameList, setGameList ] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/api/game')
      .then(allGames => {
        console.log(allGames);
        setGameList(allGames.data)
      })
      .catch((err) => {
        console.log(err.response);
      })
  }, [])

  
  return(
    <>
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Name</th>
              <th>Systems</th>
            </tr>
          </thead>
          <tbody>
            {gameList.map((game) => {
              return(
                <tr key={game._id}>
                  <td><img style={{height: "200px", width: "150px"}} src={require('../images/' + game.gameCover)} alt=""/></td>
                  <td><Link to={`/game/${game._id}`}>{game.name}</Link></td>
                  <td>{game.xbox ? <img style={{height: "24px", width: "24px"}} src={require("../assets/Xbox.png")} alt="Xbox" /> : null} 
                  {game.PS4 ? <img style={{height: "24px", width: "24px"}} src={require("../assets/PS4.png")} alt="PS4" /> : null} 
                  {game.nSwitch ? <img style={{height: "24px", width: "24px"}} src={require("../assets/Switch.png")} alt="Switch"/> : null} 
                  {game.PC ? <img style={{height: "24px", width: "24px"}} src={require("../assets/Steam.png")} alt="PC"/> : null}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default GameList;