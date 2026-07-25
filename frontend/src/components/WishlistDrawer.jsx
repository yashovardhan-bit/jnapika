import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import './WishlistDrawer.css';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemoveFromWishlist, onOrderNow }) {
  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop">
      <div className="drawer-panel-box">
        
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={20} fill="#f43f5e" color="#f43f5e" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700 }}>
              Saved Wishlist ({wishlist.length})
            </h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="drawer-body-scroll">
          {wishlist.length > 0 ? (
            wishlist.map((product) => (
              <div key={product.id} className="wishlist-item-card">
                <img src={product.image} alt={product.name} style={{ width: '4rem', height: '4rem', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', fontWeight: 700 }}>{product.name}</h4>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--pink-600)' }}>₹{product.price}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <button
                    onClick={() => {
                      onClose();
                      onOrderNow(product);
                    }}
                    style={{ padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-md)', background: 'var(--purple-600)', color: '#fff', fontSize: '0.7rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                  >
                    <ShoppingBag size={12} /> Order
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    style={{ padding: '0.3rem', color: 'var(--neutral-400)', textAlign: 'center' }}
                    title="Remove"
                  >
                    <Trash2 size={14} style={{ margin: 'auto' }} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '2rem 1rem' }}>
              <Heart size={48} color="#f472b6" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>Your Wishlist is Empty</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--neutral-500)' }}>Tap the heart icon on any handcrafted gift to save it for later!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
