import { ButtonDropDown } from '@ui/ButtonDropDown';
import LevelCreateForm, { LevelCreateFormProps } from '@/modules/levels/view/components/LevelCreateForm';
import React from 'react';

interface CreateLevelFormIconProps extends LevelCreateFormProps {}
const CreateLevelFormIcon: React.FC<CreateLevelFormIconProps> = ({
  name,
  onNameChange,
  onDescriptionChange,
  onSubmit,
  onCancel,
  description
}) => {
  return (
    <ButtonDropDown
      icon="IconAdd"
      tooltip="Добавить уровень"
      buttonSize="md"
    >
      <LevelCreateForm
        name={name}
        description={description}
        onNameChange={onNameChange}
        onDescriptionChange={onDescriptionChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </ButtonDropDown>
  )
}

export default CreateLevelFormIcon
