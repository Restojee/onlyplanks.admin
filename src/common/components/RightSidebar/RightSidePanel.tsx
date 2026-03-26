import React, { useState } from 'react';
import { Column, Row, Paper } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { VirtualScroll } from '@common/components/VirtualScroll';
import { ButtonIconDropDownMenu } from '@common/components/DropDownButtonList';
import { Dropdown, Select, MultiSelect } from '@common/components/Combobox';
import { Form } from '@ui/FormGroup';
import { type ListItemOptions } from '@ui/Select/common/types';
import { SidePanelHeader } from '@common/components/SidePanelHeader';
import { Tabs, type TabItem } from '@common/components/Tabs';
import styles from './RightSidebar.module.scss';
import { ContextMenuTrigger } from '@ui/ContextMenu';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import { CancelButton } from '@ui/Button/ui/CancelButton/CancelButton';
import { Button } from '@ui/Button';
import { Modal } from '@ui/Modal/ModalEventBus';

interface RightSidebarProps {
  component: React.ComponentType<any>;
  props: any;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ component: Component, props }) => {
  const userName = 'Пользователь';

  
  const sampleOptions: ListItemOptions[] = [
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
    { value: '3', label: 'Опция 3' },
    { value: '4', label: 'Опция 4' },
    { value: '5', label: 'Опция 5' },
  ];

  
  const [dropdownSmValue, setDropdownSmValue] = useState<any>(null);
  const [dropdownMdValue, setDropdownMdValue] = useState<any>(null);
  const [selectSmValue, setSelectSmValue] = useState<any>(null);
  const [selectMdValue, setSelectMdValue] = useState<any>(null);
  const [multiSelectSmValue, setMultiSelectSmValue] = useState<any[]>(['1', '3']); 
  const [multiSelectMdValue, setMultiSelectMdValue] = useState<any[]>(['2', '4']); 
  const [activeTab, setActiveTab] = useState<string>('tab1');

  const tabItems: TabItem[] = [
    { key: 'tab1', label: 'Вкладка 1' },
    { key: 'tab2', label: 'Вкладка 2' },
    { key: 'tab3', label: 'Вкладка 3' },
    { key: 'tab4', label: 'Вкладка 4', disabled: true },
  ];

  const profileMenuItems: ListItemOptions[] = [
    {
      label: 'Профиль',
      leftIcon: { source: 'IconUser' },
      shortcut: 'Alt+R T',
      submenu: [
        {
          label: 'Выйти',
          leftIcon: { source: 'IconLogout' },
          onItemClick: () => console.log('Logout clicked'),
        },
        {
          label: 'Редактировать',
          leftIcon: { source: 'IconEdit' },
          onItemClick: () => console.log('Edit profile clicked'),
        },
      ],
    },
    {
      label: 'Выбрать язык',
      leftIcon: { source: 'IconLanguage' },
      submenu: [
        {
          label: 'Русский',
          leftIcon: { source: 'IconCheck' },
          onItemClick: () => console.log('Russian selected'),
        },
        {
          label: 'English',
          leftIcon: { source: 'IconCheck' },
          onItemClick: () => console.log('English selected'),
        },
      ],
    },
    {
      label: 'Настройки',
      submenu: [
        {
          label: 'Общие',
          submenu: [
            {
              label: 'Тема',
              onItemClick: () => console.log('Theme clicked'),
            },
            {
              label: 'Уведомления',
              onItemClick: () => console.log('Notifications clicked'),
            },
          ],
        },
        {
          label: 'Безопасность',
          submenu: [
            {
              label: 'Сменить пароль',
              leftIcon: { source: 'IconEdit' },
              onItemClick: () => console.log('Change password clicked'),
            },
            {
              label: 'Двухфакторная аутентификация',
              leftIcon: { source: 'IconEdit' },
              onItemClick: () => console.log('2FA clicked'),
            },
          ],
        },
      ],
    },
  ];

  const contextMenuItems: ListItemOptions[] = [
    {
      label: 'Создать',
      leftIcon: { source: 'IconAdd' },
      submenu: [
        {
          label: 'Новый файл',
          leftIcon: { source: 'IconFile' },
          submenu: [
            {
              label: 'JavaScript',
              leftIcon: { source: 'IconFileCode' },
              onItemClick: () => console.log('JS file'),
            },
            {
              label: 'TypeScript',
              leftIcon: { source: 'IconFileCode' },
              onItemClick: () => console.log('TS file'),
            },
          ],
        },
        {
          label: 'Новая папка',
          leftIcon: { source: 'IconFolder' },
          onItemClick: () => console.log('New folder'),
        },
      ],
    },
    {
      label: 'Редактировать',
      leftIcon: { source: 'IconEdit' },
      onItemClick: () => console.log('Edit'),
    },
    {
      label: 'Удалить',
      leftIcon: { source: 'IconDelete' },
      onItemClick: () => console.log('Delete'),
    },
  ];

  return (
    <Column height={1} width={1} className={styles.sidebar}>
      <SidePanelHeader title="Примеры компонентов" />
      <VirtualScroll enableHorizontal useCustomScrollbar={true}>
        <div className={styles.content}>
          { Component && <Component {...props} /> }
          
          <Paper className={styles.examplesSection}>
            <Column gap="lg" px="md" py="md">
              <Typography size="lg">Примеры компонентов</Typography>
              
              <Column gap="md">
                <Typography size="md">Dropdown</Typography>
                
                <Form.Field>
                  <Form.Field.Label>Size: sm</Form.Field.Label>
                  <Form.Field.Item>
                    <Dropdown
                      icon="IconFilter"
                      options={sampleOptions}
                      onChange={(opt) => setDropdownSmValue(opt.value)}
                      tooltip="Фильтр (sm)"
                      size="sm"
                    />
                  </Form.Field.Item>
                  {dropdownSmValue && (
                    <Typography size="sm">
                      Выбрано: {sampleOptions.find(o => o.value === dropdownSmValue)?.label}
                    </Typography>
                  )}
                </Form.Field>

                <Form.Field>
                  <Form.Field.Label>Size: md</Form.Field.Label>
                  <Form.Field.Item>
                    <Dropdown
                      icon="IconFilter"
                      options={sampleOptions}
                      onChange={(opt) => setDropdownMdValue(opt.value)}
                      tooltip="Фильтр (md)"
                      size="md"
                    />
                  </Form.Field.Item>
                  {dropdownMdValue && (
                    <Typography size="sm">
                      Выбрано: {sampleOptions.find(o => o.value === dropdownMdValue)?.label}
                    </Typography>
                  )}
                </Form.Field>
              </Column>

              <Column gap="md">
                <Typography size="md">Select (Single)</Typography>
                
                <Form.Field>
                  <Form.Field.Label>Size: sm</Form.Field.Label>
                  <Form.Field.Item>
                    <Select
                      options={sampleOptions}
                      onChange={(opt) => setSelectSmValue(opt.value)}
                      value={selectSmValue}
                      placeholder="Выберите опцию..."
                      size="sm"
                    />
                  </Form.Field.Item>
                  {selectSmValue && (
                    <Typography size="sm">
                      Выбрано: {sampleOptions.find(o => o.value === selectSmValue)?.label}
                    </Typography>
                  )}
                </Form.Field>

                <Form.Field>
                  <Form.Field.Label>Size: md</Form.Field.Label>
                  <Form.Field.Item>
                    <Select
                      options={sampleOptions}
                      onChange={(opt) => setSelectMdValue(opt.value)}
                      value={selectMdValue}
                      placeholder="Выберите опцию..."
                      size="md"
                    />
                  </Form.Field.Item>
                  {selectMdValue && (
                    <Typography size="sm">
                      Выбрано: {sampleOptions.find(o => o.value === selectMdValue)?.label}
                    </Typography>
                  )}
                </Form.Field>
              </Column>

              <Column gap="md">
                <Typography size="md">MultiSelect</Typography>
                
                <Form.Field>
                  <Form.Field.Label>Size: sm</Form.Field.Label>
                  <Form.Field.Item>
                    <MultiSelect
                      options={sampleOptions}
                      onChange={(values) => setMultiSelectSmValue(values)}
                      value={multiSelectSmValue}
                      placeholder="Выберите несколько..."
                      size="sm"
                    />
                  </Form.Field.Item>
                  {multiSelectSmValue.length > 0 && (
                    <Typography size="sm">
                      Выбрано: {multiSelectSmValue.map(v => sampleOptions.find(o => o.value === v)?.label).join(', ')}
                    </Typography>
                  )}
                </Form.Field>

                <Form.Field>
                  <Form.Field.Label>Size: md</Form.Field.Label>
                  <Form.Field.Item>
                    <MultiSelect
                      options={sampleOptions}
                      onChange={(values) => setMultiSelectMdValue(values)}
                      value={multiSelectMdValue}
                      placeholder="Выберите несколько..."
                      size="md"
                    />
                  </Form.Field.Item>
                  {multiSelectMdValue.length > 0 && (
                    <Typography size="sm">
                      Выбрано: {multiSelectMdValue.map(v => sampleOptions.find(o => o.value === v)?.label).join(', ')}
                    </Typography>
                  )}
                </Form.Field>
              </Column>

              <Column gap="md">
                <Typography size="md">DropDownMenu</Typography>
                
                <Form.Field>
                  <Form.Field.Label>Меню с вложенностью</Form.Field.Label>
                  <Form.Field.Item>
                    <ButtonIconDropDownMenu
                      icon="IconMenu"
                      options={profileMenuItems}
                      tooltip="Меню"
                      menuSize="sm"
                      title={userName}
                    />
                  </Form.Field.Item>
                </Form.Field>
              </Column>

              <Column gap="md">
                <Typography size="md">Tabs</Typography>
                
                <Form.Field>
                  <Form.Field.Label>Size: sm</Form.Field.Label>
                  <Form.Field.Item>
                    <Tabs
                      items={tabItems}
                      activeKey={activeTab}
                      onChange={setActiveTab}
                      size="sm"
                    />
                  </Form.Field.Item>
                  <Typography size="sm">
                    Активная вкладка: {activeTab}
                  </Typography>
                </Form.Field>

                <Form.Field>
                  <Form.Field.Label>Size: md</Form.Field.Label>
                  <Form.Field.Item>
                    <Tabs
                      items={tabItems}
                      activeKey={activeTab}
                      onChange={setActiveTab}
                      size="md"
                    />
                  </Form.Field.Item>
                </Form.Field>
              </Column>
            </Column>
          </Paper>
        </div>

        <Paper>
          <Column gap="sm" pa="md">
            <Row>ContextMenu пример:</Row>
            <ContextMenuTrigger items={contextMenuItems}>
              <div
                style={{
                  padding: '40px',
                  border: '2px dashed #ccc',
                  borderRadius: '4px',
                  textAlign: 'center',
                  cursor: 'context-menu',
                }}
              >
                Правый клик
              </div>
            </ContextMenuTrigger>
          </Column>
        </Paper>

        <Paper className={styles.examplesSection}>
          <Column gap="lg" px="md" py="md">
            <Typography size="lg">Уведомления</Typography>
            
            <Column gap="md">
              <Form.Field>
                <Form.Field.Label>Типы уведомлений</Form.Field.Label>
                <Column gap="sm">
                  <Button onClick={() => Notification.success('Успех!', 'Операция выполнена успешно')}>
                    Success
                  </Button>
                  <Button onClick={() => Notification.error('Ошибка', 'Что-то пошло не так')}>
                    Error
                  </Button>
                  <Button onClick={() => Notification.warning('Внимание', 'Проверьте введенные данные')}>
                    Warning
                  </Button>
                  <Button onClick={() => Notification.info('Информация', 'Это информационное сообщение')}>
                    Info
                  </Button>
                </Column>
              </Form.Field>
            </Column>
          </Column>
        </Paper>

        <Paper className={styles.examplesSection}>
          <Column gap="lg" px="md" py="md">
            <Typography size="lg">Модальные окна</Typography>
            
            <Column gap="md">
              <Form.Field>
                <Form.Field.Label>Размеры модальных окон</Form.Field.Label>
                <Column gap="sm">
                  <Button
                    onClick={() => Modal.show('Маленькое окно', {
                      size: 'sm',
                      content: <Typography>Это маленькое модальное окно</Typography>
                    })}
                  >
                    Size: sm
                  </Button>
                  <Button
                    onClick={() => Modal.show('Среднее окно', {
                      size: 'md',
                      content: <Typography>Это среднее модальное окно</Typography>
                    })}
                  >
                    Size: md
                  </Button>
                  <Button
                    onClick={() => Modal.show('Большое окно', {
                      size: 'lg',
                      content: <Typography>Это большое модальное окно</Typography>
                    })}
                  >
                    Size: lg
                  </Button>
                  <CancelButton
                    onClick={() => showConfirm('Удаление тегов', {
                      text: 'Вы действительно хотите удалить выбранные теги?',
                      onSuccess: () => Notification.success('Удалено', 'Теги успешно удалены'),
                      onClose: () => console.log('Modal closed'),
                    })}
                  >
                    Show Confirm
                  </CancelButton>
                </Column>
              </Form.Field>
            </Column>
          </Column>
        </Paper>

      </VirtualScroll>
    </Column>
  );
};
