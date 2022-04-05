import { useState, useEffect } from 'react';
import axios from 'axios';

const EditorPicks = (props) => {
  const [ gameList, setGameList ] = useState([]);
  useEffect(()  => {
    async function fetchData() {
      try{
        const gameListData = await axios.get('http://localhost:8000/api/game/top');
        setGameList(gameListData.data);
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  }, [])

  return(
    <div>
      Hello World!
    </div>
  )
}

export default EditorPicks;