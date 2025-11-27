import { useState } from 'react';

interface NavProps {
  currentPath?: string;
  baseUrl: string;
}

export default function Navigation({ currentPath = '/', baseUrl }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Ensure baseUrl has trailing slash for path concatenation
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  const navLinks = [
    { href: base, label: 'Home' },
    { href: `${base}transfer/`, label: 'Transfer' },
  ];
  
  const isActive = (href: string) => {
    if (href === base && (currentPath === base || currentPath === `${base}index.html` || currentPath === baseUrl)) {
      return true;
    }
    return currentPath.startsWith(href) && href !== base;
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <a href={base} className="nav-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" stroke="url(#gradient)" strokeWidth="2.5" fill="none" />
            <path d="M10 16L14 20L22 12" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#00d4aa" />
                <stop offset="100%" stopColor="#0984e3" />
              </linearGradient>
            </defs>
          </svg>
          <span>SwiftPay</span>
        </a>
        
        <div className={`nav-links ${isMenuOpen ? 'nav-links--open' : ''}`}>
          {navLinks.map(link => (
            <a 
              key={link.href}
              href={link.href} 
              className={`nav-link ${isActive(link.href) ? 'nav-link--active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <div className="nav-actions">
          <a href={`${base}login/`} className="btn btn-ghost">Log In</a>
          <a href={`${base}signup/`} className="btn btn-primary">Sign Up</a>
        </div>
        
        <button 
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`nav-toggle-line ${isMenuOpen ? 'nav-toggle-line--open' : ''}`}></span>
        </button>
      </div>
      
      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
        }
        
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .nav-link {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #a0a0b0;
          border-radius: 8px;
          transition: all 200ms ease;
        }
        
        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }
        
        .nav-link--active {
          color: #00d4aa;
          background: rgba(0, 212, 170, 0.1);
        }
        
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .nav-toggle {
          display: none;
          width: 32px;
          height: 32px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        .nav-toggle-line {
          position: relative;
          width: 20px;
          height: 2px;
          background: #ffffff;
          border-radius: 2px;
          transition: all 200ms ease;
        }
        
        .nav-toggle-line::before,
        .nav-toggle-line::after {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: #ffffff;
          border-radius: 2px;
          transition: all 200ms ease;
        }
        
        .nav-toggle-line::before {
          top: -6px;
        }
        
        .nav-toggle-line::after {
          bottom: -6px;
        }
        
        .nav-toggle-line--open {
          background: transparent;
        }
        
        .nav-toggle-line--open::before {
          top: 0;
          transform: rotate(45deg);
        }
        
        .nav-toggle-line--open::after {
          bottom: 0;
          transform: rotate(-45deg);
        }
        
        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            padding: 1rem;
            background: rgba(10, 10, 15, 0.98);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 300ms ease;
          }
          
          .nav-links--open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          
          .nav-actions {
            display: none;
          }
          
          .nav-toggle {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}
