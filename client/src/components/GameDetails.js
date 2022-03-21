import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const GameDetails = (props) => {
  const { id, user } = props;
  const [ gameData, setGameData ] = useState({});
  const [ reviews, setReviews ] = useState([]);

  useEffect(()  => {
    console.log(user)
    fetchData();
    async function fetchData() {
      try{
        const data = await axios.get(`http://localhost:8000/api/game/${id}`)
        console.log(data);
        setGameData(data.data[0])
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

  const handleDelete = (reviewId) => {
    axios.delete(`http://localhost:8000/api/review/${reviewId}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err.response))
  }
  return(
    <div>
      <div>
        <Navbar user={user} />
      </div>
      <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", padding: "5px", backgroundColor: "white", width: "700px", marginTop: "35px"}}>
        <div>
          <img style={{height: "500px"}} src={gameData.gameCover} />
        </div>
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
                <div style={{marginTop: "15px"}}>
                  Review by {review.userName} | Score: {review.score}/5
                  <p>{review.review}</p>
                  {user && review.user == user._id ? <span><button className='btn-small btn-info' onClick={() => navigate(`/review/edit/${review._id}`)}>Edit</button> | <button className='btn-small btn-danger' onClick={() => handleDelete(review._id)}>Delete</button></span> : null}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default GameDetails;