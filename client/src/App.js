import Home from './components/Home';
import GameForm from './components/GameForm';
import ReviewForm from './components/ReviewForm';
import Login from './components/Login';
import Register  from './components/Register';
import { Router } from '@reach/router';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path='/home' />
        <GameForm path='/game/new' />
        <ReviewForm path='/review/new' />
        <Login path='/user/login' />
        <Register path ='/user/new' />
      </Router>
    </div>
  );
}

export default App;
