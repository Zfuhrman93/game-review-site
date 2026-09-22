import { useParams } from 'react-router-dom';
import GameDetails from '../components/GameDetails';
import ReviewForm from '../components/ReviewForm';
import Navbar from '../components/Navbar';

const GameDetailsView = (props) => {
  const { user } = props;
  const { id } = useParams();

  return(
    <div>
      <Navbar user={user} />
      <div className="page page-narrow">
        <GameDetails user={user} id={id} />
        <ReviewForm user={user} id={id} />
      </div>
    </div>
  )
}

export default GameDetailsView;
