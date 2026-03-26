import { ButtonDropDown } from '@ui/ButtonDropDown';
import CompletedForm, { CompletedFormProps } from '@/modules/users/modules/completed/view/components/CompletedForm';
import React from 'react';

interface CreateCompletedFormIconProps extends Omit<CompletedFormProps, 'mode'> {}

const CreateCompletedFormIcon: React.FC<CreateCompletedFormIconProps> = (props) => {
  return (
    <ButtonDropDown
      icon="IconAdd"
      tooltip="Добавить выполнение"
      buttonSize="md"
    >
      <CompletedForm {...props} mode="user" />
    </ButtonDropDown>
  );
};

export default CreateCompletedFormIcon;
