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
  ) => Promise<{ success: boolean; message?: string; user?: User }>;
  loginWithRole: (
    email: string,
    password: string,
    role: string,
    organization?: string,
  ) => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => void;
  signup: (userData: any) => Promise<{ success: boolean; message?: string }>;
  refreshUser: () => Promise<void>;
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
      console.log("🔍 Checking auth, token exists:", !!token);

      if (token) {
        console.log("📡 Fetching current user...");
        const response = await authApi.getCurrentUser();
        console.log("📥 Current user response:", response.data);

        if (response.data?.user) {
          setUser(response.data.user);
          console.log("✅ User set from token:", response.data.user.email);
        } else if (response.data) {
          // If the API returns user directly without wrapping
          setUser(response.data);
          console.log("✅ User set from token (direct):", response.data.email);
        } else {
          console.log("⚠️ No user data in response");
          localStorage.removeItem("token");
        }
      }
    } catch (error: any) {
      console.error("❌ Auth check failed:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authApi.getCurrentUser();
      if (response.data?.user) {
        setUser(response.data.user);
      } else if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log("🔐 Attempting login for:", email);

      const response = await authApi.login({ email, password });
      console.log("📥 Login response:", response.data);

      // Check different possible response structures
      const token = response.data?.token || response.data?.access_token;
      const userData =
        response.data?.user || response.data?.data?.user || response.data;

      if (token) {
        // Store the token
        localStorage.setItem("token", token);
        console.log("✅ Token stored successfully");

        // If user data is included in login response
        if (userData && typeof userData === "object" && userData.id) {
          setUser(userData);
          console.log("✅ User set from login response:", userData.email);
        } else {
          // Otherwise fetch user data
          console.log("🔄 Fetching user data after login...");
          await refreshUser();
        }

        toast.success("Login successful!");
        return { success: true, user: user };
      } else if (response.data?.success === false) {
        // API returned an error
        const message = response.data?.message || "Login failed";
        toast.error(message);
        return { success: false, message };
      } else {
        // No token in response
        console.warn("⚠️ No token in login response");
        toast.error("Invalid server response");
        return { success: false, message: "Invalid server response" };
      }
    } catch (error: any) {
      console.error("❌ Login error:", error);

      // Detailed error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);

        const message =
          error.response.data?.message ||
          error.response.data?.error ||
          `Login failed (${error.response.status})`;
        toast.error(message);
        return { success: false, message };
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        toast.error("Cannot connect to server");
        return { success: false, message: "Cannot connect to server" };
      } else {
        // Something happened in setting up the request
        console.error("Request error:", error.message);
        toast.error(error.message || "Login failed");
        return { success: false, message: error.message };
      }
    }
  };

  const loginWithRole = async (
    email: string,
    password: string,
    role: string,
    organization?: string,
  ) => {
    try {
      console.log("🔐 Attempting role-based login:", {
        email,
        role,
        organization,
      });

      // You can modify this to call a different endpoint if your API supports role-based login
      // For now, it calls the same login endpoint
      const response = await authApi.login({
        email,
        password,
        role,
        organization,
      });
      console.log("📥 Role login response:", response.data);

      const token = response.data?.token || response.data?.access_token;
      const userData =
        response.data?.user || response.data?.data?.user || response.data;

      if (token) {
        localStorage.setItem("token", token);

        if (userData && typeof userData === "object" && userData.id) {
          setUser(userData);
          console.log("✅ User set from role login:", userData.email);
        } else {
          await refreshUser();
        }

        toast.success(`Logged in as ${role}!`);
        return { success: true, user: user };
      } else {
        const message = response.data?.message || "Login failed";
        toast.error(message);
        return { success: false, message };
      }
    } catch (error: any) {
      console.error("❌ Role login error:", error);
      const message =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      console.log("🚪 Logging out...");
      await authApi.logout();
      console.log("✅ Logout successful");
    } catch (error) {
      console.error("❌ Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

  const signup = async (userData: any) => {
    try {
      console.log("📝 Attempting signup:", { email: userData.email });

      const response = await authApi.register(userData);
      console.log("📥 Signup response:", response.data);

      const token = response.data?.token || response.data?.access_token;
      const newUser =
        response.data?.user || response.data?.data?.user || response.data;

      if (token) {
        localStorage.setItem("token", token);

        if (newUser && typeof newUser === "object" && newUser.id) {
          setUser(newUser);
          console.log("✅ User set from signup:", newUser.email);
        }

        toast.success("Account created successfully!");
        return { success: true };
      } else {
        toast.error(response.data?.message || "Registration failed");
        return { success: false, message: response.data?.message };
      }
    } catch (error: any) {
      console.error("❌ Signup error:", error);
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
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
