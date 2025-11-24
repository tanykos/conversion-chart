import type { AnalyticsDataApi } from '@/features/analytics';
import mockData from './mock/data.json';

export async function fetchAnalyticsDataApi(): Promise<AnalyticsDataApi> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return mockData as AnalyticsDataApi;
}
