import { FieldConfig, ValidationRule, ValidationError, FieldValue } from '@/types';

export const validateField = (
  config: FieldConfig, 
  value: any
): ValidationError | null => {
  if (!config.validation || config.validation.length === 0) {
    return null;
  }

  for (const rule of config.validation) {
    const error = validateRule(rule, value, config.id);
    if (error) {
      return error;
    }
  }

  return null;
};

const validateRule = (
  rule: ValidationRule, 
  value: any, 
  fieldId: string
): ValidationError | null => {
  switch (rule.type) {
    case 'required':
      if (value === null || value === undefined || value === '' || 
          (Array.isArray(value) && value.length === 0)) {
        return { fieldId, message: rule.message };
      }
      break;

    case 'minLength':
      if (typeof value === 'string' && rule.value && typeof rule.value === 'number' && value.length < rule.value) {
        return { fieldId, message: rule.message };
      }
      break;

    case 'maxLength':
      if (typeof value === 'string' && rule.value && typeof rule.value === 'number' && value.length > rule.value) {
        return { fieldId, message: rule.message };
      }
      break;

    case 'pattern':
      if (typeof value === 'string' && rule.value instanceof RegExp && !rule.value.test(value)) {
        return { fieldId, message: rule.message };
      }
      break;

    case 'custom':
      if (rule.validator && !rule.validator(value)) {
        return { fieldId, message: rule.message };
      }
      break;

    default:
      break;
  }

  return null;
};

export const validateForm = (
  config: FieldConfig[], 
  values: FieldValue
): ValidationError[] => {
  const errors: ValidationError[] = [];

  config.forEach(fieldConfig => {
    const fieldValue = values[fieldConfig.id];
    const error = validateField(fieldConfig, fieldValue);
    if (error) {
      errors.push(error);
    }
  });

  return errors;
};

export const getDefaultValues = (fields: FieldConfig[]): FieldValue => {
  const values: FieldValue = {};
  
  fields.forEach(field => {
    switch (field.type) {
      case 'checkbox':
        values[field.id] = field.defaultValue ?? false;
        break;
      case 'select':
      case 'radio':
        values[field.id] = field.defaultValue ?? (field.options?.[0]?.value || '');
        break;
      case 'number':
        values[field.id] = field.defaultValue ?? 0;
        break;
      default:
        values[field.id] = field.defaultValue ?? '';
    }
  });

  return values;
};