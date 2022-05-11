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
        <div className="container" style = {{textalign: "center", marginTop: "5px", display: "flex", justifyContent: "center", padding: "5px"}}>
          <GameList />
          <Recent style={{height: "200px"}} />
        </div>
      </React.Suspense>
    </React.Fragment>
  )
}

export default HomeView;