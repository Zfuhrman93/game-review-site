import React from 'react';
const Navbar = React.lazy(() => import('../components/Navbar'));
const GameList = React.lazy(() => import('../components/GameList'));
const Recent = React.lazy(() => import('../components/Recent'));

const HomeView = (props) => {
  const { user } = props;
  return(
    <React.Fragment>
      <React.Suspense fallback={"Loading"}>
        <div style={{textAlign: 'center'}}>
          <Navbar user={user} />
        </div>
      </React.Suspense>
      <React.Suspense fallback={"loading"}>
        <div className="container" style = {{marginTop: "5px", display: "flex", padding: "5px"}}>
          <div style={{flex: "3"}}>
            <GameList />
          </div>
          <div style={{height: "200px", flex: "1"}}>
            <Recent />
          </div>
        </div>
      </React.Suspense>
    </React.Fragment>
  )
}

export default HomeView;