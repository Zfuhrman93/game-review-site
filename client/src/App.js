import { useState, useEffect } from 'react';
import axios from 'axios'
import HomeView from './views/HomeView';
import LoginRegister from './views/LoginRegister';
import GameForm from './components/GameForm';
import ReviewForm from './components/ReviewForm';
import UpdateReview from './components/UpdateReview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import GameDetailsView from './views/GameDetailsView';

const realError = console.error;
console.error = (...x) => {
  if (x[0] === 'Warning: The tag <hl> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.') {
    return;
  }
  realError(...x);
};

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
      <BrowserRouter>
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
