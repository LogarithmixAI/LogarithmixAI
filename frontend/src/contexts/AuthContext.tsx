// contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { authApi } from "../services/api";
import { toast } from "react-hot-toast";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string;
  permissions: string[];
  avatar?: string;
  lastActive?: string;
}

export type UserRole =
  | "super_admin"
  | "org_admin"
  | "security_analyst"
  | "devops_engineer"
  | "ai_analyst"
  | "viewer";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  loginWithRole: (
    email: string,
    password: string,
    role: string,
    organization?: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  signup: (userData: any) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await authApi.getCurrentUser();
        if (response.data) {
          setUser(response.data);
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        toast.success("Login successful!");
        return { success: true };
      } else {
        toast.error(response.data?.message || "Login failed");
        return { success: false, message: response.data?.message };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const loginWithRole = async (
    email: string,
    password: string,
    role: string,
    organization?: string,
  ) => {
    return login(email, password);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

  const signup = async (userData: any) => {
    try {
      const response = await authApi.register(userData);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        toast.success("Account created successfully!");
        return { success: true };
      } else {
        toast.error(response.data?.message || "Registration failed");
        return { success: false, message: response.data?.message };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        loginWithRole,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
