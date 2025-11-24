import { useEffect, useState } from 'react';
import { transformData } from '../model';
import type { DailyMetricChart } from '../model';
import { fetchAnalyticsDataApi } from '@/shared/api';

export const Analytics = () => {
  const [chartData, setChartData] = useState<DailyMetricChart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const apiData = await fetchAnalyticsDataApi();
        const transformedData = transformData(apiData);
        setChartData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log('Analytics data:', chartData);

  return <p>Coming soon...</p>;
};
