import React from 'react';
import { FormBuilder } from './components/FormBuilder';
import { FormConfig, FieldValue } from './types';

const sampleFormConfig: FormConfig = {
  id: 'sample-form',
  title: 'Contact Form',
  description: 'Please fill out the form below to get in touch with us.',
  fields: [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Enter your first name',
      required: true,
      validation: [
        {
          type: 'required',
          message: 'First name is required',
        },
        {
          type: 'minLength',
          value: 2,
          message: 'First name must be at least 2 characters',
        },
      ],
    },
    {
      id: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      required: true,
      validation: [
        {
          type: 'required',
          message: 'Last name is required',
        },
      ],
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
      validation: [
        {
          type: 'required',
          message: 'Email is required',
        },
        {
          type: 'pattern',
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Please enter a valid email address',
        },
      ],
    },
    {
      id: 'phone',
      type: 'text',
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      validation: [
        {
          type: 'pattern',
          value: /^\+?[\d\s\-\(\)]+$/,
          message: 'Please enter a valid phone number',
        },
      ],
    },
    {
      id: 'age',
      type: 'number',
      label: 'Age',
      placeholder: 'Enter your age',
      validation: [
        {
          type: 'custom',
          message: 'Age must be between 18 and 120',
          validator: (value: number) => value >= 18 && value <= 120,
        },
      ],
    },
    {
      id: 'country',
      type: 'select',
      label: 'Country',
      required: true,
      defaultValue: 'us',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
      ],
      validation: [
        {
          type: 'required',
          message: 'Please select a country',
        },
      ],
    },
    {
      id: 'preferredContact',
      type: 'radio',
      label: 'Preferred Contact Method',
      required: true,
      defaultValue: 'email',
      options: [
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'sms', label: 'SMS' },
      ],
      validation: [
        {
          type: 'required',
          message: 'Please select a preferred contact method',
        },
      ],
    },
    {
      id: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Enter your message here...',
      required: true,
      validation: [
        {
          type: 'required',
          message: 'Message is required',
        },
        {
          type: 'minLength',
          value: 10,
          message: 'Message must be at least 10 characters',
        },
      ],
    },
    {
      id: 'newsletter',
      type: 'checkbox',
      label: 'Subscribe to newsletter',
      defaultValue: false,
    },
    {
      id: 'birthDate',
      type: 'date',
      label: 'Birth Date',
    },
  ],
  submitLabel: 'Submit Form',
  resetLabel: 'Clear Form',
};

export const App: React.FC = () => {
  const handleSubmit = async (values: FieldValue) => {
    console.log('Form submitted with values:', values);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Form submitted successfully! Check the console for values.');
  };

  const handleReset = () => {
    console.log('Form reset');
  };

  const handleChange = (values: FieldValue) => {
    console.log('Form values changed:', values);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <FormBuilder
        config={sampleFormConfig}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onChange={handleChange}
      />
    </div>
  );
};