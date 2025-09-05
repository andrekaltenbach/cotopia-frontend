import React, { useState, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const resetAuthState = () => {
    setIsLoggedIn(false);
    setIsLoading(false);
    setUser(null);
  };

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Set loading to true whenever we start a token verification
      setIsLoading(true);
      try {
        const response = await authService.verify();
        const user = response.data;
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
      } catch (error) {
        resetAuthState();
        // Re-throw the error so components calling this function can handle it
        throw error;
      }
    } else {
      resetAuthState();
    }
  };

  // const removeToken = () => {
  //   localStorage.removeItem('authToken');
  // };

  const logOutUser = () => {
    localStorage.removeItem('authToken');
    resetAuthState();
  };

  useEffect(() => {
    // We add a .catch() to prevent "unhandled promise rejection" warnings
    // if the initial token verification fails.
    authenticateUser().catch(() => {
      // The authenticateUser function already handles resetting the state.
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
