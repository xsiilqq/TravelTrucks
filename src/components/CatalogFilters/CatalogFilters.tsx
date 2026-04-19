'use client';

import styles from './CatalogFilters.module.css';
import { Filters } from '@/types/filters';

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onSearch: () => void;
  onClear: () => void;
};

function formatLabel(value: string) {
  const map: Record<string, string> = {
    alcove: 'Alcove',
    panel_van: 'Panel truck',
    integrated: 'Fully integrated',
    semiIntegrated: 'Semi Integrated',
    petrol: 'Petrol',
    diesel: 'Diesel',
    hybrid: 'Hybrid',
    electric: 'Electric',
    automatic: 'Automatic',
    manual: 'Manual',
  };

  return map[value] || value;
}

export default function CatalogFilters({
  filters,
  onChange,
  onSearch,
  onClear,
}: Props) {
  return (
    <div className={styles.filters}>
      <div className={styles.fieldBlock}>
        <label className={styles.label}>Location</label>

        <div className={styles.inputWrap}>
          <svg className={styles.inputIcon}>
            <use href="/symbol-defs.svg#icon-map" />
          </svg>

          <input
            type="text"
            placeholder="City"
            className={styles.input}
            value={filters.location}
            onChange={(e) =>
              onChange({ ...filters, location: e.target.value })
            }
          />
        </div>
      </div>

      <h2 className={styles.title}>Filters</h2>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Camper form</h3>

        {['alcove', 'panel_van', 'integrated'].map((value) => (
          <label key={value} className={styles.option}>
            <input
              className={styles.radioInput}
              type="radio"
              name="form"
              checked={filters.form === value}
              onChange={() => onChange({ ...filters, form: value })}
            />
            <span className={styles.radioMark}></span>
            <span>{formatLabel(value)}</span>
          </label>
        ))}
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Engine</h3>

        {['petrol', 'diesel', 'hybrid'].map((value) => (
          <label key={value} className={styles.option}>
            <input
              className={styles.radioInput}
              type="radio"
              name="engine"
              checked={filters.engine === value}
              onChange={() => onChange({ ...filters, engine: value })}
            />
            <span className={styles.radioMark}></span>
            <span>{formatLabel(value)}</span>
          </label>
        ))}
      </div>

      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Transmission</h3>

        {['automatic', 'manual'].map((value) => (
          <label key={value} className={styles.option}>
            <input
              className={styles.radioInput}
              type="radio"
              name="transmission"
              checked={filters.transmission === value}
              onChange={() => onChange({ ...filters, transmission: value })}
            />
            <span className={styles.radioMark}></span>
            <span>{formatLabel(value)}</span>
          </label>
        ))}
      </div>

      <button
        type="button"
        className={styles.searchButton}
        onClick={onSearch}
      >
        Search
      </button>

      <button
        type="button"
        className={styles.clearButton}
        onClick={onClear}
      >
        ✕ Clear filters
      </button>
    </div>
  );
}
