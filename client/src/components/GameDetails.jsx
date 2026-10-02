import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { useNavigate } from 'react-router-dom';
import Platforms from './Platforms';
import ReviewText from './ReviewText';

const scoreClass = (score) => Number(score) >= 4 ? 'score high' : Number(score) <= 2 ? 'score low' : 'score';

const GameDetails = (props) => {
  const { id, user } = props;
  const navigate = useNavigate();
  const [ gameData, setGameData ] = useState({});
  const [ reviews, setReviews ] = useState([]);

  useEffect(()  => {
    axios.get(`${API_BASE}/api/game/${id}`)
      .then((game) => {
        setGameData(game.data[0])
      })
      .catch((err) => {
        console.error(err);
      })
    fetchData();
    async function fetchData() {
      try{
        const reviewData = await axios.get(`${API_BASE}/api/review/${id}`);
        setReviews(reviewData.data);
      }catch(err){
        console.error(err);
      }
    }
  }, [])

  const deleteGame = async (gameId) => {
    try{
      await axios.delete(`${API_BASE}/api/game/${gameId}`, { withCredentials: true });
      navigate('/');
    }catch(err){
      console.error(err);
    }
  }

  const handleDelete = (reviewId) => {
    axios.delete(`${API_BASE}/api/review/${reviewId}`, { withCredentials: true })
      .then(() => {
        window.location.reload(false);
      })
      .catch(err => console.error(err))
  }

  return(
    <div key={gameData._id}>
      <div className="details-hero">
        {gameData.gameCover ? <img className="details-cover" src={gameData.gameCover} alt={gameData.name} /> : <div />}
        <div className="details-info">
          <h1>{gameData.name}</h1>
          <Platforms game={gameData} large />
          {user && user.admin ? <button className="btn-danger-solid" onClick={() => deleteGame(id)}>Delete Game</button> : null}
        </div>
      </div>

      <h2 className="section-title">Reviews <small>{reviews.length}</small></h2>
      {reviews.length === 0 ? <p className="empty">No reviews yet. Be the first!</p> : null}
      {reviews.map((review) => {
        return(
          <div key={review._id} className="review-card">
            <div className="review-card-head">
              <span>Review by <strong>{review.userName}</strong></span>
              <span className={scoreClass(review.score)}>{review.score}/5</span>
            </div>
            <ReviewText text={review.review} />
            {user && review.user === user._id || user && user.admin ? <div className="review-actions">
              <button className='btn-ghost' onClick={() => navigate(`/review/edit/${review._id}`)}>Edit</button>
              <button className='btn-ghost danger' onClick={() => handleDelete(review._id)}>Delete</button>
            </div> : null}
          </div>
        )
      })}
    </div>
  )
}

export default GameDetails;
