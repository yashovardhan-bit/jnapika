import React from 'react';
import { Gift } from 'lucide-react';
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

export default function Footer({ onSelectCategory, onOpenCustomOrder }) {
  return (
    <footer>
      {/* Main Footer Links */}
      <div className="footer-main-section">
        <div className="footer-inner-container">
          
          <div className="footer-columns-grid">
            
            {/* Brand Info */}
            <div className="footer-brand-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem', color: 'white' }}>
                <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>Jnapika</span>
                <Gift size={22} color="#ffffff" />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', marginBottom: '1rem' }}>
                Turning love and memories into beautiful, handmade keepsakes.
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

            {/* PRODUCTS */}
            <div>
              <h4 className="footer-col-title">PRODUCTS</h4>
              <ul className="footer-col-links">
                <li><button onClick={() => onSelectCategory('all')}>All Products</button></li>
                <li><button onClick={() => onSelectCategory('all')}>New Arrivals</button></li>
                <li><button onClick={() => onSelectCategory('all')}>Bestsellers</button></li>
                <li><button onClick={onOpenCustomOrder}>Personalized Gifts</button></li>
                <li><button onClick={() => onSelectCategory('giftcard')}>Gift Cards</button></li>
              </ul>
            </div>

            {/* OCCASIONS */}
            <div>
              <h4 className="footer-col-title">OCCASIONS</h4>
              <ul className="footer-col-links">
                <li><button onClick={() => onSelectCategory('giftcard')}>Gift Cards</button></li>
                <li><button onClick={() => onSelectCategory('birthdaybook')}>Birthday Book</button></li>
                <li><button onClick={() => onSelectCategory('vintageletters')}>Vintage Letters</button></li>
                <li><button onClick={() => onSelectCategory('bouquet')}>Bouquet</button></li>
                <li><button onClick={() => onSelectCategory('pencilart')}>Pencil Art</button></li>
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

          </div>

          <div className="footer-bottom-copyright">
            © 2024 Jnapika. All rights reserved. Crafted with ♡ for special memories.
          </div>

        </div>
      </div>

    </footer>
  );
}
