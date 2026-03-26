import React from 'react';
import { Column } from '@ui/Layout';
import { VirtualScroll } from '@common/components/VirtualScroll';
import { SidePanelHeader } from '@common/components/SidePanelHeader';
import { IconButton } from '@ui/Button/ui/IconButton/IconButton';
import styles from './RightSidebar.module.scss';
import {ButtonIcon} from "@ui/ButtonIcon";

interface RightSidebarProps {
  title: string;
  component: React.ComponentType<any>;
  props: any;
  onClose?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ component: Component, props, title, onClose }) => {
  return (
    <Column height={1} width={1} className={styles.sidebar}>
      { title && (
        <SidePanelHeader title={title}>
          <ButtonIcon
            icon="IconReject"
            size="xl"
            onClick={onClose}
          />
        </SidePanelHeader>
      ) }
      <Column height={1} className={styles.content}>
        <VirtualScroll>
          { Component && <Component {...props} /> }
        </VirtualScroll>
      </Column>
    </Column>
  );
};
