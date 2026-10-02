import { useState, useEffect } from 'react';
import axios from 'axios'
import { API_BASE } from './config';
import HomeView from './views/HomeView';
import LoginRegister from './views/LoginRegister';
import GameForm from './components/GameForm';
import ReviewForm from './components/ReviewForm';
import UpdateReview from './components/UpdateReview';
import WakeBanner from './components/WakeBanner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import GameDetailsView from './views/GameDetailsView';

function App() {
  const [ user, setUser ] = useState();
  
  useEffect(()  => {
    async function fetchData() {
      try{
        const userData = await axios.get(`${API_BASE}/api/protected`,
        { withCredentials: true });
        const userName = await axios.get(`${API_BASE}/api/user/${userData.data}`)
        setUser(userName.data[0]);
      }catch(err){
        // A 401 just means nobody is logged in
        if(err.response?.status !== 401) console.error(err);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="App" style={{height: "100%"}}>
      <WakeBanner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path='/' element={<HomeView user={user} />} />
          <Route path='/game/:id' element={<GameDetailsView user={user} />} />
          <Route path='/game/new' element={<GameForm user={user} />} />
          <Route path='/review/new' element={<ReviewForm user={user} />} />
          <Route path='/review/edit/:id' element={<UpdateReview user={user} />} />
          <Route path='/login-register' element={<LoginRegister user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
