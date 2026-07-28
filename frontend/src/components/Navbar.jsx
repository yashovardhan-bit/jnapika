import React, { useState } from 'react';
import { Search, Heart, User, ShoppingCart, ChevronDown, Gift } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
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
  onOpenSearch,
  onOpenAbout,
  onOpenContact,
  user
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCategoryClick = (catId) => {
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
              className={`nav-link-item ${selectedCategory !== 'all' ? 'active' : ''}`}
              onClick={handleProductsClick}
            >
              Products
            </a>
            
            {/* Categories Dropdown (Changed from Occasions to Categories) */}
            <div 
              style={{ position: 'relative' }} 
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                className={`nav-link-item ${selectedCategory !== 'all' ? 'active-occasion' : ''}`} 
                style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              >
                <span>Categories</span>
                <ChevronDown size={14} />
              </button>

              {dropdownOpen && (
                <div className="occasions-dropdown-menu">
                  {CATEGORIES.filter(c => c.id !== 'all').map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
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

            {/* About Us Dialog Trigger */}
            <button onClick={onOpenAbout} className="nav-link-item">
              About Us
            </button>

            {/* Contact Dialog Trigger */}
            <button onClick={onOpenContact} className="nav-link-item">
              Contact
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="nav-right-actions">
            
            {/* Interactive Search Bar Trigger */}
            <button 
              onClick={onOpenSearch} 
              className="nav-icon-btn nav-search-trigger"
              title="Search Products"
            >
              <Search size={18} />
              <span>Search</span>
            </button>

            {/* Wishlist Button */}
            <button onClick={onOpenWishlist} className="nav-icon-btn" title="Wishlist">
              <Heart size={19} />
              {wishlistCount > 0 && <span className="cart-count-badge">{wishlistCount}</span>}
            </button>

            {/* Login / Profile Button Switch */}
            {user ? (
              <button onClick={onOpenAuth} className="nav-profile-btn-active" title={`Student Profile (${user.name})`}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="nav-profile-thumb" />
                ) : (
                  <div className="profile-avatar-circle">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                )}
                <span className="profile-name-text">Profile</span>
              </button>
            ) : (
              <button onClick={onOpenAuth} className="nav-login-btn-pink">
                <User size={16} />
                <span>Login</span>
              </button>
            )}

            {/* Shopping Cart Button */}
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
