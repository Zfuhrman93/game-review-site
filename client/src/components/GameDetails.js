import { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const GameDetails = (props) => {
  const { id, user } = props;
  const [ gameData, setGameData ] = useState({});
  const [ reviews, setReviews ] = useState([]);

  useEffect(()  => {
    console.log(user)
    axios.get(`http://localhost:8000/api/game/${id}`)
      .then((game) => {
        setGameData(game.data[0])
      })
      .catch((err) => {
        console.log(err.response);
      })
    fetchData();
    async function fetchData() {
      try{
        const reviewData = await axios.get(`http://localhost:8000/api/review/${id}`);
        console.log(reviewData);
        setReviews(reviewData.data);
      }catch(err){
        console.log(err)
      }
    }
  }, [])

  const deleteGame = async (gameId) => {
    try{
      const deleteGame = await axios.delete(`http://localhost:8000/api/game/${gameId}`);
      console.log(deleteGame);
      navigate('/');
    }catch(err){
      console.log(err);
    }
  }

  const handleDelete = (reviewId) => {
    axios.delete(`http://localhost:8000/api/review/${reviewId}`)
      .then(res => {
        console.log(res);
        window.location.reload(false);
      })
      .catch(err => console.log(err.response))
  }

  return(
    <div>
      <div key={gameData._id} className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", padding: "5px", backgroundColor: "white", width: "900px", marginTop: "35px"}}>
        <div style={{}}>
          {gameData.gameCover ? <img src={require('../images/' + gameData.gameCover)} alt={gameData.name} style={{height: "350px", width: "250px"}}  /> : null}
        </div>
        {user && user.admin ? <div>
          <button className="btn btn-danger" onClick={() => deleteGame(id)}>Delete Game</button><br/>
        </div> : null}
        <div style={{display:"flex", flexDirection: "column", textAlign: "center"}}>
          <p>{gameData.name}</p>
          {gameData && gameData.xbox ? <img style={{height: "48px", width: "48px"}} src={require("../assets/Xbox.png")} alt="Xbox" /> : null}
          {gameData && gameData.PS4 ? <img style={{height: "48px", width: "48px"}} src={require("../assets/PS4.png")} alt="PS4" /> : null}
          {gameData && gameData.nSwitch ? <img style={{height: "48px", width: "48px"}} src={require("../assets/Switch.png")} alt="Switch"/> : null}
          {gameData && gameData.PC ? <img style={{height: "48px", width: "48px"}} src={require("../assets/Steam.png")} alt="PC"/> : null}
        </div><br/>
        <div style={{width: "800px", textAlign: "center"}}>
            <h3 style={{marginTop: "15px"}}>Reviews</h3><br/>
            {reviews.map((review) => {
              return(
                <div key={review._id} style={{marginTop: "15px"}}>
                  Review by {review.userName} | Score: {review.score}/5
                  <p>{review.review}</p>
                  {user && review.user === user._id || user && user.admin ? <span><button className='btn btn-info' onClick={() => navigate(`/review/edit/${review._id}`)}>Edit</button> | <button className='btn btn-danger' onClick={() => handleDelete(review._id)}>Delete</button></span> : null}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default GameDetails;