import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../services/auth';
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

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn({
          email: formData.email,
          password: formData.password
        });
      } else {
        await signUp({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          phoneNumber: formData.phoneNumber
        });
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="auth-subtitle">
          {isLogin 
            ? 'Sign in to manage your investment portfolio' 
            : 'Join us to start your investment journey'}
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Choose a username"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading 
              ? 'Please wait...' 
              : isLogin 
                ? 'Sign In' 
                : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="switch-button"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;