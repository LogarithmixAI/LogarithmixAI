// contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
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
    role?: string,
    organization?: string,
  ) => Promise<{ success: boolean; message?: string }>;
  loginWithRole: (
    email: string,
    password: string,
    role: string,
    organization?: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
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

// ========== CONFIGURATION ==========
const API_BASE_URL = "http://localhost:8001";

// Helper fetch with credentials
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include", // ✅ required for session cookie
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  return response;
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
      const response = await apiFetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(mapUser(data.user));
        } else {
          setUser(null);
        }
      } else {
        // 401 is normal when not logged in – do nothing
        setUser(null);
      }
    } catch (error) {
      // Network errors (e.g., backend down) – still no user
      console.warn("Auth check network error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await apiFetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(mapUser(data.user));
        }
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  const login = async (
    email: string,
    password: string,
    role?: string,
    organization?: string,
  ) => {
    try {
      const response = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password, role, organization }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        // Session cookie should be set automatically by the backend
        if (data.user) {
          setUser(mapUser(data.user));
        } else {
          await refreshUser(); // fallback: fetch fresh user data
        }
        toast.success("Login successful!");
        return { success: true };
      } else {
        const message = data.message || "Invalid email or password";
        toast.error(message);
        return { success: false, message };
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const message =
        error.message || "Network error – is the backend running?";
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
    return login(email, password, role, organization);
  };

  const logout = async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
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
      const payload = { email, password, username, role, ...additionalData };
      const response = await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        if (data.user) {
          setUser(mapUser(data.user));
        } else {
          await refreshUser();
        }
        toast.success("Account created successfully!");
        return { success: true };
      } else {
        const message = data.message || "Registration failed";
        toast.error(message);
        return { success: false, message };
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      const message = error.message || "Network error";
      toast.error(message);
      return { success: false, message };
    }
  };

  const mapUser = (data: any): User => ({
    id: data.id,
    email: data.email,
    name: data.name || data.username,
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
