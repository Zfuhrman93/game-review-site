import { useState, useEffect } from 'react';
import axios from 'axios';

const Recent = (props) => {
  const [ recentReviews, setRecentReviews ] = useState([]);

  useEffect(() => {
    async function fetchData(){
      try{
        const recents = await axios.get('http://localhost:8000/api/review/recent');
        console.log(recents);
        setRecentReviews(recents.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [])
  return(
    <div>
      <div style={{border: "2px solid lightgrey", marginLeft: "10px", padding: "10px"}}>
        {recentReviews.map((reviews) => {
          return(
            <p key={reviews._id}>{reviews.userName} gave {reviews.gameName} a {reviews.score}/5!</p>
          )
        })}
      </div>
    </div>
  )
}

export default Recent;