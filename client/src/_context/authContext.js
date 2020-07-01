import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

  const [authData, setAuthData] = useState({
    isAuthenticated: false,
    userData: ''
  })

  const setUser = (userData) => {
    console.log(userData);
    let isAuthenticated = !!userData.userId;
    setAuthData({ isAuthenticated, userData })
  }

  return (
    <AuthContext.Provider
      value={{ authData, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );

}


export default AuthContextProvider;