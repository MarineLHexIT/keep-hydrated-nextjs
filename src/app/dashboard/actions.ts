import { getWaterIntakeHistory } from '@/lib/api/water-intake';

export interface WaterIntakeData {
  amount: number;
  date: string;
}

export async function getWaterIntakeData(): Promise<WaterIntakeData[]> {
  try {
    const history = await getWaterIntakeHistory();
    
    return history.map(intake => ({
      amount: intake.amount,
      date: new Date(intake.timestamp).toISOString().split('T')[0]
    }));
  } catch (error) {
    console.error('Failed to fetch water intake history:', error);
    return [];
  }
} 