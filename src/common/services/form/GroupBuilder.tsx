import React from 'react';
import { observer } from 'mobx-react-lite';
import { ListComboboxChain } from "@common/services/form/chain/ListComboboxChain";
import { RadioChain } from "@common/services/form/chain/RadioChain";
import { ButtonChain } from "@common/services/form/chain/ButtonChain";
import { FileUploadChain } from "@common/services/form/chain/FileUploadChain";
import { TextInputChain } from "@common/services/form/chain/TextInputChain";
import { BaseCustomChain } from "@common/services/form/chain/BaseCustomChain";
import { FormTextInput } from "@common/services/form/ui/FormTextInput";
import { FormFileUpload } from "@common/services/form/ui/FormFileUpload";
import { FormListCombobox } from "@common/services/form/ui/FormListCombobox";
import { FormButton } from "@common/services/form/ui/FormButton";
import { FormRadio } from "@common/services/form/ui/FormRadio";
import { EntityDataHandler } from "@common/services/form/EntityDataHandler";
import { FormField } from "@common/services/form/FormField";
import { Form } from "@ui/FormGroup/ui/Form";
import { BuilderFunction, IntegrationConfig } from './ui/builders/ValidationUtils';
import FormBuilder from '@common/services/form/FormBuilder';


export class GroupBuilder {
  store: EntityDataHandler;
  components: React.ReactNode[] = [];
  formBuilder: FormBuilder<any>;

  constructor(store: EntityDataHandler, formBuilder: FormBuilder<any>) {
    this.store = store;
    this.formBuilder = formBuilder;
  }

  private addComponent(fieldKey: string, component: React.ReactNode) {
    this.components.push(component);
  }

  private createFormFieldComponent(key: string, field: FormField, inputComponent: React.ReactNode, needTitle = true) {
    const ReactiveFormField = observer(() => (
      <Form.Field>
        {
          needTitle && (
            <Form.Field.Label htmlFor={key}>{field.title}</Form.Field.Label>
          )
        }
        <Form.Field.Item error={field.error}>
          {inputComponent}
        </Form.Field.Item>
      </Form.Field>
    ));

    return <ReactiveFormField key={key} />;
  }

  public TextInput = {
    make: (key: string): TextInputChain => {
      const field = this.store.getField(key);
      const inputComponent = <FormTextInput key={key} field={field} />;

      const chain = new TextInputChain(field, key);
      
      const wrappedComponent = this.createFormFieldComponent(key, field, inputComponent);
      
      this.addComponent(key, wrappedComponent);
      return chain;
    },
  };

  public FileUpload = {
    make: (key: string, fileConfig?: any): FileUploadChain => {
      const field = this.store.getField(key);
      
      if (fileConfig) {
        const config: any = {};
        
        if (typeof fileConfig.getMaxSize === 'function') {
          config.maxSize = fileConfig.getMaxSize();
        }
        if (typeof fileConfig.getAllowedTypes === 'function') {
          config.allowedTypes = fileConfig.getAllowedTypes();
        }
        if (typeof fileConfig.getIsCircular === 'function') {
          config.isCircular = fileConfig.getIsCircular();
          config.avatar = fileConfig.getIsCircular();
        }
        if (typeof fileConfig.getDimensions === 'function') {
          config.dimensions = fileConfig.getDimensions();
        }
        if (typeof fileConfig.validateFile === 'function') {
          config.validateFile = fileConfig.validateFile.bind(fileConfig);
        }
        
        field.setConfig(config);
      }
      
      const inputComponent = <FormFileUpload key={key} field={field} />;
      
      const chain = new FileUploadChain(field, key);
      
      const wrappedComponent = this.createFormFieldComponent(key, field, inputComponent);
      
      this.addComponent(key, wrappedComponent);
      return chain;
    },
  };

  public Button = {
    make: (key = "submit"): ButtonChain => {
      const field = this.store.getField(key);
      const inputComponent = <FormButton key={key} field={field} />;

      const chain = new ButtonChain(field, key);

      const wrappedComponent = this.createFormFieldComponent(key, field, inputComponent);

      this.addComponent(key, wrappedComponent);

      return chain;
    },
  };

  public ListCombobox = {
    make: (key: string, optionsProvider?: any): ListComboboxChain => {
      const field = this.store.getField(key);
      
      if (optionsProvider && typeof optionsProvider.getOptions === 'function') {
        const options = optionsProvider.getOptions();
        field.setConfig({ options });
      }
      
      const inputComponent = <FormListCombobox key={key} field={field} />;
      
      const chain = new ListComboboxChain(field, key);
      
      const wrappedComponent = this.createFormFieldComponent(key, field, inputComponent);
      
      this.addComponent(key, wrappedComponent);
      return chain;
    },
  };

  public Radio = {
    make: (key: string, optionsProvider?: any): RadioChain => {
      const field = this.store.getField(key);
      
      if (optionsProvider && typeof optionsProvider.getOptions === 'function') {
        const options = optionsProvider.getOptions();
        field.setConfig({ options });
      }
      
      const inputComponent = <FormRadio key={key} field={field} />;
      
      const chain = new RadioChain(field, key);
      
      const wrappedComponent = this.createFormFieldComponent(key, field, inputComponent);
      
      this.addComponent(key, wrappedComponent);
      return chain;
    },
  };

  public integrate(...builders: BuilderFunction[]): BaseCustomChain {
    let config: IntegrationConfig = {
      props: {},
      validators: [],
      type: undefined,
      mode: undefined,
      component: undefined
    };

    builders.forEach(builder => {
      config = builder(config);
    });

    if (!config.component) {
      throw new Error('Component is required. Use component() builder function.');
    }
    if (!config.fieldKey) {
      throw new Error('Field key is required. Use key() builder function.');
    }

    const fieldKey = config.fieldKey;
    const field = this.store.getField(fieldKey);

    if (config.title) {
      field.setTitle(config.title)
    }

    const inputComponent = <config.component {...config.props} field={field} key={fieldKey} />

    const wrappedComponent = this.createFormFieldComponent(
      fieldKey,
      field,
      inputComponent
    );
    
    this.addComponent(fieldKey, wrappedComponent);
    
    return new BaseCustomChain(field);
  }

  render(): React.ReactNode[] {
    return this.components;
  }
}
