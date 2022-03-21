import { useState, useEffect } from 'react';
import axios from 'axios';

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
            <th>Cover</th>
            <th>Name</th>
          </thead>
          <tbody>
            {gameList.map((game) => {
              return(
                <tr key={game._id}>
                  <th><img src={game.gameCover} alt=""/></th>
                  <th>{game.name}</th>
                  <td>{game.systems}</td>
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