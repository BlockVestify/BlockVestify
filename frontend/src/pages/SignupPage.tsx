import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../firebase/services';
import { useUser } from '../contexts/UserContext';
import '../styles/auth.css';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Reset form when switching between login and signup
  useEffect(() => {
    setFormData({
      email: '',
      password: '',
      username: '',
      phoneNumber: ''
    });
    setError('');
  }, [isLogin]);

  const validateForm = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all required fields');
      return false;
    }
    
    if (!isLogin && (!formData.username.trim() || !formData.phoneNumber.trim())) {
      setError('Please fill in all required fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (!isLogin && formData.phoneNumber.trim().length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        console.log('Attempting to sign in with:', formData.email);
        const userData = await signIn(formData.email, formData.password);
        console.log('Sign in successful:', userData);
        navigate('/dashboard');
      } else {
        console.log('Attempting to sign up with:', formData.email);
        const userData = await signUp(
          formData.email.trim(),
          formData.password,
          formData.username.trim(),
          formData.phoneNumber.trim()
        );
        console.log('Sign up successful:', userData);
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please try logging in instead.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address format.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No account found with this email. Please sign up instead.');
      } else {
        setError(error.message || 'An error occurred during authentication');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
        <p className="auth-subtitle">
          {isLogin 
            ? 'Please enter your details to sign in' 
            : 'Please fill in all the required information below'}
        </p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
              className="input-field"
            />
          </div>
          
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                  disabled={loading}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  disabled={loading}
                  className="input-field"
                />
              </div>
            </>
          )}
          
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              required
              disabled={loading}
              minLength={6}
              className="input-field"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <span className="loading-text">
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              <span>
                {isLogin ? 'Sign In' : 'Create Account'}
              </span>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              className="toggle-auth-button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              disabled={loading}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;