import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { DailyMetricChart } from '../model';
import type { VariationChart } from '../model/types';
import { formatDateLabel } from '../model/utils/formatDateLabel';

interface AnalyticsChartProps {
  data: DailyMetricChart[];
  selectedVariations: VariationChart[];
}

export const AnalyticsChart = ({
  data,
  selectedVariations,
}: AnalyticsChartProps) => {
  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <LineChart
        style={{
          width: '100%',
          maxWidth: '1300px',
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={formatDateLabel} />
        <YAxis width="auto" tickFormatter={(value: number) => `${value}%`} />
        <Tooltip />
        {selectedVariations.map((variation) => (
          <Line
            key={variation.id}
            type="monotone"
            dataKey={variation.label}
            stroke={variation.color}
            dot={false}
          />
        ))}
      </LineChart>
    </div>
  );
};
