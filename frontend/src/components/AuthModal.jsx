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
    <div className="modal-overlay">
      <div className="auth-dialog-box">
        
        {/* Header */}
        <div className="modal-header-gradient">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} color="#fbcfe8" />
            <h3 className="modal-header-title">
              {mode === 'profile' && 'My Account'}
              {mode === 'login' && 'Student Sign In'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body-scroll">
          
          {message && (
            <div style={{ marginBottom: '1rem', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'var(--emerald-50)', color: 'var(--emerald-700)', fontSize: '0.8rem', fontWeight: 600, border: '1px solid var(--emerald-200)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} />
              <span>{message}</span>
            </div>
          )}

          {mode === 'profile' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-lg)', background: 'var(--pink-50)', border: '1px solid var(--pink-200)' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700 }}>{user.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>📧 {user.email}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--neutral-600)' }}>📱 {user.phone}</p>
              </div>

              <div>
                <h5 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--purple-700)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Package size={14} /> Previous Orders ({orderHistory.length})
                </h5>
                {orderHistory.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '10rem', overflowY: 'auto' }}>
                    {orderHistory.map((ord, i) => (
                      <div key={i} style={{ padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--purple-100)', background: '#fff', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <div>
                          <p style={{ fontWeight: 700 }}>{ord.product.name}</p>
                          <p style={{ fontSize: '0.65rem', color: 'var(--neutral-500)' }}>{ord.date} • Qty: {ord.formData.quantity}</p>
                        </div>
                        <span style={{ fontWeight: 800, color: 'var(--pink-600)' }}>₹{ord.totalPrice}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--neutral-400)', fontStyle: 'italic' }}>No previous orders yet.</p>
                )}
              </div>

              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--purple-50)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>Wishlist items: {wishlist.length}</span>
                <button onClick={onLogout} style={{ padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', background: 'var(--purple-100)', color: 'var(--purple-700)', fontWeight: 600, fontSize: '0.75rem' }}>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {mode === 'register' && (
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="form-input-text"
                  />
                </div>
              )}

              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="student@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="form-input-text"
                />
              </div>

              {mode === 'register' && (
                <div>
                  <label className="form-label">WhatsApp Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="form-input-text"
                  />
                </div>
              )}

              {mode !== 'forgot' && (
                <div>
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="form-input-text"
                  />
                </div>
              )}

              {mode === 'register' && (
                <div>
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="form-input-text"
                  />
                </div>
              )}

              <button type="submit" className="btn-submit-order">
                {mode === 'login' && 'Sign In'}
                {mode === 'register' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Link'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--neutral-600)' }}>
                {mode === 'login' && (
                  <p>Don't have an account? <button type="button" onClick={() => setMode('register')} style={{ color: 'var(--pink-600)', fontWeight: 700 }}>Register</button></p>
                )}
                {mode === 'register' && (
                  <p>Already registered? <button type="button" onClick={() => setMode('login')} style={{ color: 'var(--pink-600)', fontWeight: 700 }}>Sign In</button></p>
                )}
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
