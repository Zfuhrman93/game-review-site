import { useState, useEffect } from 'react';
import axios from 'axios'
import HomeView from './views/HomeView';
import LoginRegister from './views/LoginRegister';
import GameForm from './components/GameForm';
import ReviewForm from './components/ReviewForm';
import UpdateReview from './components/UpdateReview';
import { Router } from '@reach/router';
import './App.css';
import GameDetailsView from './views/GameDetailsView';

function App() {
  const [ user, setUser ] = useState();
  
  useEffect(()  => {
    async function fetchData() {
      try{
        const userData = await axios.get('http://localhost:8000/api/protected', 
        { withCredentials: true });
        try{
          const userName = await axios.get(`http://localhost:8000/api/user/${userData.data}`)
          setUser(userName.data[0]);
        }catch(err){
          console.log(err);
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="App" style={{height: "100%"}}>
      <Router>
        <HomeView user={user} path='/' />
        <GameDetailsView user={user} path='/game/:id' />
        <GameForm user={user} path='/game/new' />
        <ReviewForm user={user} path='/review/new' />
        <UpdateReview user={user} path='/review/edit/:id' />
        <LoginRegister user={user} path='/login-register' />
      </Router>
    </div>
  );
}

export default App;
