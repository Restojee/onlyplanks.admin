import React from "react";
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import { FormButtonViewModel } from "@common/services/form/viewmodels/FormButtonViewModel";
import { FormField } from '../FormField';
import { SubmitButton as Button } from '@ui/Button/ui/SubmitButton/SubmitButton';

type FormButtonProps = {
  field: FormField;
  title?: string;
};

const SubmitButton: React.FC<WithViewProps<FormButtonViewModel, FormButtonProps>> = ({ viewModel }) => {
  return (
    <Button
      type={viewModel.buttonType}
      onClick={viewModel.handleClick}
      disabled={viewModel.isDisabled}
    >
      {viewModel.currentTitle}
    </Button>
  );
};

export const FormButton = withView(SubmitButton, FormButtonViewModel);
