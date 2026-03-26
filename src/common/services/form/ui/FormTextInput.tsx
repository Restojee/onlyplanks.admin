import React from "react";
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import { FormTextInputViewModel } from "@common/services/form/viewmodels/FormTextInputViewModel";
import { FormField } from '../FormField';
import { InputText } from '@ui/Input/ui/InputText/InputText';

type FormTextInputProps = {
  field: FormField;
};

const FormTextInputView: React.FC<WithViewProps<FormTextInputViewModel, FormTextInputProps>> = ({ 
  viewModel, 
  field 
}) => {

  return (
    <InputText
      type={viewModel.type}
      value={viewModel.currentValue}
      onChange={viewModel.onChange}
      placeholder={viewModel.field.placeholder}
    />
  );
};

export const FormTextInput = withView(FormTextInputView, FormTextInputViewModel);
