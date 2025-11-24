import type {
  AnalyticsDataApi,
  VariationNormalized,
  DailyMetricChart,
} from './types';

const normalizeVariations = (
  variations: AnalyticsDataApi['variations']
): VariationNormalized[] => {
  return variations.map((variation) => ({
    id: variation.id ?? 0,
    name: variation.name,
  }));
};

const calculateConversionRate = (
  conversions: number,
  visits: number
): number => {
  if (visits === 0) return 0;
  return Number(((conversions / visits) * 100).toFixed(2));
};

export const transformData = (data: AnalyticsDataApi): DailyMetricChart[] => {
  const normalizedVariations = normalizeVariations(data.variations);

  return data.data.map((dailyMetricsApi) => {
    const point: DailyMetricChart = {
      date: dailyMetricsApi.date,
    };

    normalizedVariations.forEach((variation) => {
      const visits = dailyMetricsApi.visits[String(variation.id)];
      const conversions = dailyMetricsApi.conversions[String(variation.id)];

      if (visits !== undefined && conversions !== undefined) {
        point[variation.name] = calculateConversionRate(conversions, visits);
      }
    });

    return point;
  });
};
