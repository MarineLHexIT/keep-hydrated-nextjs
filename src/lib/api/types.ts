// API Endpoints types
export interface WaterIntake {
  id: string;
  amount: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  dailyGoal: number;
  createdAt: string;
  updatedAt: string;
}

export interface DailyStats {
  total: number;
  count: number;
  average: number;
  intakes: WaterIntake[];
} 