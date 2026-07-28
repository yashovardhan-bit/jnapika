import React, { useState } from 'react';
import { Search, Heart, User, ShoppingCart, ChevronDown, Gift } from 'lucide-react';
import { OCCASIONS } from '../data/mockData';
import './Navbar.css';

export default function Navbar({ 
  selectedCategory, 
  setSelectedCategory,
  wishlistCount,
  cartCount,
  onOpenWishlist,
  onOpenCart,
  onOpenAuth,
  onOpenCustomOrder,
  user
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOccasionClick = (catId) => {
    setSelectedCategory(catId);
    setDropdownOpen(false);
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductsClick = (e) => {
    e.preventDefault();
    setSelectedCategory('all');
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-header">
      
      {/* Main Glass Navbar */}
      <nav className="glass-nav-main">
        <div className="nav-container">
          
          {/* Logo */}
          <div className="nav-logo-box" onClick={() => setSelectedCategory('all')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="logo-script-title">Jnapika</span>
              <Gift size={22} color="#d95e68" />
            </div>
            <p className="logo-tagline">Turning love and memories <br/>into beautiful, handmade keepsakes</p>
          </div>

          {/* Center Navigation Links - Removed Shop & Blog, Added Products */}
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
              className={`nav-link-item ${selectedCategory !== 'all' ? 'active' : ''}`}
              onClick={handleProductsClick}
            >
              Products
            </a>
            
            <div 
              style={{ position: 'relative' }} 
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                className={`nav-link-item ${selectedCategory !== 'all' ? 'active-occasion' : ''}`} 
                style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              >
                <span>Occasions</span>
                <ChevronDown size={14} />
              </button>

              {dropdownOpen && (
                <div className="occasions-dropdown-menu">
                  {OCCASIONS.filter(o => o.id !== 'all').map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleOccasionClick(cat.id)}
                        className={`dropdown-item-btn ${isSelected ? 'active-item' : ''}`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button onClick={onOpenCustomOrder} className="nav-link-item">
              Personalized Gifts
            </button>

            <a href="#about" className="nav-link-item">About Us</a>
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
              title="Search Products"
            >
              <Search size={18} />
              <span>Search</span>
            </button>

            <button onClick={onOpenWishlist} className="nav-icon-btn" title="Wishlist">
              <Heart size={19} />
              {wishlistCount > 0 && <span className="cart-count-badge">{wishlistCount}</span>}
            </button>

            {user ? (
              <button onClick={onOpenAuth} className="nav-profile-btn-active" title={`Student Profile (${user.name})`}>
                <div className="profile-avatar-circle">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <span className="profile-name-text">{user.name ? user.name.split(' ')[0] : 'Student'}</span>
              </button>
            ) : (
              <button onClick={onOpenAuth} className="nav-login-btn-pink">
                <User size={16} />
                <span>Login</span>
              </button>
            )}

            {/* Accurate Shopping Cart Icon with Badge Counter */}
            <button onClick={onOpenCart} className="nav-icon-btn nav-cart-btn-highlight" title="Shopping Cart">
              <ShoppingCart size={19} />
              <span className="cart-count-badge">{cartCount}</span>
            </button>

          </div>

        </div>
      </nav>
    </header>
  );
}
