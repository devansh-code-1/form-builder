export type FieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'file';

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: string | number | RegExp;
  message: string;
  validator?: (value: any) => boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  defaultValue?: any;
  required?: boolean;
  validation?: ValidationRule[];
  options?: SelectOption[]; // For select and radio fields
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface FormConfig {
  id: string;
  title?: string;
  description?: string;
  fields: FieldConfig[];
  submitLabel?: string;
  resetLabel?: string;
}

export interface FieldValue {
  [fieldId: string]: any;
}

export interface ValidationError {
  fieldId: string;
  message: string;
}

export interface FormState {
  values: FieldValue;
  errors: ValidationError[];
  touched: Set<string>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface FormBuilderProps {
  config: FormConfig;
  onSubmit: (values: FieldValue) => void | Promise<void>;
  onReset?: () => void;
  onChange?: (values: FieldValue) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface FieldRendererProps {
  config: FieldConfig;
  value: any;
  error?: string;
  touched: boolean;
  onChange: (value: any) => void;
  onBlur: () => void;
}