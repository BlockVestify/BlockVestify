import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { validateEmail, validatePassword } from '../../utils/validation';
import InputField from './InputField';
import '../../styles/auth.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name.length < 2 ? 'Name is required' : '',
      email: !validateEmail(formData.email) ? 'Invalid email address' : '',
      password: !validatePassword(formData.password) ? 'Password must be at least 8 characters' : '',
      confirmPassword: formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      // Handle successful signup
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      
      <InputField
        icon={User}
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      <InputField
        icon={Mail}
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <InputField
        icon={Lock}
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <InputField
        icon={Lock}
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <button type="submit" className="auth-button">Sign Up</button>
      
      <p className="auth-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default SignupForm;