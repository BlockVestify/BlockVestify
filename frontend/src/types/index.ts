// User related types
export interface User {
  id: string;
  email: string;
  username: string;
  mobile?: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  mobile: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API related types
export interface ApiError {
  message: string;
  status: number;
} 