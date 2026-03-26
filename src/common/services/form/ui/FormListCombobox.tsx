import React from 'react';
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import { FormListComboboxViewModel } from "@common/services/form/viewmodels/FormListComboboxViewModel";
import { FormField } from '../FormField';

type Option = { id: any; label: string };

type FormListComboboxProps = {
  field: FormField;
};

const FormListComboboxView: React.FC<WithViewProps<FormListComboboxViewModel, FormListComboboxProps>> = ({ 
  viewModel, 
  field 
}) => {
  return (
    <div className="form-group">
      <select value={viewModel.currentValue} onChange={viewModel.onChange}>
        <option value="">-- выберите --</option>
        {viewModel.currentOptions.map((opt: Option) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      {viewModel.currentError && <div className="error">{viewModel.currentError}</div>}
    </div>
  );
};

export const FormListCombobox = withView(FormListComboboxView, FormListComboboxViewModel);
