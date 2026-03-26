import * as React from "react";
import { Center, Column, Paper, Row } from "@ui/Layout";
import NavigationModule from "@/modules/navigation/view";
import { ButtonIconDropDownMenu } from '@common/components/DropDownButtonList';
import { ContextMenuTrigger } from '@common/components/ContextMenu';
import { type ListItemOptions } from '@ui/Select/common/types';
import { SupportedLanguage } from '@common/services/intl';

import "./SidePanel.scss";
import { withView } from '@common/hocs/withView';
import SidePanelModel from '@common/containers/SidePanel/SidePanelModel';
import { WithViewProps } from '@common/hocs/withView/types';

const SidePanel: React.FC<WithViewProps<SidePanelModel, {}>> = ({ viewModel }) => {
  const userName = viewModel.userName || 'Пользователь';

  const menuItems: ListItemOptions[] = [
    {
      label: 'Профиль',
      leftIcon: { source: 'IconUser' },
      submenu: [
        {
          label: 'Выйти',
          leftIcon: { source: 'IconLogout' },
          onItemClick: () => viewModel.logout(),
        },
      ],
    },
    {
      label: 'Выбрать язык',
      leftIcon: { source: 'IconLanguage' },
      submenu: viewModel.supportedLanguages.map((language) => ({
        label: viewModel.getLanguageName(language),
        leftIcon: { source: viewModel.isLanguageActive(language) ? 'IconCheck' : 'IconLanguage' },
        onItemClick: () => viewModel.changeLanguage(language),
      })),
    },
  ];

  return (
  <Column bgColor="paletteBackgroundTertiary" minWidth={300} maxWidth={300} py="sm" px="xs" gap="sm">
    <Paper bgColor="paletteBackgroundPrimary">
      <Column width={1}>
        <Column>
          <NavigationModule />
        </Column>
        <Center>
          <ButtonIconDropDownMenu
            imageSrc=""
            imageSize="lg"
            avatarHoverIcon="IconEdit"
            options={menuItems}
            tooltip="Меню"
            menuSize="md"
            buttonSize="md"
            title={userName}
          />
        </Center>
      </Column>
    </Paper>

  </Column>
  );
}

export default withView(SidePanel as any, SidePanelModel);
