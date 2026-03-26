import React, { useState } from 'react';
import { Tabs, TabItem } from '@ui/Tabs';
import { Column, Row } from '@ui/Layout';
import styles from './SidebarTabs.module.scss';

export interface SidebarTabConfig {
  key: string;
  title: string;
  component: React.ComponentType<any>;
  props?: any;
  icon?: React.ReactNode;
}

interface SidebarTabsProps {
  tabs: SidebarTabConfig[];
  defaultActiveKey?: string;
  children?: React.ReactNode;
}

export const SidebarTabs: React.FC<SidebarTabsProps> = React.memo(({
  tabs,
  defaultActiveKey,
  children,
}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || tabs[0]?.key);

  const activeTab = tabs.find(tab => tab.key === activeKey);
  const ActiveComponent = activeTab?.component;

  const tabItems: TabItem[] = tabs.map(tab => ({
    key: tab.key,
    label: tab.title,
    icon: tab.icon,
  }));

  return (
    <Column height={1} width={1} className={styles.sidebarTabs}>
      <Row className={styles.tabsHeader}>
        <Tabs
          items={tabItems}
          activeKey={activeKey}
          onChange={setActiveKey}
          size="md"
        />
      </Row>
      {children}
      <Column className={styles.sidebarContent}>
        <ActiveComponent {...activeTab.props} />
      </Column>
    </Column>
  );
});
