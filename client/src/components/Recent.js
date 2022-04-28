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
            <div key={reviews._id} style={{borderBottom: "2px solid black", marginTop: "4px", backgroundColor: "white"}}>
              <p>{reviews.userName} gave {reviews.gameName} a {reviews.score}/5!</p>
              <p>"{reviews.review}"</p>
              <hl/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Recent;