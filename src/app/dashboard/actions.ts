export interface WaterIntakeData {
  amount: number;
  date: string;
}

// This will be replaced with actual API call later
export async function getWaterIntakeData(): Promise<WaterIntakeData[]> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [
    { amount: 500, date: '2024-03-20' },
    { amount: 750, date: '2024-03-19' },
    { amount: 1000, date: '2024-03-18' },
    { amount: 800, date: '2024-03-17' },
    { amount: 1200, date: '2024-03-16' },
    { amount: 900, date: '2024-03-15' },
    { amount: 1100, date: '2024-03-14' },
  ];
} 