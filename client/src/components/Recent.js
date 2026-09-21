import { useState, useEffect } from 'react';
import axios from 'axios';

const scoreClass = (score) => Number(score) >= 4 ? 'score high' : Number(score) <= 2 ? 'score low' : 'score';

const Recent = (props) => {
  const [ recentReviews, setRecentReviews ] = useState([]);

  async function fetchData(){
    try{
      const recents = await axios.get('http://localhost:8000/api/review/recent');
      console.log('Recents:')
      console.log(recents);
      setRecentReviews(recents.data);
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return(
    <>
      <h2 className="section-title">Recent reviews</h2>
      <div className="recent-list">
        {recentReviews.length === 0 ? <p className="empty">No reviews yet.</p> : null}
        {recentReviews.map((reviews) => {
          return(
            <div key={reviews._id} className="recent-item">
              <span className="recent-game">{reviews.gameName}</span>
              <div className="recent-item-head">
                <span>by <strong>{reviews.userName}</strong></span>
                <span className={scoreClass(reviews.score)}>{reviews.score}/5</span>
              </div>
              <p>"{reviews.review}"</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Recent;
