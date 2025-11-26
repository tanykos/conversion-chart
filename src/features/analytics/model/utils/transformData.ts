import { PERIODS } from '../constants';
import type {
  AnalyticsDataApi,
  DailyMetricChart,
  Period,
  VariationChart,
  VariationNormalized,
} from '../types';

export const normalizeVariations = (
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

export const transformData = (
  data: AnalyticsDataApi,
  period: Period,
  selectedVariations: VariationChart[]
): DailyMetricChart[] => {
  const normalizedVariations = normalizeVariations(data.variations);

  const grouped: Record<string, DailyMetricChart> = {};

  data.data.forEach((dailyMetricsApi) => {
    const dateKey =
      period === PERIODS.WEEK
        ? getWeekKey(dailyMetricsApi.date)
        : dailyMetricsApi.date;

    if (!grouped[dateKey]) {
      grouped[dateKey] = { date: dateKey };
    }

    normalizedVariations.forEach((variation) => {
      const variationId = String(variation.id);

      const selected = selectedVariations.find(v => v.id === variationId);
      if (!selected) return;

      const visits = dailyMetricsApi.visits[variationId];
      const conversions = dailyMetricsApi.conversions[variationId];

      if (visits !== undefined && conversions !== undefined) {
        grouped[dateKey][selected.label] =
          calculateConversionRate(conversions, visits);
      }
    });
  });

  return Object.values(grouped);
};

function getWeekKey(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const week = Math.ceil(
    ((+d - +new Date(year, 0, 1)) / 86400000 +
      new Date(year, 0, 1).getDay() +
      1) /
      7
  );

  return `${year}-W${week}`;
}
