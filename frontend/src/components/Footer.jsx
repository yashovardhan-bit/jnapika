import React, { useState } from 'react';
import { Mail, Gift } from 'lucide-react';
import './Footer.css';

const InstagramIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const PinterestIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const YoutubeIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

export default function Footer({ onSelectCategory }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer>
      
      {/* Newsletter Subscription Bar */}
      <div className="newsletter-bar-wrapper">
        <div className="newsletter-inner-container">
          
          <div className="newsletter-left-info">
            <div className="envelope-icon-box">
              <Mail size={32} />
            </div>
            <div>
              <h4 className="newsletter-title-text">Stay updated with exclusive offers & new arrivals</h4>
              <p className="newsletter-sub-text">Subscribe to our newsletter and never miss a deal!</p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form-right">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
            />
            <button type="submit" className="btn-subscribe">
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main-section">
        <div className="footer-inner-container">
          
          <div className="footer-columns-grid">
            
            {/* Brand Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem',color:'white' }}>
                <span  style={{ fontSize: '1.6rem' }}>Jnapika</span>
                <Gift size={20} color="#ffffff" />
              </div>
              <p style={{ fontSize: '0.68rem', color: '#ffffff', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                Gifts that speak from the heart
              </p>

              <div className="footer-social-icons">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-circle-icon" title="Instagram">
                  <InstagramIcon size={14} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-circle-icon" title="Facebook">
                  <FacebookIcon size={14} />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-circle-icon" title="Pinterest">
                  <PinterestIcon size={14} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-circle-icon" title="YouTube">
                  <YoutubeIcon size={14} />
                </a>
              </div>
            </div>

            {/* SHOP */}
            <div>
              <h4 className="footer-col-title">SHOP</h4>
              <ul className="footer-col-links">
                <li><a href="#products-catalog">All Products</a></li>
                <li><a href="#products-catalog">New Arrivals</a></li>
                <li><a href="#products-catalog">Bestsellers</a></li>
                <li><a href="#products-catalog">Personalized Gifts</a></li>
                <li><a href="#products-catalog">Gift Cards</a></li>
              </ul>
            </div>

            {/* OCCASIONS */}
            <div>
              <h4 className="footer-col-title">OCCASIONS</h4>
              <ul className="footer-col-links">
                <li><button onClick={() => onSelectCategory('birthday')}>gift cards</button></li>
                <li><button onClick={() => onSelectCategory('wedding')}>Birthdaybook</button></li>
                <li><button onClick={() => onSelectCategory('anniversary')}>Vintage letters</button></li>
                <li><button onClick={() => onSelectCategory('babyshower')}>Bouqet</button></li>
                <li><button onClick={() => onSelectCategory('festivals')}>pencil art</button></li>
                <li><button onClick={() => onSelectCategory('corporate')}>personalized gifts</button></li>
              </ul>
            </div>

            {/* HELP */}
            <div>
              <h4 className="footer-col-title">HELP</h4>
              <ul className="footer-col-links">
                <li><a href="#faqs">FAQs</a></li>
                <li><a href="#shipping">Shipping & Delivery</a></li>
                <li><a href="#returns">Returns & Refunds</a></li>
                <li><a href="#track">Track Order</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>

            {/* ABOUT */}
            <div>
              <h4 className="footer-col-title">ABOUT</h4>
              <ul className="footer-col-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#story">Our Story</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* WE ACCEPT */}
            {/* <div>
              <h4 className="footer-col-title">WE ACCEPT</h4>
              <div className="payment-badges-row">
                <span className="pay-badge-pill" style={{ color: '#1a1f71' }}>VISA</span>
                <span className="pay-badge-pill" style={{ color: '#eb001b' }}>Mastercard</span>
                <span className="pay-badge-pill" style={{ color: '#005a9c' }}>RuPay</span>
                <span className="pay-badge-pill" style={{ color: '#5f259f' }}>UPI</span>
              </div>
            </div> */}

          </div>

          <div className="footer-bottom-copyright">
            © 2024 Jnapika. All rights reserved.
          </div>

        </div>
      </div>

    </footer>
  );
}
