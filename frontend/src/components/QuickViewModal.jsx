import React from 'react';
import { X, Star, Heart, ShoppingBag, Check } from 'lucide-react';
import './QuickViewModal.css';

export default function QuickViewModal({ product, isOpen, onClose, onOrderNow, isWishlisted, onToggleWishlist }) {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay">
      <div className="quickview-dialog-box">
        
        {/* Close Button */}
        <button onClick={onClose} className="btn-close-modal" style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 30, background: 'rgba(30,27,75,0.6)', padding: '0.4rem' }}>
          <X size={18} />
        </button>

        {/* Product Image */}
        <div className="quickview-img-col">
          <img src={product.image} alt={product.name} className="quickview-img" />
          {product.offerBadge && (
            <span className="badge-offer" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
              {product.offerBadge}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="quickview-info-col">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="meta-row">
              <span className="cat-pill">{product.category}</span>
              <div className="rating-box">
                <Star size={13} fill="#fb923c" color="#fb923c" />
                <span>{product.rating}</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--neutral-900)' }}>
              {product.name}
            </h3>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neutral-900)' }}>₹{product.price}</span>
              {product.originalPrice && (
                <span style={{ fontSize: '0.85rem', color: 'var(--neutral-400)', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
              )}
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)', lineHeight: 1.5 }}>
              {product.description}
            </p>

            <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--purple-50)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div>
                <strong>Material: </strong>
                <span>{product.material}</span>
              </div>

              {product.features && (
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Highlights:</strong>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {product.features.map((feat, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--neutral-700)' }}>
                        <Check size={12} color="#059669" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--purple-50)' }}>
            <button
              onClick={() => {
                onClose();
                onOrderNow(product);
              }}
              className="btn-order-card"
              style={{ flex: 1, padding: '0.75rem', justifyContent: 'center' }}
            >
              <ShoppingBag size={16} />
              <span>Order Now</span>
            </button>

            <button
              onClick={() => onToggleWishlist(product)}
              className={`btn-wishlist-card ${isWishlisted ? 'active' : ''}`}
              style={{ position: 'static' }}
            >
              <Heart size={18} fill={isWishlisted ? '#ffffff' : 'none'} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
