import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE, REVIEW_MAX_LENGTH } from '../config';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateReview = (props) => {
  const { user } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [ review, setReview ] = useState("");
  const [ score, setScore ] = useState("1");
  const [ errors, setErrors ] = useState({});

  useEffect(()  => {
    async function fetchData() {
      try{
        const reviewUpdate = await axios.get(`${API_BASE}/api/review/edit/${id}`);
        setReview(reviewUpdate.data[0].review);
        setScore(reviewUpdate.data[0].score);
      }catch(err){
        console.error(err);
      }
    }
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.put(`${API_BASE}/api/review/${id}`, {
        review,
        score,
      }, { withCredentials: true })
      navigate('/')
    }catch(err){
      setErrors(err.response?.data?.errors || {});
    }
  }

  return(
    <div>
      <Navbar user={user} />
      <div className="page page-narrow">
        <div className="form-card">
          <h2>Edit your review</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Your review</label>
              <textarea value={review} maxLength={REVIEW_MAX_LENGTH} onChange={(e) => setReview(e.target.value)} />
              <span className="char-count">{review.length}/{REVIEW_MAX_LENGTH}</span>
              {errors.review ? <p className="error-text">{errors.review.message}</p> : null}
            </div>
            <div className="field">
              <label>Score</label>
              <select value={score} onChange={(e) => setScore(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <input type="submit" value="Save review" className="btn-primary-gradient" disabled={user ? false : true} />
            {user ? null : <p className="error-text">Please log in to add a review!</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateReview;
