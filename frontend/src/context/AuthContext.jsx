import React, { createContext, useState, useEffect } from "react";
import { registerApi, loginApi, logoutApi, meApi } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Register function
    const register = async (formData) => {
        const response = await registerApi(formData);
        setUser(response.data.user);
        return response.data;
    }

    // Login function
    const login = async (formData) => {
        const response = await loginApi(formData);
        setUser(response.data.user);
        navigate("/");
        return response.data;
    }

    // Logout function
    const logout = async () => {
        const response = await logoutApi();
        setUser(null);
        return response.data;
    }

    // Fetch user on initial load (on component mount)
useEffect(() => {
  const fetchUser = async () => {
    setLoading(true); // ✅ Ensure loading starts as true
    try {
      const response = await meApi();
      
      setUser(response.data.user); // or response.data.user
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false); // ✅ End loading only after everything
    }
  };

  fetchUser();
}, []);





    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
