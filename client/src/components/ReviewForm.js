import { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
const ReviewForm = (props) => {
  const { user, id } = props;
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
    try{
      const result = await axios.post('http://localhost:8000/api/review', {
        review,
        score,
        user: user._id,
        game: id,
        userName: user.name,
        gameName: game.name
      })
      console.log(result);
      navigate('/');
      window.location.reload(false);
    }catch(err){
      console.log(err.response.data.errors);
      setErrors(err.response.data.errors);
    }
  }

  return(
    <div>
      <div>
        <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px", backgroundColor: "white", width: "675px", marginTop: "35px"}}>
          <form onSubmit={handleSubmit}>
            <label>Add a new review:<br/><textarea id="review" label="review" cols="75" onChange={(e) => setReview(e.target.value)} /></label><br/>
            <label>Score<select onChange={(e) => setScore(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select></label><br/>
            <input type="submit" value="Add Review" style={{marginTop: "10px"}} disabled={user ? false : true} />
            {user ? null : <p style={{color: "red"}}>Please log in to add a review!</p>}
            {errors.review ? <p style={{color: "red"}}>{errors.review.message}</p> : null}
            {errors.game ? <p style={{color: "red"}}>{errors.game.message}</p> : null}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReviewForm;