import { ButtonDropDown } from '@ui/ButtonDropDown';
import CommentForm, { CommentFormProps } from '@/modules/users/modules/comments/view/components/CommentForm';
import React from 'react';

interface CreateCommentFormIconProps extends Omit<CommentFormProps, 'mode'> {}

const CreateCommentFormIcon: React.FC<CreateCommentFormIconProps> = (props) => {
  return (
    <ButtonDropDown
      icon="IconAdd"
      tooltip="Добавить комментарий"
      buttonSize="md"
    >
      <CommentForm {...props} mode="user" />
    </ButtonDropDown>
  );
};

export default CreateCommentFormIcon;
