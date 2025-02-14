// import axios from 'axios';
import type { User, SignupData, LoginData, AuthResponse } from '../types';

// Mock user data
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    username: 'testuser',
    mobile: '1234567890'
  }
];

// Mock authentication service
export const authService = {
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find(u => u.email === credentials.email);
    if (!user || credentials.password !== 'password') {
      throw new Error('Invalid credentials');
    }

    const token = 'mock-jwt-token';
    localStorage.setItem('token', token);

    return {
      user,
      token
    };
  },

  signup: async (userData: SignupData): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === userData.email)) {
      throw new Error('User already exists');
    }

    // In a real app, we would save this to a database
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      email: userData.email,
      username: userData.username,
      mobile: userData.mobile
    };

    MOCK_USERS.push(newUser);
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real app, we would verify the token and get user data
    return MOCK_USERS[0];
  },
};

export const userService = {
  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, data);
    return user;
  },

  getUserBonds: async (userId: string) => {
    const response = await api.get(`/users/${userId}/bonds`);
    return response.data;
  },
};

// Remove actual API setup since we're using mock data
const api = {
  get: () => Promise.resolve({ data: {} }),
  post: () => Promise.resolve({ data: {} }),
  put: () => Promise.resolve({ data: {} }),
  delete: () => Promise.resolve({ data: {} })
};

export default api; 