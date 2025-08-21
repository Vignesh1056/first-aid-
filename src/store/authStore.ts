import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
}

// Mock user database (in a real app, this would be handled by backend)
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@firstaid.com',
    password: 'demo123',
    createdAt: new Date(),
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = mockUsers.find(
          u => (u.username === username || u.email === username) && u.password === password
        );

        if (user) {
          const { password: _, ...userData } = user;
          set({ user: userData, isAuthenticated: true });
          return true;
        }

        return false;
      },

      signup: async (username: string, email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if user already exists
        const existingUser = mockUsers.find(u => u.username === username || u.email === email);
        if (existingUser) {
          return false;
        }

        // Create new user
        const newUser: User & { password: string } = {
          id: Date.now().toString(),
          username,
          email,
          password,
          createdAt: new Date(),
        };

        mockUsers.push(newUser);
        
        const { password: _, ...userData } = newUser;
        set({ user: userData, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      forgotPassword: async (email: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = mockUsers.find(u => u.email === email);
        if (user) {
          // In a real app, this would send an email
          console.log(`Password reset email sent to ${email}`);
          return true;
        }

        return false;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);