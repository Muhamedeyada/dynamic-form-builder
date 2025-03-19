export interface FormFieldConfig {
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'array';
    name: string;
    label: string;
    value?: any;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options?: { label: string; value: any }[];
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    errorMessages?: {
      required?: string;
      minLength?: string;
      maxLength?: string;
      pattern?: string;
      email?: string;
      min?: string;
      max?: string;
    };
    fields?: FormFieldConfig[]; // For array types or nested form groups
  }
  
  export interface FormGroupConfig {
    title?: string;
    description?: string;
    fields: FormFieldConfig[];
  }
  
  export interface FormConfig {
    id: string;
    title: string;
    description?: string;
    groups: FormGroupConfig[];
    submitButtonText?: string;
    cancelButtonText?: string;
  }
  
  export interface ValidationErrors {
    [key: string]: any;
  }
  
  export interface FormFieldValidation {
    field: string;
    errors: ValidationErrors;
  }