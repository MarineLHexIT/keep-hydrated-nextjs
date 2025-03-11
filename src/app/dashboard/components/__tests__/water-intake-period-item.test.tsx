import { render, screen } from '@testing-library/react';
import { WaterIntakePeriodItem } from '../water-intake-period-item';

describe('WaterIntakePeriodItem', () => {
  const sampleData = [
    { date: '2024-03-11', amount: 250 },
    { date: '2024-03-11', amount: 300 },
  ];

  it('renders day view correctly', () => {
    render(
      <WaterIntakePeriodItem
        period="day"
        date={new Date('2024-03-11')}
        data={sampleData}
      />
    );

    expect(screen.getByText('11 March 2024')).toBeInTheDocument();
    expect(screen.getByText('550ml')).toBeInTheDocument();
  });

  it('renders week view with average', () => {
    const weekData = [
      ...sampleData,
      { date: '2024-03-12', amount: 400 },
    ];

    render(
      <WaterIntakePeriodItem
        period="week"
        date={new Date('2024-03-11')}
        data={weekData}
      />
    );

    expect(screen.getByText(/Semaine 11/)).toBeInTheDocument();
    expect(screen.getByText('950ml')).toBeInTheDocument();
    expect(screen.getByText(/Average daily intake: 475ml/)).toBeInTheDocument();
  });

  it('calculates total intake correctly', () => {
    const data = [
      { date: '2024-03-11', amount: 100 },
      { date: '2024-03-11', amount: 200 },
      { date: '2024-03-11', amount: 300 },
    ];

    render(
      <WaterIntakePeriodItem
        period="day"
        date={new Date('2024-03-11')}
        data={data}
      />
    );

    expect(screen.getByText('600ml')).toBeInTheDocument();
  });
}); 