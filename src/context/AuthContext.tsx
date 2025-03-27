
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Simulate login with localStorage
  const login = async (email: string, password: string) => {
    // Simulate API call
    setLoading(true);
    try {
      // Check if user exists in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userMatch = storedUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!userMatch) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object without password
      const authenticatedUser = {
        id: userMatch.id,
        name: userMatch.name,
        email: userMatch.email
      };
      
      // Store user in state and localStorage
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      toast.success(`Welcome back, ${authenticatedUser.name}!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Simulate signup with localStorage
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Check if user already exists
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (storedUsers.some((u: any) => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password // In a real app, this would be hashed
      };
      
      // Add to users array
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      
      // Log user in (without password in the state)
      const authenticatedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  // Delete account
  const deleteAccount = () => {
    if (!user) return;
    
    // Remove user from users array
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = storedUsers.filter((u: any) => u.id !== user.id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Clear current user
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Account deleted successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
