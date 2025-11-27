import { useState } from 'react';

interface TransferFormProps {
  baseUrl: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
];

// Simulated exchange rates (relative to USD)
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.12,
  MXN: 17.15,
  BRL: 4.97,
  KRW: 1298.50,
  SGD: 1.34,
  NZD: 1.64,
  ZAR: 18.65,
};

export default function TransferForm({ baseUrl }: TransferFormProps) {
  // Ensure trailing slash for path concatenation
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  const [sendAmount, setSendAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateReceiveAmount = () => {
    const amount = parseFloat(sendAmount) || 0;
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const converted = (amount / fromRate) * toRate;
    return converted.toFixed(2);
  };

  const getExchangeRate = () => {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    return (toRate / fromRate).toFixed(4);
  };

  const getFee = () => {
    const amount = parseFloat(sendAmount) || 0;
    // 0.5% fee, minimum $1
    return Math.max(1, amount * 0.005).toFixed(2);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!sendAmount || parseFloat(sendAmount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!recipientName.trim()) {
      newErrors.recipientName = 'Recipient name is required';
    }
    
    if (!recipientEmail.trim()) {
      newErrors.recipientEmail = 'Recipient email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      newErrors.recipientEmail = 'Please enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="success-state">
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
        </div>
        <h2>Transfer Initiated!</h2>
        <p className="success-details">
          You're sending <strong>{currencies.find(c => c.code === fromCurrency)?.symbol}{sendAmount} {fromCurrency}</strong>
          <br />to <strong>{recipientName}</strong>
        </p>
        <p className="success-amount">
          They'll receive <strong>{currencies.find(c => c.code === toCurrency)?.symbol}{calculateReceiveAmount()} {toCurrency}</strong>
        </p>
        <div className="success-actions">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setShowSuccess(false);
              setSendAmount('1000');
              setRecipientEmail('');
              setRecipientName('');
            }}
          >
            Send Another Transfer
          </button>
          <a href={base} className="btn btn-secondary">
            Back to Home
          </a>
        </div>
        
        <style>{`
          .success-state {
            text-align: center;
            padding: 2rem 0;
          }
          
          .success-icon {
            width: 100px;
            height: 100px;
            margin: 0 auto 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(0, 212, 170, 0.15) 0%, rgba(0, 184, 148, 0.1) 100%);
            border-radius: 50%;
            color: #00d4aa;
          }
          
          .success-state h2 {
            font-size: 1.75rem;
            margin-bottom: 1rem;
          }
          
          .success-details {
            color: #a0a0b0;
            margin-bottom: 0.5rem;
          }
          
          .success-amount {
            font-size: 1.25rem;
            color: #00d4aa;
            margin-bottom: 2rem;
          }
          
          .success-actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="transfer-form">
      {/* Send Amount */}
      <div className="amount-section">
        <label className="section-label">You send</label>
        <div className="amount-input-group">
          <input
            type="number"
            className={`amount-input ${errors.amount ? 'input-error' : ''}`}
            value={sendAmount}
            onChange={(e) => {
              setSendAmount(e.target.value);
              if (errors.amount) setErrors(prev => ({ ...prev, amount: '' }));
            }}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
          <select
            className="currency-select"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code}
              </option>
            ))}
          </select>
        </div>
        {errors.amount && <span className="error-text">{errors.amount}</span>}
      </div>

      {/* Exchange Rate Info */}
      <div className="exchange-info">
        <div className="exchange-row">
          <span className="exchange-label">Exchange rate</span>
          <span className="exchange-value">1 {fromCurrency} = {getExchangeRate()} {toCurrency}</span>
        </div>
        <div className="exchange-row">
          <span className="exchange-label">Transfer fee</span>
          <span className="exchange-value fee">{currencies.find(c => c.code === fromCurrency)?.symbol}{getFee()} {fromCurrency}</span>
        </div>
        
        <button type="button" className="swap-button" onClick={swapCurrencies}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17,1 21,5 17,9"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <polyline points="7,23 3,19 7,15"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
        </button>
      </div>

      {/* Receive Amount */}
      <div className="amount-section">
        <label className="section-label">Recipient gets</label>
        <div className="amount-input-group">
          <input
            type="text"
            className="amount-input receive"
            value={calculateReceiveAmount()}
            readOnly
          />
          <select
            className="currency-select"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Recipient Info */}
      <div className="recipient-section">
        <h3 className="section-title">Recipient Details</h3>
        
        <div className="form-group">
          <label className="form-label">Full name</label>
          <input
            type="text"
            className={`form-input ${errors.recipientName ? 'input-error' : ''}`}
            placeholder="Enter recipient's full name"
            value={recipientName}
            onChange={(e) => {
              setRecipientName(e.target.value);
              if (errors.recipientName) setErrors(prev => ({ ...prev, recipientName: '' }));
            }}
          />
          {errors.recipientName && <span className="error-text">{errors.recipientName}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className={`form-input ${errors.recipientEmail ? 'input-error' : ''}`}
            placeholder="recipient@example.com"
            value={recipientEmail}
            onChange={(e) => {
              setRecipientEmail(e.target.value);
              if (errors.recipientEmail) setErrors(prev => ({ ...prev, recipientEmail: '' }));
            }}
          />
          {errors.recipientEmail && <span className="error-text">{errors.recipientEmail}</span>}
        </div>
      </div>

      {/* Summary */}
      <div className="summary-section">
        <div className="summary-row">
          <span>Total to pay</span>
          <span className="summary-value">
            {currencies.find(c => c.code === fromCurrency)?.symbol}
            {(parseFloat(sendAmount || '0') + parseFloat(getFee())).toFixed(2)} {fromCurrency}
          </span>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Processing transfer...
          </>
        ) : (
          <>
            Send {currencies.find(c => c.code === fromCurrency)?.symbol}{sendAmount} {fromCurrency}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"/>
              <polygon points="22,2 15,22 11,13 2,9"/>
            </svg>
          </>
        )}
      </button>
      
      <style>{`
        .transfer-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .section-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #a0a0b0;
          margin-bottom: 0.5rem;
        }
        
        .amount-section {
          position: relative;
        }
        
        .amount-input-group {
          display: flex;
          background: #1a1a24;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          overflow: hidden;
          transition: all 200ms ease;
        }
        
        .amount-input-group:focus-within {
          border-color: #00d4aa;
          box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.15);
        }
        
        .amount-input {
          flex: 1;
          padding: 1rem 1.25rem;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 600;
          min-width: 0;
        }
        
        .amount-input:focus {
          outline: none;
        }
        
        .amount-input::placeholder {
          color: #6c6c7c;
        }
        
        .amount-input.receive {
          color: #00d4aa;
        }
        
        .currency-select {
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
        }
        
        .currency-select:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
        }
        
        .currency-select option {
          background: #1a1a24;
          color: #ffffff;
        }
        
        .exchange-info {
          position: relative;
          background: rgba(0, 212, 170, 0.05);
          border: 1px solid rgba(0, 212, 170, 0.15);
          border-radius: 12px;
          padding: 1rem 1.25rem;
        }
        
        .exchange-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.25rem 0;
        }
        
        .exchange-label {
          font-size: 0.875rem;
          color: #a0a0b0;
        }
        
        .exchange-value {
          font-size: 0.875rem;
          font-weight: 500;
          color: #ffffff;
        }
        
        .exchange-value.fee {
          color: #00d4aa;
        }
        
        .swap-button {
          position: absolute;
          right: -16px;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00d4aa 0%, #00b894 100%);
          border: none;
          border-radius: 50%;
          color: #0a0a0f;
          cursor: pointer;
          transition: all 200ms ease;
          box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
        }
        
        .swap-button:hover {
          transform: translateY(-50%) scale(1.1);
        }
        
        .recipient-section {
          padding-top: 0.5rem;
        }
        
        .section-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #ffffff;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #a0a0b0;
          margin-bottom: 0.5rem;
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
        
        .input-error {
          border-color: #ff6b6b !important;
        }
        
        .error-text {
          display: block;
          font-size: 0.75rem;
          color: #ff6b6b;
          margin-top: 0.5rem;
        }
        
        .summary-section {
          background: #1a1a24;
          border-radius: 12px;
          padding: 1rem 1.25rem;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .summary-row span:first-child {
          color: #a0a0b0;
        }
        
        .summary-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
        }
        
        .btn-submit {
          width: 100%;
          padding: 1.125rem 2rem;
          font-size: 1.1rem;
          gap: 0.75rem;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(10, 10, 15, 0.3);
          border-top-color: #0a0a0f;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Hide number input arrows */
        .amount-input::-webkit-outer-spin-button,
        .amount-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        .amount-input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </form>
  );
}
