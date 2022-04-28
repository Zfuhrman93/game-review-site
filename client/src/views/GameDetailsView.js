import GameDetails from '../components/GameDetails';
import ReviewForm from '../components/ReviewForm';
import Navbar from '../components/Navbar';

const GameDetailsView = (props) => {
  const { user, id } = props;
  
  return(
    <div>
      <Navbar user={user} />
      <div style={{display: 'flex', flexDirection: "column", justifyContent: 'space-evenly'}}>
        <GameDetails user={user} id={id} />
        <ReviewForm user={user} id={id} />
      </div>
    </div>
  )
}

export default GameDetailsView;