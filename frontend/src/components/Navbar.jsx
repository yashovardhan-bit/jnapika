import React, { useState } from 'react';
import { 
  Search, Heart, User, ShoppingCart, ChevronDown, Gift, Menu, X, 
  Sparkles, Info, MessageSquare, Home, ShoppingBag, Grid, Package, 
  Settings, LogOut, ChevronRight 
} from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById('products-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductsClick = (e) => {
    if (e) e.preventDefault();
    setSelectedCategory('all');
    setMobileMenuOpen(false);
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

          {/* Center Navigation Links (Desktop) */}
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
            
            {/* Categories Dropdown */}
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
              <span className="desktop-only-text">Search</span>
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
                <span className="profile-name-text desktop-only-text">Profile</span>
              </button>
            ) : (
              <button onClick={onOpenAuth} className="nav-login-btn-pink">
                <User size={16} />
                <span className="desktop-only-text">Login</span>
              </button>
            )}

            {/* Shopping Cart Button */}
            <button onClick={onOpenCart} className="nav-icon-btn nav-cart-btn-highlight" title="Shopping Cart">
              <ShoppingCart size={19} />
              <span className="cart-count-badge">{cartCount}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-mobile-hamburger-btn"
              title="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

        </div>
      </nav>

      {/* Mobile Sliding Sidebar Drawer (Exact Format Requested) */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-sidebar-drawer" onClick={(e) => e.stopPropagation()}>
          {/* <button onClick={onClose} className="btn-close-modal" title="Close Wishlist">
            <X size={20} />
          </button> */}
            {/* Top Profile Card Header */}
            <div className="sidebar-profile-card">
              <div className="sidebar-avatar-wrapper">
                <img 
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'} 
                  alt={user?.name || 'Yaso Vardhan'} 
                  className="sidebar-avatar-img" 
                />
              </div>

              <div className="sidebar-user-info">
                <h4 className="sidebar-user-name">{user ? user.name : 'Yaso Vardhan'}</h4>
                <p className="sidebar-user-email">{user ? user.email : 's220123@rguktsklm.ac.in'}</p>
              </div>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }} 
                className="sidebar-view-profile-btn"
              >
                <span>View Profile</span>
                <ChevronRight size={15} />
              </button>
            </div>


            <div className="sidebar-divider" />

            {/* Main Navigation Links */}
            <div className="sidebar-links-section">
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setMobileMenuOpen(false);
                }} 
                className="sidebar-link-btn"
              >
                <Home size={18} />
                <span>Home</span>
              </button>

              <button 
                onClick={(e) => handleProductsClick(e)} 
                className="sidebar-link-btn"
              >
                <ShoppingBag size={18} />
                <span>Products</span>
              </button>

              <button 
                onClick={() => {
                  handleCategoryClick('all');
                }} 
                className="sidebar-link-btn"
              >
                <Grid size={18} />
                <span>Categories</span>
              </button>

              <button 
                onClick={() => {
                  onOpenCustomOrder();
                  setMobileMenuOpen(false);
                }} 
                className="sidebar-link-btn highlight-pink"
              >
                <Sparkles size={18} />
                <span>Personalized Gifts</span>
              </button>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWishlist();
                }} 
                className="sidebar-link-btn"
              >
                <Heart size={18} />
                <span>Wishlist</span>
                {wishlistCount > 0 && <span className="sidebar-badge">{wishlistCount}</span>}
              </button>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }} 
                className="sidebar-link-btn"
              >
                <ShoppingCart size={18} />
                <span>Cart</span>
                {cartCount > 0 && <span className="sidebar-badge">{cartCount}</span>}
              </button>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }} 
                className="sidebar-link-btn"
              >
                <Package size={18} />
                <span>My Orders</span>
              </button>
            </div>

            <div className="sidebar-divider" />

            {/* Support & Action Links */}
            <div className="sidebar-links-section">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAbout();
                }} 
                className="sidebar-link-btn"
              >
                <Info size={18} />
                <span>About Us</span>
              </button>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }} 
                className="sidebar-link-btn"
              >
                <MessageSquare size={18} />
                <span>Contact</span>
              </button>

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }} 
                className="sidebar-link-btn"
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>

              {user && (
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }} 
                  className="sidebar-link-btn logout-text"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
