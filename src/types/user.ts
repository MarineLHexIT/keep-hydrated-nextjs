export interface User {
  id: string;
  email: string;
  name?: string;
  dailyGoal?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface Session {
  user: User;
  token: string;
  expires: string;
} 