import React from "react";
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import { FormFileUploadViewModel } from "@common/services/form/viewmodels/FormFileUploadViewModel";
import { FormField } from '../FormField';

type FormFileUploadProps = {
  field: FormField;
};

const FormFileUploadView: React.FC<WithViewProps<FormFileUploadViewModel, FormFileUploadProps>> = ({ 
  viewModel, 
  field 
}) => {
  return (
    <div className="form-group">
      <input type="file" onChange={viewModel.onChange} />
      {viewModel.currentError && <div className="error">{viewModel.currentError}</div>}
      {viewModel.previewUrl && (
        <img
          src={viewModel.previewUrl}
          alt="Avatar preview"
          style={{ width: 100, height: 100, borderRadius: "50%" }}
        />
      )}
    </div>
  );
};

export const FormFileUpload = withView(FormFileUploadView, FormFileUploadViewModel);
