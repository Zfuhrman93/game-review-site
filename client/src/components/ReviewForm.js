import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ReviewForm = (props) => {
  const { user, id } = props;
  const navigate = useNavigate();
  const [ review, setReview ] = useState("");
  const [ score, setScore ] = useState("1");
  const [ game, setGame ] = useState("");
  const [ errors, setErrors ] = useState([]);

  useEffect(()  => {
    async function fetchData() {
      try{
        const gameData = await axios.get(`http://localhost:8000/api/game/${id}`);
        setGame(gameData.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(game[0].name)
    try{
      const result = await axios.post('http://localhost:8000/api/review', {
        review,
        score,
        game: id,
        gameName: game[0].name
      }, { withCredentials: true })
      console.log(result);
      navigate('/');
      window.location.reload(false);
    }catch(err){
      console.log(err.response.data.errors);
      setErrors(err.response.data.errors);
    }
  }

  return(
    <div className="form-card">
      <h2>Add a new review</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="review">Your review</label>
          <textarea id="review" onChange={(e) => setReview(e.target.value)} />
          {errors.review ? <p className="error-text">{errors.review.message}</p> : null}
          {errors.game ? <p className="error-text">{errors.game.message}</p> : null}
        </div>
        <div className="field">
          <label>Score</label>
          <select onChange={(e) => setScore(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <input type="submit" value="Add Review" className="btn-primary-gradient" disabled={user ? false : true} />
        {user ? null : <p className="error-text">Please log in to add a review!</p>}
      </form>
    </div>
  )
}

export default ReviewForm;
