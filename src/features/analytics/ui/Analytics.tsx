import { useChartData } from '../model/useChartData';
import { AnalyticsChart } from './AnalyticsChart';

export const Analytics = () => {
  const { isLoading, error, chartData, selectedVariations } = useChartData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log('Analytics data:', chartData);

  return (
    <AnalyticsChart data={chartData} selectedVariations={selectedVariations} />
  );
};
