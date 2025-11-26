import { useEffect, useRef, useState } from 'react';
import type { Period, VariationChart } from '../model/types';
import styles from './AnalyticsControls.module.css';

interface AnalyticsControlsProps {
  variations: VariationChart[];
  selectedVariations: VariationChart[];
  onVariationsChange: (selected: VariationChart[]) => void;
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export const AnalyticsControls = ({
  variations,
  selectedVariations,
  onVariationsChange,
  period,
  onPeriodChange,
}: AnalyticsControlsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  const allSelected = selectedVariations.length === variations.length;

  const getVariationsLabel = () => {
    if (allSelected) return 'All variations selected';
    if (selectedVariations.length === 1) return selectedVariations[0].label;
    return `${selectedVariations.length} variations selected`;
  };

  const handleToggleAll = () => {
    if (allSelected) {
      onVariationsChange([variations[0]]);
    } else {
      onVariationsChange(variations);
    }
  };

  const handleToggleVariation = (variation: VariationChart) => {
    const isSelected = selectedVariations.some((v) => v.id === variation.id);

    if (isSelected) {
      if (selectedVariations.length > 1) {
        onVariationsChange(
          selectedVariations.filter((v) => v.id !== variation.id)
        );
      }
    } else {
      onVariationsChange([...selectedVariations, variation]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        periodRef.current &&
        !periodRef.current.contains(event.target as Node)
      ) {
        setIsPeriodOpen(false);
      }
    };

    if (isDropdownOpen || isPeriodOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isPeriodOpen]);

  return (
    <div className={styles.controls}>
      <div className={styles.selectWrapper} ref={dropdownRef}>
        <button
          type="button"
          className={styles.select}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          <span>{getVariationsLabel()}</span>
          <svg
            className={`${styles.arrow} ${isDropdownOpen ? styles.arrowOpen : ''}`}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <label className={styles.dropdownItem}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleToggleAll}
                className={styles.checkbox}
              />
              <span className={styles.checkboxLabel}>
                All variations selected
              </span>
            </label>

            <div className={styles.divider} />

            {variations.map((variation) => {
              const isSelected = selectedVariations.some(
                (v) => v.id === variation.id
              );
              return (
                <label key={variation.id} className={styles.dropdownItem}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleVariation(variation)}
                    className={styles.checkbox}
                  />
                  <span
                    className={styles.colorIndicator}
                    style={{ backgroundColor: variation.color }}
                  />
                  <span className={styles.checkboxLabel}>
                    {variation.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.selectWrapper} ref={periodRef}>
        <button
          type="button"
          className={styles.select}
          onClick={() => setIsPeriodOpen(!isPeriodOpen)}
          aria-haspopup="listbox"
          aria-expanded={isPeriodOpen}
        >
          <span>{period === 'day' ? 'Day' : 'Week'}</span>
          <svg
            className={`${styles.arrow} ${isPeriodOpen ? styles.arrowOpen : ''}`}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isPeriodOpen && (
          <div className={styles.dropdown}>
            <button
              type="button"
              className={`${styles.dropdownItem} ${styles.periodItem}`}
              onClick={() => {
                onPeriodChange('day');
                setIsPeriodOpen(false);
              }}
            >
              <span className={styles.checkboxLabel}>Day</span>
            </button>
            <button
              type="button"
              className={`${styles.dropdownItem} ${styles.periodItem}`}
              onClick={() => {
                onPeriodChange('week');
                setIsPeriodOpen(false);
              }}
            >
              <span className={styles.checkboxLabel}>Week</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
