import React from 'react';
const Navbar = React.lazy(() => import('../components/Navbar'));
const GameList = React.lazy(() => import('../components/GameList'));
const Recent = React.lazy(() => import('../components/Recent'));

const HomeView = (props) => {
  const { user } = props;
  return(
    <React.Fragment>
      <React.Suspense fallback={"Loading"}>
        <Navbar user={user} />
      </React.Suspense>
      <React.Suspense fallback={"loading"}>
        <div className="page home-layout">
          <div>
            <GameList />
          </div>
          <div>
            <Recent />
          </div>
        </div>
      </React.Suspense>
    </React.Fragment>
  )
}

export default HomeView;
