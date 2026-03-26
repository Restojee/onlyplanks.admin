import React from 'react';
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import { FormRadioViewModel } from "@common/services/form/viewmodels/FormRadioViewModel";
import { FormField } from '../FormField';

type Option = { id: any; label: string };

type FormRadioProps = {
  field: FormField;
};

const FormRadioView: React.FC<WithViewProps<FormRadioViewModel, FormRadioProps>> = ({ 
  viewModel, 
  field 
}) => {
  return (
    <div>
      {viewModel.currentOptions.map((opt) => (
        <div key={opt.id}>
          <input
            type="radio"
            id={opt.id}
            name={`radio-${field.name}`}
            value={opt.id}
            checked={viewModel.field.value === String(opt.id)}
            onChange={viewModel.onChange}
          />
          <label htmlFor={opt.id}>{opt.label}</label>
        </div>
      ))}
      {viewModel.currentError && <div className="error">{viewModel.currentError}</div>}
    </div>
  );
};

export const FormRadio = withView(FormRadioView, FormRadioViewModel);
