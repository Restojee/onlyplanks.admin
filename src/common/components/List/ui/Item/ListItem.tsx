import * as React from 'react';
import { Paper, Row } from '@ui/Layout';
import classNames from 'clsx';
import { ListItemIconPositions, type ListItemProps } from '@ui/Select/common/types';
import { useListItemIcons } from '@ui/List/hooks/useListItemIcons';
import styles from './ListItem.module.scss';
import { Typography } from "@ui/Typography";
import { Checkbox } from '@common/components/Checkbox';
import { When } from '@ui/If';

export const ListItem: React.FC<ListItemProps> = (props) => {
  const { onClick, onCheckboxChange, label, blocked, rightIcons, leftIcons, leftIcon, rightIcon, disabled, size = 'sm', showCheckbox = false, isSelected = false } = props;

  const renderIcons = useListItemIcons({ disabled, size });

  const dropDownClasses = classNames([
    styles.ListItem,
    blocked && styles.blocked,
    isSelected && styles.selected,
    size === 'sm' && styles.sizeSm,
    size === 'md' && styles.sizeMd,
  ]);

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onCheckboxChange?.(e);
  };

  return (
    <Paper className={dropDownClasses} onClick={onClick} width={1}>
      <Row gap="xs" align="center">
        <When condition={showCheckbox}>
          <Checkbox checked={isSelected} onClick={handleCheckboxClick} size={size} />
        </When>
        {renderIcons(leftIcon, leftIcons, ListItemIconPositions.Left)}
        <Typography className={styles.label}>{label}</Typography>
      </Row>
      <Row nonIntegration justify="end" gap="xs" align="center">
        {renderIcons(rightIcon, rightIcons, ListItemIconPositions.Right)}
      </Row>
    </Paper>
  );
};
