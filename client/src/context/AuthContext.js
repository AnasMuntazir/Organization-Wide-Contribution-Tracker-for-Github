import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      const decoded = jwtDecode(auth.token);
      setAuth((prev) => ({ ...prev, user: decoded }));
    }
  }, [auth.token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuth({ token, user: jwtDecode(token) });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
