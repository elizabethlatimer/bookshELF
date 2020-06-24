import React, { useState } from 'react';
import Routes from '../Routes';
import UserContext from './userContext';
import backendAPI from './backendAPI';

function UserProvider() {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser)
  };

  // const login = async(currentUser) => {
  //   let token = await backendAPI.loginUser(currentUser)
  //   localStorage.setItem("_token", token);
  //   setLoggedIn(true);
  // }

  const logout = () => {
    localStorage.removeItem("_token");
    // setLoggedIn(false);
    updateUser(null);
  }

  // const create = async(currentUser) => {
  //   let token = await backendAPI.createUser(currentUser);
  //   localStorage.setItem("_token", token);
  //   setLoggedIn(true);
  // }

  return (
    <UserContext.Provider value={{ user, updateUser,  logout,  }}>
      <Routes />
    </UserContext.Provider>
  );
};

export default UserProvider;