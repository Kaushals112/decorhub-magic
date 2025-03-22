
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/lib/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock admin user for demo
const MOCK_ADMIN: User = {
  id: "admin-1",
  name: "Admin User",
  email: "admin@vikashvatika.com",
  isAdmin: true
};

// This would be replaced with actual authentication logic
const mockAuth = (email: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo: admin@vikashvatika.com with password "admin123" logs in as admin
      if (email === "admin@vikashvatika.com" && password === "admin123") {
        resolve(MOCK_ADMIN);
      } else if (password === "password123") {
        // Any other email with password "password123" creates a regular user
        resolve({
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email,
          isAdmin: false
        });
      } else {
        resolve(null);
      }
    }, 1000);
  });
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const authenticatedUser = await mockAuth(email, password);
      
      if (authenticatedUser) {
        setUser(authenticatedUser);
        localStorage.setItem("user", JSON.stringify(authenticatedUser));
        toast.success(`Welcome back, ${authenticatedUser.name}!`);
        return true;
      } else {
        toast.error("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call to create a user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        isAdmin: false
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success(`Welcome, ${name}!`);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.isAdmin || false,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
