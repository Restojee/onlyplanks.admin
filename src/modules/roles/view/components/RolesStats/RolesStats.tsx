import React from 'react';
import { Grid, Paper, Column } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { TextTags } from '@common/constants/textTags';
import styles from './RolesStats.module.scss';

export interface RolesStatsProps {
  totalRoles: number;
  totalUsers: number;
  activeModules: number;
  selectedCount: number;
}

export const RolesStats: React.FC<RolesStatsProps> = ({
  totalRoles,
  totalUsers,
  activeModules,
  selectedCount,
}) => {
  return (
    <Grid columns="4" gap="md">
      <Paper className={`${styles.statCard} ${styles.primary}`}>
        <Column gap="xs" align="center">
          <Typography tag={TextTags.H1} fontWeight="bold" className={styles.statValue}>
            {totalRoles}
          </Typography>
          <Typography size="sm" fontWeight="medium" className={styles.statLabel}>Всего ролей</Typography>
        </Column>
      </Paper>
      
      <Paper className={`${styles.statCard} ${styles.success}`}>
        <Column gap="xs" align="center">
          <Typography tag={TextTags.H1} fontWeight="bold" className={styles.statValue}>
            {totalUsers}
          </Typography>
          <Typography size="sm" fontWeight="medium" className={styles.statLabel}>Пользователей</Typography>
        </Column>
      </Paper>
      
      <Paper className={`${styles.statCard} ${styles.info}`}>
        <Column gap="xs" align="center">
          <Typography tag={TextTags.H1} fontWeight="bold" className={styles.statValue}>
            {activeModules}
          </Typography>
          <Typography size="sm" fontWeight="medium" className={styles.statLabel}>Модулей</Typography>
        </Column>
      </Paper>
      
      <Paper className={`${styles.statCard} ${styles.warning}`}>
        <Column gap="xs" align="center">
          <Typography tag={TextTags.H1} fontWeight="bold" className={styles.statValue}>
            {selectedCount}
          </Typography>
          <Typography size="sm" fontWeight="medium" className={styles.statLabel}>Выбрано</Typography>
        </Column>
      </Paper>
    </Grid>
  );
};

export default RolesStats;
