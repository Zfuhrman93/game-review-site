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
    <div>
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
                  <td><img style={{height: "120px"}} src={game.gameCover} alt=""/></td>
                  <td><Link to={`/game/${game._id}`}>{game.name}</Link></td>
                  <td>{game.systems[0] === "true" ? "Xbox" : null} {game.systems[1] === "true" ? "PS4" : null} {game.systems[2] === "true" ? "Switch" : null} {game.systems[3] === "true" ? "PC" : null}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GameList;