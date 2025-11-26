import { CHART_COLORS } from '../constants';
import type { VariationChart, VariationNormalized } from '../types';

export const mapToVariationChart = (
  variation: VariationNormalized,
  index: number
): VariationChart => {
  return {
    id: String(variation.id),
    label: variation.name,
    color: CHART_COLORS[index % CHART_COLORS.length],
  };
};
