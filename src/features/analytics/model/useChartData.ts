import { fetchAnalyticsDataApi } from "@/shared/api";
import { useEffect, useMemo, useState } from "react";
import { normalizeVariations, transformData } from ".";
import { PERIODS } from "./constants";
import type { AnalyticsDataApi, Period, VariationChart } from "./types";
import { mapToVariationChart } from "./utils/mapToVariationChart";

export function useChartData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rawData, setRawData] = useState<AnalyticsDataApi | null>(null);
  const [period, setPeriod] = useState<Period>(PERIODS.DAY);
  const [selectedVariations, setSelectedVariations] = useState<VariationChart[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const apiData = await fetchAnalyticsDataApi();
        setRawData(apiData);
        
        const mappedVariations = normalizeVariations(apiData.variations).map(mapToVariationChart);
        setSelectedVariations(mappedVariations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const chartData = useMemo(() => {
    if (!rawData) return [];
    return transformData(rawData, period, selectedVariations)
  }, [rawData, period, selectedVariations]
  );

  return {
    isLoading,
    error,
    chartData,
    period,
    selectedVariations,
    setPeriod,
    setSelectedVariations,
  };
}
