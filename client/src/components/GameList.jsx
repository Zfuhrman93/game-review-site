import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { Link } from 'react-router-dom';
import Platforms from './Platforms';

const GameList = (props) => {
  const [ gameList, setGameList ] = useState([]);
  useEffect(() => {
    axios.get(`${API_BASE}/api/game`)
      .then(allGames => {
        setGameList(allGames.data)
      })
      .catch((err) => {
        console.error(err);
      })
  }, [])


  return(
    <>
      <h2 className="section-title">Games <small>{gameList.length} on the site</small></h2>
      {gameList.length === 0 ? <p className="empty">No games yet.</p> : null}
      <div className="game-grid">
        {gameList.map((game) => {
          return(
            <Link key={game._id} className="game-card" to={`/game/${game._id}`}>
              <img className="game-card-cover" src={game.gameCover} alt={game.name}/>
              <div className="game-card-body">
                <div className="game-card-name">{game.name}</div>
                <Platforms game={game} />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default GameList;
