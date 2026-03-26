import { ButtonDropDown } from '@ui/ButtonDropDown';
import UserFavoriteForm, { FavoriteFormProps } from '@/modules/users/modules/favorites/view/components/UserFavoriteForm';
import React from 'react';

interface CreateFavoriteFormIconProps extends Omit<FavoriteFormProps, 'mode'> {}

const CreateFavoriteFormIcon: React.FC<CreateFavoriteFormIconProps> = (props) => {
  return (
    <ButtonDropDown
      icon="IconAdd"
      tooltip="Добавить в избранное"
      buttonSize="md"
    >
      <UserFavoriteForm {...props} mode="level" />
    </ButtonDropDown>
  );
};

export default CreateFavoriteFormIcon;
