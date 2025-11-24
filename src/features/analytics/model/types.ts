export interface Variation {
  id?: number;
  name: string;
}

export interface VariationNormalized {
  id: number;
  name: string;
}

export interface DailyMetricsApi {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
}

export interface AnalyticsDataApi {
  variations: Variation[];
  data: DailyMetricsApi[];
}

export interface DailyMetricChart {
  date: string;
  [variationName: string]: string | number;
}
