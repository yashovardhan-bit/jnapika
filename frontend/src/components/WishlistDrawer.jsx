import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import './WishlistDrawer.css';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemoveFromWishlist, onOrderNow, onAddToCart }) {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="wishlist-icon-bg">
              <Heart size={18} fill="#d95e68" color="#d95e68" />
            </div>
            <h3 className="drawer-title">
              Saved Wishlist ({wishlist.length})
            </h3>
          </div>
          <button onClick={onClose} className="btn-close-modal" title="Close Wishlist">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-body-scroll">
          {wishlist.length > 0 ? (
            wishlist.map((product) => (
              <div key={product.id} className="wishlist-item-card">
                <img src={product.image} alt={product.name} className="wishlist-img" />
                
                <div style={{ flex: 1 }}>
                  <h4 className="wishlist-name">{product.name}</h4>
                  <span className="wishlist-price">₹{product.price}</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <button
                    onClick={() => {
                      onClose();
                      onOrderNow(product);
                    }}
                    className="btn-wishlist-order"
                  >
                    <ShoppingBag size={12} /> Order Now
                  </button>
                  
                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="btn-wishlist-remove"
                    title="Remove item"
                  >
                    <Trash2 size={14} style={{ margin: 'auto' }} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="wishlist-empty-box">
              <div className="wishlist-empty-icon-bg">
                <Heart size={38} color="#d95e68" />
              </div>
              <h4 className="wishlist-empty-title">Your Wishlist is Empty</h4>
              <p className="wishlist-empty-desc">
                Tap the heart icon on any handcrafted gift to save it for later!
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
