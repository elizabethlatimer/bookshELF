import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Auth from './Auth';
import Home from './Home';
import SiteNav from './SiteNav';
import Library from './Library';
import Collection from './Collection';
import BookDetail from './BookDetail';

import jwt_decode from 'jwt-decode'
import UserContext from './utils/userContext';

function Routes() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const { user, updateUser, logout } = useContext(UserContext);

  //don't need to check if token is valid, just if there is one
  //backend validates token

  // useEffect(() => {
  //   checkToken();
  //   if (isloggedIn) {
  //     getCurrentUser()
  //   }
  // }, [isloggedIn])

  // function checkToken() {
  //   let token = localStorage.getItem("_token");
  //   setLoggedIn(token ? true : false);
  // }

  // async function getCurrentUser() {
  //   let token = localStorage.getItem("_token");
  //   let decoded = jwt_decode(token);
  //   let currentUser = await backendAPI.getUser(decoded.username);
  //   updateUser(currentUser);
  // }

  return (
    <BrowserRouter>
      <SiteNav isLoggedIn={isLoggedIn} logout={logout} />
      <Switch >
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Auth view="login"/>
        </Route>
        <Route exact path="/signup">
          <Auth view="signup"/>
        </Route>
        <Route exact path="/library">
          <Library />
        </Route>
        <Route exact path="/collection/:id">
          <Collection />
        </Route>
        <Route exact path="/book/:id">
          <BookDetail />
        </Route>

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )

}

export default Routes;