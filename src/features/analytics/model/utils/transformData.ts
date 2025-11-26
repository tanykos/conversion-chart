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

  if (period === PERIODS.DAY) {
    return data.data.map((dailyMetricsApi) => {
      const point: DailyMetricChart = {
        date: dailyMetricsApi.date,
      };

      normalizedVariations.forEach((variation) => {
        const variationId = String(variation.id);
        const selected = selectedVariations.find((v) => v.id === variationId);
        if (!selected) return;

        const visits = dailyMetricsApi.visits[variationId];
        const conversions = dailyMetricsApi.conversions[variationId];

        if (visits !== undefined && conversions !== undefined) {
          point[selected.label] = calculateConversionRate(conversions, visits);
        }
      });

      return point;
    });
  }

  const grouped: Record<
    string,
    {
      dateRange: string;
      visits: Record<string, number>;
      conversions: Record<string, number>;
    }
  > = {};

  data.data.forEach((dailyMetricsApi) => {
    const weekKey = getWeekKey(dailyMetricsApi.date);
    const dateRange = getWeekDateRange(dailyMetricsApi.date);

    if (!grouped[weekKey]) {
      grouped[weekKey] = {
        dateRange,
        visits: {},
        conversions: {},
      };
    }

    normalizedVariations.forEach((variation) => {
      const variationId = String(variation.id);
      const visits = dailyMetricsApi.visits[variationId] || 0;
      const conversions = dailyMetricsApi.conversions[variationId] || 0;

      grouped[weekKey].visits[variationId] =
        (grouped[weekKey].visits[variationId] || 0) + visits;
      grouped[weekKey].conversions[variationId] =
        (grouped[weekKey].conversions[variationId] || 0) + conversions;
    });
  });

  return Object.entries(grouped)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([, weekData]) => {
      const point: DailyMetricChart = {
        date: weekData.dateRange,
      };

      normalizedVariations.forEach((variation) => {
        const variationId = String(variation.id);
        const selected = selectedVariations.find((v) => v.id === variationId);
        if (!selected) return;

        const visits = weekData.visits[variationId] || 0;
        const conversions = weekData.conversions[variationId] || 0;

        point[selected.label] = calculateConversionRate(conversions, visits);
      });

      return point;
    });
};

function getWeekKey(date: string): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);

  const monday = new Date(d.getFullYear(), d.getMonth(), diff);
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, '0');
  const dayStr = String(monday.getDate()).padStart(2, '0');

  return `${year}-${month}-${dayStr}`;
}

function getWeekDateRange(date: string): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);

  const monday = new Date(d);
  monday.setDate(diff);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatDate = (date: Date) => {
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return `${formatDate(monday)}-${formatDate(sunday)}`;
}
