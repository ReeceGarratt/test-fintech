import { useState } from 'react';

interface SignUpFormProps {
  baseUrl: string;
}

export default function SignUpForm({ baseUrl }: SignUpFormProps) {
  // Ensure trailing slash for path concatenation
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (showSuccess) {
    return (
      <div className="success-message">
        <div className="success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
        </div>
        <h2>Welcome to SwiftPay!</h2>
        <p>Your account has been created successfully.</p>
        <a href={`${base}login/`} className="btn btn-primary">
          Log in to your account
        </a>
        
        <style>{`
          .success-message {
            text-align: center;
            padding: 2rem 0;
          }
          
          .success-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(0, 212, 170, 0.15) 0%, rgba(0, 184, 148, 0.1) 100%);
            border-radius: 50%;
            color: #00d4aa;
          }
          
          .success-message h2 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }
          
          .success-message p {
            color: #a0a0b0;
            margin-bottom: 2rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">First name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`form-input ${errors.firstName ? 'form-input--error' : ''}`}
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="form-error">{errors.firstName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`form-input ${errors.lastName ? 'form-input--error' : ''}`}
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="form-error">{errors.lastName}</span>}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className={`form-input ${errors.password ? 'form-input--error' : ''}`}
          placeholder="At least 8 characters"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="form-error">{errors.password}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className={`form-input ${errors.confirmPassword ? 'form-input--error' : ''}`}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
      </div>
      
      <div className="form-checkbox">
        <input
          type="checkbox"
          id="agreeToTerms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
        />
        <label htmlFor="agreeToTerms">
          I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </label>
        {errors.agreeToTerms && <span className="form-error">{errors.agreeToTerms}</span>}
      </div>
      
      <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Creating account...
          </>
        ) : (
          'Create account'
        )}
      </button>
      
      <style>{`
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #a0a0b0;
        }
        
        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: #1a1a24;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: #ffffff;
          font-size: 1rem;
          transition: all 200ms ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #00d4aa;
          box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.15);
        }
        
        .form-input::placeholder {
          color: #6c6c7c;
        }
        
        .form-input--error {
          border-color: #ff6b6b;
        }
        
        .form-error {
          font-size: 0.75rem;
          color: #ff6b6b;
        }
        
        .form-checkbox {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: #a0a0b0;
        }
        
        .form-checkbox input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #00d4aa;
        }
        
        .form-checkbox a {
          color: #00d4aa;
        }
        
        .form-checkbox a:hover {
          text-decoration: underline;
        }
        
        .btn-full {
          width: 100%;
          margin-top: 0.5rem;
        }
        
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(10, 10, 15, 0.3);
          border-top-color: #0a0a0f;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 480px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </form>
  );
}
