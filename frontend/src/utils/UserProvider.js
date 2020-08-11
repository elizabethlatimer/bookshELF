import React, { useState } from 'react';
import Routes from '../Routes';
import UserContext from './userContext';
import backendAPI from './backendAPI';

const INITIAL_COLLECTION_STATE = {};

function UserProvider() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [collections, setCollections] = useState(INITIAL_COLLECTION_STATE);

  const updateUser = (newUser) => {
    setUser(newUser)
  };

  const updateLoggedIn = (state) => {
    setLoggedIn(state);
  }

  const login = async(currentUser) => {
    let token = await backendAPI.loginUser(currentUser)
    localStorage.setItem("_token", token);
    setLoggedIn(true);

  }

  const logout = () => {
    localStorage.removeItem("_token");
    updateUser(null);
    setLoggedIn(false);
  }

  const create = async(currentUser) => {
    let token = await backendAPI.createUser(currentUser);
    localStorage.setItem("_token", token);
    setLoggedIn(true);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        loggedIn,
        updateLoggedIn,
        logout,
        login,
        create,
        collections,
        setCollections }}>
      <Routes />
    </UserContext.Provider>
  );
};

export default UserProvider;