import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define the user type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  company?: string;
  plan?: string;
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; user?: User; message?: string }>;
  logout: () => void;
}

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on initial load
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const userData: User = JSON.parse(storedAuth);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored auth data:", error);
        localStorage.removeItem("auth");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Demo login logic
    if (email === "demo@logsentinel.ai" && password === "demo123") {
      const demoUser: User = {
        id: 1,
        name: "Demo User",
        email,
        role: "admin",
        avatar: "DU",
        company: "LogSentinel AI",
        plan: "Enterprise",
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem("auth", JSON.stringify(demoUser));

      return { success: true, user: demoUser };
    }

    // For demo purposes, accept any valid email format with password 'password'
    if (email.includes("@") && password === "password") {
      const newUser: User = {
        id: Date.now(),
        name: email.split("@")[0],
        email,
        role: "user",
        avatar: email[0].toUpperCase(),
        company: "Acme Inc",
        plan: "Professional",
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("auth", JSON.stringify(newUser));

      return { success: true, user: newUser };
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: false,
      message: "Invalid credentials. Try demo@logsentinel.ai / demo123",
    };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Also export the AuthContext for direct usage if needed
export { AuthContext };
