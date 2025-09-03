# Form Builder

A complete TypeScript React dynamic form builder application with form rendering, field components, validation, and styling capabilities.

![Form Builder Demo](https://github.com/user-attachments/assets/ae52040d-6f4b-4984-992f-729f667e7346)

## Features

- 🚀 **Dynamic Form Creation**: Build forms using JSON configuration
- 📝 **Rich Field Types**: Support for text, email, password, number, textarea, select, checkbox, radio, date, and file inputs
- ✅ **Advanced Validation**: Built-in validation rules with custom validators
- 🎨 **Modern Styling**: Clean, responsive CSS with customizable themes
- 📱 **Responsive Design**: Mobile-friendly layout
- 🔧 **TypeScript Support**: Full type safety and IntelliSense
- ⚡ **Lightweight**: Minimal dependencies, optimized bundle size
- 🎯 **Easy Integration**: Simple API for React applications

## Installation

```bash
npm install form-builder
```

## Quick Start

```tsx
import React from 'react';
import { FormBuilder, FormConfig } from 'form-builder';

const formConfig: FormConfig = {
  id: 'contact-form',
  title: 'Contact Us',
  description: 'Please fill out the form below.',
  fields: [
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
      validation: [
        { type: 'required', message: 'Name is required' },
        { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' }
      ]
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      validation: [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
      ]
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
        { value: 'ca', label: 'Canada' }
      ]
    }
  ],
  submitLabel: 'Submit',
  resetLabel: 'Reset'
};

function App() {
  const handleSubmit = async (values) => {
    console.log('Form submitted:', values);
    // Handle form submission
  };

  const handleReset = () => {
    console.log('Form reset');
  };

  return (
    <FormBuilder
      config={formConfig}
      onSubmit={handleSubmit}
      onReset={handleReset}
    />
  );
}
```

## Field Types

### Text Fields
- `text` - Standard text input
- `email` - Email input with validation
- `password` - Password input
- `number` - Number input
- `textarea` - Multi-line text area
- `date` - Date picker
- `file` - File upload

### Selection Fields
- `select` - Dropdown selection
- `radio` - Radio button group
- `checkbox` - Single checkbox

## Validation Rules

### Built-in Validators

```tsx
{
  id: 'field',
  type: 'text',
  validation: [
    { type: 'required', message: 'This field is required' },
    { type: 'minLength', value: 3, message: 'Minimum 3 characters' },
    { type: 'maxLength', value: 50, message: 'Maximum 50 characters' },
    { type: 'pattern', value: /^[A-Za-z]+$/, message: 'Only letters allowed' }
  ]
}
```

### Custom Validators

```tsx
{
  id: 'age',
  type: 'number',
  validation: [
    {
      type: 'custom',
      message: 'Age must be between 18 and 65',
      validator: (value) => value >= 18 && value <= 65
    }
  ]
}
```

## API Reference

### FormBuilder Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `FormConfig` | Yes | Form configuration object |
| `onSubmit` | `(values: FieldValue) => void \| Promise<void>` | Yes | Submit handler |
| `onReset` | `() => void` | No | Reset handler |
| `onChange` | `(values: FieldValue) => void` | No | Change handler |
| `className` | `string` | No | Additional CSS class |
| `style` | `React.CSSProperties` | No | Inline styles |

### FormConfig Interface

```tsx
interface FormConfig {
  id: string;
  title?: string;
  description?: string;
  fields: FieldConfig[];
  submitLabel?: string;
  resetLabel?: string;
}
```

### FieldConfig Interface

```tsx
interface FieldConfig {
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
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/devansh-code-1/form-builder.git
cd form-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build library
npm run build:lib

# Type check
npm run lint
```

### Project Structure

```
src/
├── components/          # React components
│   ├── FormBuilder.tsx  # Main form builder component
│   └── FieldRenderer.tsx # Individual field renderer
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── validation.ts   # Validation logic
├── styles/             # CSS styles
│   └── FormBuilder.css
├── App.tsx             # Demo application
├── main.tsx            # Entry point
└── index.ts            # Library exports
```

## Styling

The form builder comes with default CSS that can be customized:

```css
/* Override default styles */
.form-builder {
  max-width: 800px;
  margin: 0 auto;
}

.form-field__input {
  border: 2px solid #e2e8f0;
  border-radius: 8px;
}

.form-builder__button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0
- Initial release
- Complete TypeScript React form builder
- Support for all major field types
- Advanced validation system
- Responsive design
- Comprehensive documentation