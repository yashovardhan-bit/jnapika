import React, { useState } from 'react';
import { X, User, CheckCircle2, Package } from 'lucide-react';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose, user, onLoginSuccess, onLogout, orderHistory, wishlist }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState(user ? 'profile' : 'login');
  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        setMessage('Please enter your email and password');
        return;
      }
      onLoginSuccess({
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        phone: formData.phone || '+91 9876543210'
      });
      setMessage('Successfully logged in!');
      setTimeout(() => {
        setMessage('');
        onClose();
      }, 1000);
    } else if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }
      onLoginSuccess({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      setMessage('Account registered successfully!');
      setTimeout(() => {
        setMessage('');
        onClose();
      }, 1000);
    } else if (mode === 'forgot') {
      setMessage('Password reset link sent to your email!');
      setTimeout(() => setMode('login'), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-dialog-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="auth-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="auth-header-icon-bg">
              <User size={18} color="#d95e68" />
            </div>
            <h3 className="auth-modal-title">
              {mode === 'profile' && 'My Student Profile'}
              {mode === 'login' && 'Student Sign In'}
              {mode === 'register' && 'Create Student Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h3>
          </div>
          <button onClick={onClose} className="auth-btn-close" title="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="auth-modal-body">
          
          {message && (
            <div className="auth-alert-success">
              <CheckCircle2 size={16} />
              <span>{message}</span>
            </div>
          )}

          {mode === 'profile' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="auth-profile-card">
                <h4 className="auth-profile-name">{user?.name}</h4>
                <p className="auth-profile-detail">📧 {user?.email}</p>
                <p className="auth-profile-detail">📱 {user?.phone}</p>
              </div>

              <div>
                <h5 className="auth-section-title">
                  <Package size={15} color="#d95e68" /> Previous Orders ({orderHistory?.length || 0})
                </h5>
                {orderHistory && orderHistory.length > 0 ? (
                  <div className="auth-orders-list">
                    {orderHistory.map((ord, i) => (
                      <div key={i} className="auth-order-item">
                        <div>
                          <p className="auth-order-prod">{ord.product.name}</p>
                          <p className="auth-order-sub">{ord.date} • Qty: {ord.formData.quantity}</p>
                        </div>
                        <span className="auth-order-price">₹{ord.totalPrice}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="auth-no-orders">No previous orders yet.</p>
                )}
              </div>

              <div className="auth-profile-footer">
                <span className="auth-wishlist-count">Wishlist items: {wishlist?.length || 0}</span>
                <button onClick={onLogout} className="auth-btn-logout">
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {mode === 'register' && (
                <div>
                  <label className="auth-form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="auth-form-input"
                  />
                </div>
              )}

              <div>
                <label className="auth-form-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="student@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="auth-form-input"
                />
              </div>

              {mode === 'register' && (
                <div>
                  <label className="auth-form-label">WhatsApp Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="auth-form-input"
                  />
                </div>
              )}

              {mode !== 'forgot' && (
                <div>
                  <label className="auth-form-label">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="auth-form-input"
                  />
                </div>
              )}

              {mode === 'register' && (
                <div>
                  <label className="auth-form-label">Confirm Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="auth-form-input"
                  />
                </div>
              )}

              <button type="submit" className="auth-btn-submit">
                {mode === 'login' && 'Sign In'}
                {mode === 'register' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Link'}
              </button>

              <div className="auth-toggle-mode">
                {mode === 'login' && (
                  <p>Don't have an account? <button type="button" onClick={() => setMode('register')} className="auth-link-highlight">Register</button></p>
                )}
                {mode === 'register' && (
                  <p>Already registered? <button type="button" onClick={() => setMode('login')} className="auth-link-highlight">Sign In</button></p>
                )}
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
