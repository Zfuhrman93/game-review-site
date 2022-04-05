import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { navigate } from '@reach/router';
const ReviewForm = (props) => {
  const { user } = props;
  const [ review, setReview ] = useState("");
  const [ score, setScore ] = useState("1");
  const [ game, setGame ] = useState("");
  const [ gameName, setGameName] = useState("");
  const [ gameList, setGameList ] = useState([]);
  const [ errors, setErrors ] = useState([]);

  useEffect(()  => {
    async function fetchData() {
      try{
        const gameListData = await axios.get('http://localhost:8000/api/game');
        setGameList(gameListData.data);
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
        game,
        userName: user.name,
        gameName
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
        <Navbar user={user} />
        <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px", backgroundColor: "white", width: "675px", marginTop: "35px"}}>
          <form onSubmit={handleSubmit}>
            <label>Your Review:</label><br/><textarea cols="75" onChange={(e) => setReview(e.target.value)} /><br/>
            <label>Score</label><select onChange={(e) => setScore(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select><br/>
            <label style={{marginRight: "15px"}}>Please Select a Game </label><select onChange={(e) => {setGame(e.target.value);setGameName(e.target.selectedOptions[0].label);console.log(e);}}>
              <option value="">----</option>
              {gameList.map((game) => {
                return(
                  <option name={game.name} value={game._id}>{game.name}</option>
                )
              })}
            </select><br/>
            <input type="submit" value="Add Review" disabled={user ? false : true} />
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