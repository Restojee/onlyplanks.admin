import { BaseValidationHandler } from '@common/services/validation';
import React from 'react';


export interface IntegrationConfig {
  props?: Record<string, any>;
  validators?: ValidationRule[];
  type?: string;
  fieldKey?: string;
  mode?: 'Change' | 'Blur' | 'Submit';
  component?: React.ComponentType<any>;
  title?: string;
  baseModel?: string; 
}

export interface ValidationRule {
  type: 'min' | 'max' | 'custom' | 'handler';
  value?: number;
  message?: string;
  mode?: 'Change' | 'Blur' | 'Submit';
  validator?: any;
  handlerInstance?: any; 
  handlerClass?: new (...args: any[]) => any; 
  fieldKey?: string; 
}

export interface IntegrationBuilder {
  config: IntegrationConfig;
}


export type BuilderFunction = (config: IntegrationConfig) => IntegrationConfig;


export function withProps(props: Record<string, any>): BuilderFunction {
  return (config: IntegrationConfig) => ({
    ...config,
    props: { ...config.props, ...props }
  });
}

export function validate(...rules: (ValidationRule | any)[]): BuilderFunction {
  return (config: IntegrationConfig) => {
    const processedRules: ValidationRule[] = [];
    
    rules.forEach(rule => {
      
      if (rule instanceof BaseValidationHandler) {
        processedRules.push({
          type: 'handler',
          handlerInstance: rule,
          mode: 'Blur' 
        });
      }
      
      else if (typeof rule === 'function') {
        processedRules.push({
          type: 'handler',
          handlerClass: rule,
          mode: 'Blur' 
        });
      }
    });
    
    return {
      ...config,
      validators: [...(config.validators || []), ...processedRules]
    };
  };
}

export function type(fieldType: string): BuilderFunction {
  return (config: IntegrationConfig) => ({
    ...config,
    type: fieldType
  });
}

export function key(fieldKey: string): BuilderFunction {
  return (config: IntegrationConfig) => ({
    ...config,
    fieldKey: fieldKey
  });
}

export function component(Component: React.ComponentType<any>): BuilderFunction {
  return (config: IntegrationConfig) => ({
    ...config,
    component: Component
  });
}

export function title(titleText: string): BuilderFunction {
  return (config: IntegrationConfig) => ({
    ...config,
    title: titleText
  });
}

export function extend(baseModelType: string): BuilderFunction {
  return (config: IntegrationConfig) => ({
    ...config,
    baseModel: baseModelType
  });
}


export function min(value: number, message?: string, eventMode?: 'Change' | 'Blur' | 'Submit'): ValidationRule {
  return {
    type: 'min',
    value,
    message: message || `Минимальное значение: ${value}`,
    mode: eventMode || 'Change'
  };
}

export function max(value: number, message?: string, eventMode?: 'Change' | 'Blur' | 'Submit'): ValidationRule {
  return {
    type: 'max',
    value,
    message: message || `Максимальное значение: ${value}`,
    mode: eventMode || 'Change'
  };
}

export function mode(eventType: 'Change' | 'Blur' | 'Submit'): BuilderFunction {
  return (config: IntegrationConfig) => ({
    ...config,
    mode: eventType
  });
}


export function mergeConfigs(...builders: IntegrationBuilder[]): IntegrationConfig {
  const merged: IntegrationConfig = {
    props: {},
    validators: [],
    type: undefined,
    mode: undefined,
    component: undefined,
    title: undefined,
    baseModel: undefined
  };

  builders.forEach(builder => {
    if (builder.config.props) {
      merged.props = { ...merged.props, ...builder.config.props };
    }
    if (builder.config.validators) {
      merged.validators = [...(merged.validators || []), ...builder.config.validators];
    }
    if (builder.config.type) {
      merged.type = builder.config.type;
    }
    if (builder.config.fieldKey) {
      merged.fieldKey = builder.config.fieldKey;
    }
    if (builder.config.mode) {
      merged.mode = builder.config.mode;
    }
    if (builder.config.component) {
      merged.component = builder.config.component;
    }
    if (builder.config.title) {
      merged.title = builder.config.title;
    }
    if (builder.config.baseModel) {
      merged.baseModel = builder.config.baseModel;
    }
  });

  return merged;
}


export function integrate(...builders: BuilderFunction[]): IntegrationConfig {
  let config: IntegrationConfig = {
    props: {},
    validators: [],
    type: undefined,
    mode: undefined,
    component: undefined,
    title: undefined,
    baseModel: undefined
  };

  builders.forEach(builder => {
    config = builder(config);
  });

  return config;
}
