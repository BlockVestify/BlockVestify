import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  icon: LucideIcon;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField = ({ 
  icon: Icon, 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  error 
}: InputFieldProps) => {
  return (
    <div className="input-group">
      <div className="input-wrapper">
        <Icon size={20} className="input-icon" />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? 'error' : ''}
        />
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;