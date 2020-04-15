import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Login from './Auth/Login';
import Signup from './Auth/Signup'
import Home from './Home';
import SiteNav from './SiteNav';

import jwt_decode from 'jwt-decode'
import UserContext from './utils/userContext';

function Routes() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const { updateUser } = useContext(UserContext);

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
  //   let currentUser = await JoblyAPI.getUser(decoded.username);
  //   updateUser(currentUser);
  // }

  // async function login(currentUser) {
  //   let token = await JoblyAPI.loginUser(currentUser)
  //   localStorage.setItem("_token", token);
  //   setLoggedIn(true);
  // }

  function logout() {
    localStorage.removeItem("_token");
    setLoggedIn(false);
    updateUser(null);
  }

  // async function create(currentUser) {
  //   let token = await JoblyAPI.createUser(currentUser);
  //   localStorage.setItem("_token", token);
  //   setLoggedIn(true);
  // }

  return (
    <BrowserRouter>
      <SiteNav isLoggedIn={isLoggedIn} logout={logout} />
      <Switch >
        <Route exact path="/">
          <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )

}

export default Routes;