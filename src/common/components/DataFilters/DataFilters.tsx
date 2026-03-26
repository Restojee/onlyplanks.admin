import React from 'react';
import { Column, Row } from '@ui/Layout';
import styles from './DataFilters.module.scss';

export interface FilterConfig {
  id: string;
  component: React.ReactNode;
}

export interface DataFiltersProps {
  filters: FilterConfig[];
  isVisible: boolean;
}

export const DataFilters: React.FC<DataFiltersProps> = ({
  filters,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <Row gap="md" className={styles.filtersRow}>
      {filters.map((filter) => (
        <Row maxWidth={190}>
          {filter.component}
        </Row>
      ))}
    </Row>
  );
};

export default DataFilters;
