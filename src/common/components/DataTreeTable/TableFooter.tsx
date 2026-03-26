import React from 'react';
import { Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { Button } from '@common/components/Button';
import { ButtonIconDropDownMenu } from '@ui/DropDownButtonList/ButtonIconDropDownMenu';
import { PaginationCallbacks, PaginationConfig } from './types';

import styles from './TableFooter.module.scss';
import { AnchorAlign } from '@ui/Popup';
import { Icon } from '@ui/Icon';
import { ListItemOptions } from '@ui/Select/common/types';

interface TableFooterProps {
  pagination: PaginationConfig;
  callbacks: PaginationCallbacks;
}

export const TableFooter: React.FC<TableFooterProps> = ({ pagination, callbacks }) => {
  const { 
    currentPage, 
    pageSize, 
    totalItems, 
    totalPages,
    startIndex,
    endIndex,
    hasPreviousPage,
    hasNextPage,
    pageSizeOptions = [10, 25, 50, 100] 
  } = pagination;
  const { onPageSizeChange, onNextPage, onPreviousPage } = callbacks;

  const handlePageSizeChange = React.useCallback((option: ListItemOptions) => {
    const newSize = option.value;
    if (newSize && onPageSizeChange) {
      onPageSizeChange(newSize);
    }
  }, [onPageSizeChange]);

  const pageSizeSelectOptions = pageSizeOptions.map(size => ({
    value: size.toString(),
    label: `${size} записей`,
  }));

  return (
    <Row className={styles.footer} width={1}  align="center" pa="md" gap="md">
      <Row justify="start" gap="sm" align="center">
        <Row nonIntegration align="center" justify="start" gap="xs">
          <Typography ellipsis>
            {startIndex} - {endIndex} из {totalItems}
          </Typography>
          <ButtonIconDropDownMenu
            icon="IconChevronDown"
            options={pageSizeSelectOptions}
            onChange={handlePageSizeChange}
            buttonSize="sm"
            menuSize="sm"
            showCheckbox={false}
            showSearch={false}
            anchorAlign={AnchorAlign.CENTER}
          />
        </Row>
        <Typography>
          записей
        </Typography>
      </Row>
      <Row nonIntegration gap="sm" align="center">
        <Button
          onClick={onPreviousPage}
          disabled={!hasPreviousPage}
          size="sm"
          noBg
          noPadding
        >
          <Icon icon="IconChevronLeft" />
        </Button>
        <Typography ellipsis>
          Страница {currentPage} из {totalPages}
        </Typography>
        <Button
          onClick={onNextPage}
          disabled={!hasNextPage}
          size="sm"
          noBg
          noPadding
        >
          <Icon icon="IconChevronRight" />
        </Button>
      </Row>
    </Row>
  );
};
