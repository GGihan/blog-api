import { useState, useEffect, } from "react";
import { AuthContext } from "@/hooks/useAuth";
import { apiClient, TOKEN_KEY } from "@/config/api";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    async function verifySession() {
      const token = localStorage.getItem(TOKEN_KEY);
      // If a token doesnt exist, dont make a request at all
      if (!token) {
        setIsLoadingAuth(false);
        return;
      }

      try {
        const data = await apiClient('/users/me'); 
        setUser(data.user);
      } catch (error) {
        console.warn("Auth validation failed:", error.message);
        setUser(null);
      } finally {
        setIsLoadingAuth(false); 
      }
    }
    verifySession();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem(TOKEN_KEY, token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoadingAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};