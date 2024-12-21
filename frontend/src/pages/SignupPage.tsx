import React from 'react';
import SignupForm from '../components/auth/SignupForm';

const SignupPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;