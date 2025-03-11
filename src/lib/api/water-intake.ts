import {  DailyStats, WaterIntake, UserProfile } from './types';
import { auth } from '@/lib/auth/auth';

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error('API_URL must be defined in environment variables');
}

async function getAuthHeaders() {
  const session = await auth();
  
  if (!session?.user?.access_token) {
    throw new Error('No access token available');
  }

  const accessToken = session.user.access_token;

  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  };
}

export async function getUserProfile(): Promise<UserProfile> {
  const headers = await getAuthHeaders();
  
  const response = await fetch(`${API_URL}/user/profile`, {
    headers,
    credentials: 'include',
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return await response.json();
}

export async function getTodayStats(): Promise<DailyStats> {
  const headers = await getAuthHeaders();
  
  const response = await fetch(`${API_URL}/water-intake/today`, {
    headers,
    credentials: 'include',
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch today\'s stats');
  }

  return await response.json();
}

export async function getWaterIntakeHistory(): Promise<WaterIntake[]> {
  const headers = await getAuthHeaders();
  
  const response = await fetch(`${API_URL}/water-intake/history`, {
    headers,
    credentials: 'include',
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch water intake history');
  }

  return await response.json();
}

export async function addWaterIntake(amount: number): Promise<WaterIntake> {
  const headers = await getAuthHeaders();
  
  const response = await fetch(`${API_URL}/water-intake`, {
    method: 'POST',
    headers,
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    throw new Error('Failed to add water intake');
  }

  return await response.json();
} 