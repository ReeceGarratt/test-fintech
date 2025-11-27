import { useState } from 'react';

interface LoginFormProps {
  baseUrl: string;
}

export default function LoginForm({ baseUrl }: LoginFormProps) {
  // Ensure trailing slash for path concatenation
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
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
        <h2>Login successful!</h2>
        <p>Redirecting to your dashboard...</p>
        <a href={`${base}transfer/`} className="btn btn-primary">
          Go to Transfer
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
          autoComplete="email"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>
      
      <div className="form-group">
        <div className="form-label-row">
          <label htmlFor="password" className="form-label">Password</label>
          <a href="#" className="form-link">Forgot password?</a>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          className={`form-input ${errors.password ? 'form-input--error' : ''}`}
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        {errors.password && <span className="form-error">{errors.password}</span>}
      </div>
      
      <div className="form-checkbox">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
        />
        <label htmlFor="rememberMe">Remember me for 30 days</label>
      </div>
      
      <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Logging in...
          </>
        ) : (
          'Log in'
        )}
      </button>
      
      <div className="divider">
        <span>or continue with</span>
      </div>
      
      <div className="social-buttons">
        <button type="button" className="btn btn-social">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button type="button" className="btn btn-social">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          GitHub
        </button>
      </div>
      
      <style>{`
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #a0a0b0;
        }
        
        .form-link {
          font-size: 0.875rem;
          color: #00d4aa;
          font-weight: 500;
        }
        
        .form-link:hover {
          text-decoration: underline;
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
        
        .btn-full {
          width: 100%;
        }
        
        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #6c6c7c;
          font-size: 0.875rem;
        }
        
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }
        
        .social-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        
        .btn-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: #1a1a24;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 200ms ease;
        }
        
        .btn-social:hover {
          background: #222230;
          border-color: rgba(255, 255, 255, 0.15);
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
      `}</style>
    </form>
  );
}
