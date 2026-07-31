import React from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import './CartDrawer.css';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  onClearCart,
  onCheckoutCart
}) {
  if (!isOpen) return null;

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;
    if (onCheckoutCart) {
      onCheckoutCart();
    }
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-panel-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Header - Crisp Black Title & Visible Exit Button */}
        <div className="cart-header-bar">
          <div className="cart-header-title-box">
            <div className="cart-icon-wrapper">
              <ShoppingCart size={20} color="#d95e68" />
            </div>
            <h3 className="cart-header-title">
              Shopping Cart <span className="cart-count-pill">({totalItemCount})</span>
            </h3>
          </div>
          <button onClick={onClose} className="cart-btn-close" title="Close Cart">
            <X size={20} />
          </button>
        </div>

        {/* Cart Content Items */}
        <div className="cart-body-scroll">
          {cart.length > 0 ? (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price-unit">₹{item.price} each</p>
                    
                    <div className="cart-quantity-controls">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                        title="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                        title="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <span className="cart-item-subtotal">₹{item.price * item.quantity}</span>
                    <button 
                      onClick={() => onRemoveFromCart(item.id)}
                      className="cart-remove-btn"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cart-empty-box">
              <div className="cart-empty-icon-bg">
                <ShoppingCart size={42} color="#d95e68" />
              </div>
              <h4 className="cart-empty-title">Your Cart is Currently Empty</h4>
              <p className="cart-empty-desc">
                Browse our handcrafted collections and add your favorite gifts to the cart!
              </p>
              <button onClick={onClose} className="btn-explore-cart">
                <span>Explore Products</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary - Total Amount & Checkout */}
        {cart.length > 0 && (
          <div className="cart-footer-summary">
            <div className="cart-summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-val">₹{totalAmount}</span>
            </div>
            
            <div className="cart-summary-row">
              <span className="summary-label">Campus Delivery / Pickup</span>
              <span className="summary-val free-badge">FREE</span>
            </div>

            <div className="cart-summary-total-row">
              <span className="total-label">Total Amount:</span>
              <span className="total-price">₹{totalAmount}</span>
            </div>

            <div className="cart-checkout-actions">
              <button onClick={handleCheckoutClick} className="btn-cart-checkout">
                <ShoppingBag size={18} />
                <span>Checkout Cart (₹{totalAmount})</span>
              </button>
              
              <button onClick={onClearCart} className="btn-clear-cart">
                Clear Cart
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
