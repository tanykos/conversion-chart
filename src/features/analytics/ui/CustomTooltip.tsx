import styles from './CustomTooltip.module.css';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

export const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className={styles.tooltip}>
      <p className={styles.label}>{label}</p>
      <div className={styles.content}>
        {payload.map((entry, index) => (
          <div key={index} className={styles.item}>
            <span className={styles.itemLabel}>
              <span
                className={styles.colorIndicator}
                style={{ backgroundColor: entry.color }}
              />
              <span className={styles.name}>{entry.name}</span>
            </span>
            <span className={styles.value}>{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
