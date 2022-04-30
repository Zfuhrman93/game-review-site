import React from 'react';
import { Suspense } from 'react';
const Navbar = React.lazy(() => import('../components/Navbar'));
const GameList = React.lazy(() => import('../components/GameList'));
const Recent = React.lazy(() => import('../components/Recent'));


const HomeView = (props) => {
  const { user } = props;
  return(
    <div style={{textAlign: 'center'}}>
      <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar user={user} />
      </Suspense>
      </div>
      <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px"}}>
        <Suspense fallback={<div>Loading...</div>}>
          <GameList />
          <Recent />
        </Suspense>
      </div>
    </div>
  )
}

export default HomeView;