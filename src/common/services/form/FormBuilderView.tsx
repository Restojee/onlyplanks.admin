import FormBuilderRenderer from "@common/services/form/ui/FormBuilderRenderer";
import React from "react";
import FormBuilder from "@common/services/form/FormBuilder";
import Entity from "@common/store/entity/Entity";

interface FormBuilderViewProps<E extends Entity> {
  initialValues?: E;
  schemaBuilder?: (formBuilder: FormBuilder<E>, request: E) => void;
  formBuilder: FormBuilder<E>
}

function FormBuilderView<E extends Entity>({ formBuilder }: FormBuilderViewProps<E>) {
  
  return FormBuilderRenderer<E>({ formBuilder })
}

export default React.memo(FormBuilderView)
