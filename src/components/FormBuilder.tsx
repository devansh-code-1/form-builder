import React, { useState, useCallback, useEffect } from 'react';
import { FormBuilderProps, FormState } from '@/types';
import { FieldRenderer } from './FieldRenderer';
import { validateForm, getDefaultValues } from '@/utils/validation';
import '@/styles/FormBuilder.css';

export const FormBuilder: React.FC<FormBuilderProps> = ({
  config,
  onSubmit,
  onReset,
  onChange,
  className,
  style,
}) => {
  const [formState, setFormState] = useState<FormState>(() => {
    const defaultValues = getDefaultValues(config.fields);
    return {
      values: defaultValues,
      errors: [],
      touched: new Set(),
      isSubmitting: false,
      isValid: true,
    };
  });

  // Validate form whenever values change
  useEffect(() => {
    const errors = validateForm(config.fields, formState.values);
    const isValid = errors.length === 0;
    
    setFormState(prev => ({
      ...prev,
      errors,
      isValid,
    }));

    // Call onChange callback if provided
    if (onChange) {
      onChange(formState.values);
    }
  }, [formState.values, config.fields, onChange]);

  const handleFieldChange = useCallback((fieldId: string, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [fieldId]: value,
      },
    }));
  }, []);

  const handleFieldBlur = useCallback((fieldId: string) => {
    setFormState(prev => ({
      ...prev,
      touched: new Set([...prev.touched, fieldId]),
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched to show validation errors
    const allFieldIds = config.fields.map(field => field.id);
    setFormState(prev => ({
      ...prev,
      touched: new Set(allFieldIds),
      isSubmitting: true,
    }));

    // Check if form is valid
    const errors = validateForm(config.fields, formState.values);
    if (errors.length > 0) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        errors,
        isValid: false,
      }));
      return;
    }

    try {
      await onSubmit(formState.values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
      }));
    }
  };

  const handleReset = () => {
    const defaultValues = getDefaultValues(config.fields);
    setFormState({
      values: defaultValues,
      errors: [],
      touched: new Set(),
      isSubmitting: false,
      isValid: true,
    });

    if (onReset) {
      onReset();
    }
  };

  const getFieldError = (fieldId: string): string | undefined => {
    return formState.errors.find(error => error.fieldId === fieldId)?.message;
  };

  return (
    <div className={`form-builder ${className || ''}`} style={style}>
      {(config.title || config.description) && (
        <div className="form-builder__header">
          {config.title && <h2 className="form-builder__title">{config.title}</h2>}
          {config.description && <p className="form-builder__description">{config.description}</p>}
        </div>
      )}

      <form className="form-builder__form" onSubmit={handleSubmit}>
        {config.fields.map((fieldConfig) => (
          <FieldRenderer
            key={fieldConfig.id}
            config={fieldConfig}
            value={formState.values[fieldConfig.id]}
            error={getFieldError(fieldConfig.id)}
            touched={formState.touched.has(fieldConfig.id)}
            onChange={(value) => handleFieldChange(fieldConfig.id, value)}
            onBlur={() => handleFieldBlur(fieldConfig.id)}
          />
        ))}

        <div className="form-builder__actions">
          <button
            type="submit"
            disabled={formState.isSubmitting || !formState.isValid}
            className="form-builder__button form-builder__button--primary"
          >
            {formState.isSubmitting ? 'Submitting...' : (config.submitLabel || 'Submit')}
          </button>

          {onReset && (
            <button
              type="button"
              onClick={handleReset}
              disabled={formState.isSubmitting}
              className="form-builder__button form-builder__button--secondary"
            >
              {config.resetLabel || 'Reset'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};