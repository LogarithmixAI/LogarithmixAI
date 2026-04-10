// contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { authApi } from "../services/api/auth"; // 👈 direct import, avoids index.ts issues
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
  ) => Promise<{ success: boolean; message?: string; user?: User }>;
  loginWithRole: (
    email: string,
    password: string,
    role: string,
    organization?: string,
  ) => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => void;
  signup: (
    email: string,
    password: string,
    username: string,
    role: string,
    additionalData?: any,
  ) => Promise<{ success: boolean; message?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
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
      if (!token) {
        setLoading(false);
        return;
      }

      // Try to get current user – if endpoint not ready, just accept token as valid
      try {
        const response = await authApi.getCurrentUser();
        const userData = response.data?.user || response.data;
        if (userData?.id) {
          setUser(mapUser(userData));
        } else {
          // Fallback: create a minimal user from token (no backend call)
          console.warn(
            "getCurrentUser endpoint not fully implemented, using minimal user",
          );
          setUser({
            id: "local",
            email: "user@example.com",
            name: "User",
            role: "viewer",
            permissions: ["view_dashboards"],
          });
        }
      } catch (err) {
        console.warn("Failed to fetch user, but token exists:", err);
        // Still consider user authenticated (token exists) – but with limited data
        setUser({
          id: "unknown",
          email: "unknown",
          name: "User",
          role: "viewer",
          permissions: ["view_dashboards"],
        });
      }
    } catch (error) {
      console.error("Auth check error:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authApi.getCurrentUser();
      const userData = response.data?.user || response.data;
      if (userData?.id) setUser(mapUser(userData));
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      const token = response.data?.token || response.data?.access_token;
      const userData =
        response.data?.user || response.data?.data?.user || response.data;

      if (token) {
        localStorage.setItem("token", token);
        if (userData?.id) {
          setUser(mapUser(userData));
        } else {
          await refreshUser();
        }
        toast.success("Login successful!");
        return { success: true, user: user || undefined };
      }
      const message = response.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    } catch (error: any) {
      console.error("Login error:", error);
      const message =
        error.response?.data?.message || error.message || "Login failed";
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
    try {
      const response = await authApi.login({
        email,
        password,
        role,
        organization,
      });
      const token = response.data?.token || response.data?.access_token;
      const userData =
        response.data?.user || response.data?.data?.user || response.data;
      if (token) {
        localStorage.setItem("token", token);
        if (userData?.id) setUser(mapUser(userData));
        else await refreshUser();
        toast.success(`Logged in as ${role}`);
        return { success: true, user: user || undefined };
      }
      const message = response.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out");
    }
  };

  const signup = async (
    email: string,
    password: string,
    username: string,
    role: string,
    additionalData?: any,
  ) => {
    try {
      const userData = { email, password, username, role, ...additionalData };
      const response = await authApi.register(userData);
      if (response.data?.success) {
        const token = response.data.token;
        const newUser = response.data.user;
        if (token) {
          localStorage.setItem("token", token);
          if (newUser?.id) setUser(mapUser(newUser));
        }
        toast.success("Account created!");
        return { success: true };
      }
      const message = response.data?.message || "Registration failed";
      toast.error(message);
      return { success: false, message };
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Helper to map backend user to frontend User interface
  const mapUser = (data: any): User => ({
    id: data.id,
    email: data.email,
    name: data.username || data.name,
    role: data.role || "viewer",
    organization: data.organization,
    permissions: data.permissions || ["view_dashboards"],
    avatar: data.avatar,
    lastActive: data.lastActive,
  });

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    loginWithRole,
    logout,
    signup,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
