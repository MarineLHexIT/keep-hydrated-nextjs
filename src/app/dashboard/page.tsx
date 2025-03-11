import { Suspense } from 'react';
import { getWaterIntakeData, WaterIntakeData } from './actions';
import { WaterIntakeHistory } from './components/water-intake-history';

export default async function DashboardPage() {
  const waterIntakeData:Array<WaterIntakeData> = await getWaterIntakeData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Water Intake History</h1>
        <p className="text-muted-foreground">
          Track your daily water intake and stay hydrated
        </p>
      </div>

      <Suspense>
      <WaterIntakeHistory initialData={waterIntakeData} />
      </Suspense>
    </div>
  );
} 