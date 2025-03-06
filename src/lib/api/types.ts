export interface APIResponse<T = unknown> {
  data: T;
  message?: string;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
  };
}

// API Endpoints types
export interface WaterIntake {
  id: string;
  amount: number;
  timestamp: string;
  userId: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  dailyGoal: number;
  createdAt: string;
  updatedAt: string;
}

export interface DailyStats {
  total: number;
  goal: number;
  percentage: number;
  intakes: WaterIntake[];
} 