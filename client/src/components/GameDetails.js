import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const GameDetails = (props) => {
  const { id, user } = props;
  const [ gameData, setGameData ] = useState({});
  const [ topPick, setTopPick ] = useState(false);
  const [ reviews, setReviews ] = useState([]);

  useEffect(()  => {
    console.log(user)
    fetchData();
    async function fetchData() {
      try{
        const data = await axios.get(`http://localhost:8000/api/game/${id}`)
        console.log(data);
        setGameData(data.data[0])
        setTopPick(data.data[0].topPick)
      }catch(err){
        console.log(err)
      }
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

  const handleUpdate = async () => {
    try{
      const updatedGame = await axios.put(`http://localhost:8000/api/game/${id}`, {
        topPick
      })
      console.log(updatedGame);
    }catch(err){
      console.log(err)
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
      <div>
        <Navbar user={user} />
      </div>
      <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", padding: "5px", backgroundColor: "white", width: "900px", marginTop: "35px"}}>
        <div style={{}}>
          <img alt={gameData.name} style={{height: "500px", width: "400px"}} src={gameData.gameCover} />
        </div>
        {user && user.admin ? <div>
          <button className="btn btn-danger" onClick={() => deleteGame(id)}>Delete Game</button><br/>
          <label>Editor's Pick:</label><input style={{marginLeft: "10px", marginTop: "5px"}} checked={topPick} onChange={() => setTopPick(!topPick)} type="checkbox" /><br/>
          <button onClick={handleUpdate}>Update!</button>
        </div> : null}
        <div>
          <p style={{marginLeft: "45px"}}>{gameData.name}</p>
          {gameData.systems ? <div style={{border: "2px solid black", width: "150px", textAlign: "center"}}>
            {gameData && gameData.systems[0] == "true" ? <p>Xbox</p> : null}
            {gameData && gameData.systems[1] == "true" ? <p>PS4</p> : null}
            {gameData && gameData.systems[2] == "true" ? <p>Switch</p> : null}
            {gameData && gameData.systems[3] == "true" ? <p>PC</p> : null}
          </div> : null}
        </div><br/>
        <div style={{width: "500px"}}>
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