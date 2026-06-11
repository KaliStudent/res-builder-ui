'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export default function FormInput({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder,
  required = false,
  rows,
}: FormInputProps) {
  const inputClasses = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-black placeholder-gray-400 ${
    error ? 'border-red-500' : 'border-gray-300'
  }`;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-black mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {rows ? (
        <textarea
          {...register(name)}
          rows={rows}
          placeholder={placeholder}
          className={inputClasses}
        />
      ) : (
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
