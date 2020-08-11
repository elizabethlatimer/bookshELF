import React, { useEffect, useContext } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Auth from './Auth';
import Home from './Home';
import SiteNav from './SiteNav';
import Library from './Library';
import Collection from './Collection';
import BookDetail from './BookDetail';
import backendAPI from './utils/backendAPI'

import jwt_decode from 'jwt-decode'
import UserContext from './utils/userContext';

function Routes() {
  const { updateUser, loggedIn, updateLoggedIn, logout } = useContext(UserContext);

  useEffect(() => {
    checkToken();
    if (loggedIn) {
      getCurrentUser()
    }
  }, [loggedIn])

  function checkToken() {
    let token = localStorage.getItem("_token");
    updateLoggedIn(token ? true : false);
  }

  async function getCurrentUser() {
    let token = localStorage.getItem("_token");
    let decoded = jwt_decode(token);
    let currentUser = await backendAPI.getUser(decoded.username);
    updateUser(currentUser);
  }

  return (
    <BrowserRouter>
      <SiteNav isLoggedIn={loggedIn} logout={logout} />
      <Switch >
        <Route exact path="/">
          {loggedIn ? <Redirect to="/library" /> : <Home />}
        </Route>
        <Route exact path="/login">
          {loggedIn ? <Redirect to="/library" /> : <Auth view="login"/>}
        </Route>
        <Route exact path="/signup">
          {loggedIn ? <Redirect to="/library" /> : <Auth view="signup"/>}
        </Route>
        <Route exact path="/library">
          {loggedIn ? <Library /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/collection/:id">
          {loggedIn ? <Collection /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/book/:id">
          {loggedIn ? <BookDetail /> : <Redirect to="/" />}
        </Route>

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )

}

export default Routes;