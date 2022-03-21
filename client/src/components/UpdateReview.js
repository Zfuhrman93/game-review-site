import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { navigate } from '@reach/router';

const UpdateReview = (props) => {
  const { id, user } = props;
  const [ review, setReview ] = useState("");
  const [ score, setScore ] = useState("1");

  useEffect(()  => {
    async function fetchData() {
      try{
        const reviewUpdate = await axios.get(`http://localhost:8000/api/review/edit/${id}`);
        console.log(reviewUpdate.data[0]);
        setReview(reviewUpdate.data[0].review);
        setScore(reviewUpdate.data[0].score);
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const result = axios.put(`http://localhost:8000/api/review/${id}`, {
        review,
        score,
      })
      console.log(result);
      navigate('/home')
    }catch(err){
      console.log(err);
    }
  }

  return(
    <div>
      <div>
        <Navbar user={user} />
        <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px", backgroundColor: "white", width: "675px", marginTop: "35px"}}>
          <form onSubmit={handleSubmit}>
            <label>Your Review:</label><br/><textarea cols="75" value={review} onChange={(e) => setReview(e.target.value)} /><br/>
            <label>Score</label><select value={score} onChange={(e) => setScore(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select><br/>
            <input type="submit" value="Add Review" disabled={user ? false : true} />
            {user ? null : <p style={{color: "red"}}>Please log in to add a review!</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateReview;