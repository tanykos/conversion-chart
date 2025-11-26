import { useChartData } from '../model/useChartData';
import { AnalyticsChart } from './AnalyticsChart';
import { AnalyticsControls } from './AnalyticsControls';

export const Analytics = () => {
  const {
    isLoading,
    error,
    chartData,
    period,
    selectedVariations,
    setPeriod,
    setSelectedVariations,
    allVariations,
  } = useChartData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log('Analytics data:', chartData);

  return (
    <>
      <AnalyticsControls
        variations={allVariations}
        selectedVariations={selectedVariations}
        onVariationsChange={setSelectedVariations}
        period={period}
        onPeriodChange={setPeriod}
      />
      <AnalyticsChart
        data={chartData}
        selectedVariations={selectedVariations}
      />
    </>
  );
};
