import React from 'react';
import { ShoppingCart, Heart, Package, CheckCircle2, Info } from 'lucide-react';
import './Toast.css';

export default function Toast({ toast }) {
  if (!toast || !toast.text) return null;

  const renderIcon = () => {
    switch (toast.type) {
      case 'wishlist':
        return <Heart size={18} className="toast-type-icon toast-heart" fill="#e11d48" color="#e11d48" />;
      case 'cart':
        return <ShoppingCart size={18} className="toast-type-icon toast-cart" color="#d95e68" />;
      case 'order':
        return <Package size={18} className="toast-type-icon toast-package" color="#8b5cf6" />;
      default:
        return <Info size={18} className="toast-type-icon toast-info" color="#3b82f6" />;
    }
  };

  return (
    <div className="toast-container-bottom">
      <div className="toast-white-card">
        <div className="toast-left-icon">
          {renderIcon()}
        </div>
        <span className="toast-text-black">{toast.text}</span>
        <div className="toast-right-green-tick">
          <CheckCircle2 size={18} color="#10B981" />
        </div>
      </div>
    </div>
  );
}
