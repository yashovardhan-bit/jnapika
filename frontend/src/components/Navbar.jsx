import React, { useState } from 'react';
import { Search, Heart, User, ShoppingBag, ChevronDown, Gift, Truck } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
  onOpenAuth,
  onOpenCustomOrder
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="navbar-header">
      {/* Top Banner Ticker */}
      <div className="top-ticker">
        <div className="top-ticker-container">
          <div className="top-ticker-left">
            <Truck size={14} />
            <span>Free Shipping on Orders above ₹999 | COD Available</span>
          </div>
          <div className="top-ticker-right">
            <a href="#track">Track Order</a>
            <span>|</span>
            <a href="#support">Help & Support</a>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav className="glass-nav-main">
        <div className="nav-container">
          
          {/* Logo */}
          <div className="nav-logo-box" onClick={() => setSelectedCategory('all')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="logo-script-title">Jnapika</span>
              <Gift size={22} color="#d95e68" />
            </div>
            <p className="logo-tagline">Gifts that speak from the heart</p>
          </div>

          {/* Center Navigation Links */}
          <div className="nav-center-links">
            <a 
              href="#home" 
              className={`nav-link-item ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              Home
            </a>
            <a 
              href="#products-catalog" 
              className="nav-link-item"
              onClick={() => setSelectedCategory('all')}
            >
              Shop
            </a>
            
            <div 
              style={{ position: 'relative' }} 
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="nav-link-item" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <span>Occasions</span>
                <ChevronDown size={14} />
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '12rem',
                  background: '#ffffff',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  padding: '0.5rem 0',
                  zIndex: 1100,
                  border: '1px solid #fce8e6'
                }}>
                  {['birthday', 'wedding', 'anniversary', 'babyshower', 'housewarming', 'festivals', 'corporate'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.5rem 1rem',
                        fontSize: '0.8125rem',
                        color: selectedCategory === cat ? 'var(--coral-pink)' : 'var(--neutral-dark)',
                        fontWeight: selectedCategory === cat ? 600 : 400
                      }}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)} Gifts
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={onOpenCustomOrder} className="nav-link-item">
              Personalized Gifts
            </button>

            <a href="#about" className="nav-link-item">About Us</a>
            <a href="#blog" className="nav-link-item">Blog</a>
            <a href="#contact" className="nav-link-item">Contact</a>
          </div>

          {/* Right Action Icons */}
          <div className="nav-right-actions">
            
            <button 
              onClick={() => {
                const el = document.getElementById('products-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="nav-icon-btn"
              title="Search"
            >
              <Search size={18} />
              <span>Search</span>
            </button>

            <button onClick={onOpenWishlist} className="nav-icon-btn" title="Wishlist">
              <Heart size={19} />
              {wishlistCount > 0 && <span className="cart-count-badge">{wishlistCount}</span>}
            </button>

            <button onClick={onOpenAuth} className="nav-icon-btn" title="Account">
              <User size={19} />
            </button>

            <button onClick={onOpenCart} className="nav-icon-btn" title="Cart">
              <ShoppingBag size={19} />
              <span className="cart-count-badge">{cartCount}</span>
            </button>

          </div>

        </div>
      </nav>
    </header>
  );
}
