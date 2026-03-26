import TagCreateForm, { TagCreateFormProps } from '@/modules/tags/view/components/TagCreateForm';
import { ButtonDropDown } from '@common/components/ButtonDropDown';
import React from 'react';

interface TagCreateFormIcon extends TagCreateFormProps {}
const TagCreateFormIcon: React.FC<TagCreateFormIcon> = ({
  description,
  onCancel,
  onDescriptionChange,
  onParentChange,
  onSubmit,
  onNameChange,
  name,
  parentTagId,
}) => {
  return (
    <ButtonDropDown
      icon="IconAdd"
      tooltip="Добавить тег"
      buttonSize="md"
    >
      <TagCreateForm
        description={description}
        onCancel={onCancel}
        name={name}
        onSubmit={onSubmit}
        onNameChange={onNameChange}
        onDescriptionChange={onDescriptionChange}
        onParentChange={onParentChange}
        parentTagId={parentTagId}
      />
    </ButtonDropDown>
  )
}

export default TagCreateFormIcon
