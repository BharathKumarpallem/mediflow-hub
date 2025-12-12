import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<UserRole, User> = {
  admin: {
    id: '1',
    name: 'Admin User',
    email: 'admin@hospital.com',
    role: 'admin',
    phone: '+1234567890',
  },
  doctor: {
    id: '2',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@hospital.com',
    role: 'doctor',
    phone: '+1234567891',
  },
  receptionist: {
    id: '3',
    name: 'Emily Davis',
    email: 'reception@hospital.com',
    role: 'receptionist',
    phone: '+1234567892',
  },
  pharmacy: {
    id: '4',
    name: 'Mike Wilson',
    email: 'pharmacy@hospital.com',
    role: 'pharmacy',
    phone: '+1234567893',
  },
  staff: {
    id: '5',
    name: 'Jane Smith',
    email: 'staff@hospital.com',
    role: 'staff',
    phone: '+1234567894',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo, accept any password
    if (email && password) {
      setUser(mockUsers[role]);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
