import { useState, useEffect, } from "react";
import { AuthContext } from "@/hooks/useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    async function verifySession() {
      const token = localStorage.getItem('engrave_token');
      
      if (!token) {
        setIsLoadingAuth(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json(); 
        if (!response.ok) {
          throw new Error(data.message);
        }
        setUser(data.user);
      } catch (error) {
        console.warn("Auth validation failed:", error.message);
        localStorage.removeItem('engrave_token');
        setUser(null);
      } finally {
        setIsLoadingAuth(false); 
      }
    }
    verifySession();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('engrave_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('engrave_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoadingAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};