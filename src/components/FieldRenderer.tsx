import React from 'react';
import { FieldRendererProps } from '@/types';

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  config,
  value,
  error,
  touched,
  onChange,
  onBlur,
}) => {
  const baseInputClass = `form-field__input ${error && touched ? 'form-field__input--error' : ''}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { type } = e.target;
    
    if (type === 'checkbox') {
      onChange((e.target as HTMLInputElement).checked);
    } else if (type === 'number') {
      onChange(parseFloat(e.target.value) || 0);
    } else if (type === 'file') {
      onChange((e.target as HTMLInputElement).files);
    } else {
      onChange(e.target.value);
    }
  };

  const handleRadioChange = (optionValue: string) => {
    onChange(optionValue);
  };

  const renderInput = () => {
    switch (config.type) {
      case 'textarea':
        return (
          <textarea
            id={config.id}
            className={`${baseInputClass} form-field__textarea`}
            placeholder={config.placeholder}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={config.disabled}
            style={config.style}
          />
        );

      case 'select':
        return (
          <select
            id={config.id}
            className={`${baseInputClass} form-field__select`}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={config.disabled}
            style={config.style}
          >
            {!config.defaultValue && <option value="">Select an option</option>}
            {config.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="form-field__checkbox-container">
            <input
              type="checkbox"
              id={config.id}
              className="form-field__checkbox"
              checked={value || false}
              onChange={handleChange}
              onBlur={onBlur}
              disabled={config.disabled}
              style={config.style}
            />
            <label htmlFor={config.id} className="form-field__label">
              {config.label}
              {config.required && <span className="form-field__label--required"></span>}
            </label>
          </div>
        );

      case 'radio':
        return (
          <div className="form-field__radio-group">
            {config.options?.map((option) => (
              <div key={option.value} className="form-field__radio-option">
                <input
                  type="radio"
                  id={`${config.id}-${option.value}`}
                  name={config.id}
                  className="form-field__radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => handleRadioChange(option.value)}
                  onBlur={onBlur}
                  disabled={config.disabled}
                  style={config.style}
                />
                <label htmlFor={`${config.id}-${option.value}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <input
            type={config.type}
            id={config.id}
            className={baseInputClass}
            placeholder={config.placeholder}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={config.disabled}
            style={config.style}
          />
        );
    }
  };

  return (
    <div className={`form-field ${config.className || ''}`}>
      {config.type !== 'checkbox' && (
        <label htmlFor={config.id} className={`form-field__label ${config.required ? 'form-field__label--required' : ''}`}>
          {config.label}
        </label>
      )}
      {renderInput()}
      {error && touched && <p className="form-field__error">{error}</p>}
    </div>
  );
};