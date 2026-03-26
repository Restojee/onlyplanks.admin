import { FormBuilderProps } from "@common/services/form/types";
import React from "react";
import Entity from "@common/store/entity/Entity";
import { Form } from "@ui/FormGroup";

const FormBuilderRenderer = <E extends Entity>({ formBuilder }: FormBuilderProps<E>) => {
  return <Form onSubmit={formBuilder.onSubmit}>{formBuilder.render()}</Form>;
}

export default FormBuilderRenderer
