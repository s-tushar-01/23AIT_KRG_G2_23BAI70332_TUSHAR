import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  return React.createElement(
    AuthContext.Provider,
    { value: { isAuthenticated, login, logout } },
    children
  );
};

export const useAuth = () => useContext(AuthContext);
