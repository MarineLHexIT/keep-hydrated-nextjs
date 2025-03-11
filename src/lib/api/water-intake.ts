import { getClient } from './client';
import { DailyStats, WaterIntake } from './types';

export async function getTodayStats(): Promise<DailyStats> {
  
  const client = await getClient();

  return client.get('/water-intake/today', {
    errorMessage: 'Failed to fetch today’s stats'
  });
}

export async function getWaterIntakeHistory(): Promise<WaterIntake[]> {
 
  const client = await getClient();
  
  return client.get('/water-intake/history', {
    errorMessage: 'Failed to fetch water intake history'
  });
}

export async function addWaterIntake(amount: number): Promise<WaterIntake> {

  const client = await getClient();

  return client.post('/water-intake', {
    body: JSON.stringify({ amount }),
    errorMessage: 'Failed to add water intake'
  });
} 