import React from 'react';
import { Truck, Gift, ShieldCheck, Headphones } from 'lucide-react';
import './HeroBanner.css';

export default function HeroBanner({ onExploreClick, onCustomOrderClick }) {
  return (
    <section id="home">
      
      {/* Main Hero Banner */}
      <div className="hero-container">
        <div className="hero-inner-wrapper">
          
          {/* Left Text Box */}
          <div className="hero-left-content">
            <h1 className="hero-heading">
              Make Every <br />
              Occasion Special
              <span className="heart-drawing-icon">♡</span>
            </h1>

            <p className="hero-subtitle">
              Personalized gifts crafted with love for birthdays, weddings, anniversaries and all of life's special moments.
            </p>

            <div className="hero-buttons-row">
              <button onClick={onExploreClick} className="btn-hero-solid">
                Shop Now
              </button>

              <button onClick={onCustomOrderClick} className="btn-hero-outline">
                Explore Collections
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="pagination-dots">
              <span className="dot-pill active"></span>
              <span className="dot-pill"></span>
              <span className="dot-pill"></span>
            </div>
          </div>

          {/* Right Product Image */}
          <div className="hero-right-image-box">
            <img
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop"
              alt="Handcrafted Gift Box with Love Note & Candle"
              className="hero-main-img"
            />
          </div>

        </div>
      </div>

      {/* 4 Feature Value Props Bar */}
      <div className="feature-values-section">
        <div className="feature-cards-grid">
          
          <div className="value-card-item">
            <div className="value-card-icon">
              <Truck size={28} />
            </div>
            <div>
              <h4 className="value-card-title">Fast Delivery</h4>
              <p className="value-card-desc">Quick & reliable shipping</p>
            </div>
          </div>

          <div className="value-card-item">
            <div className="value-card-icon">
              <Gift size={28} />
            </div>
            <div>
              <h4 className="value-card-title">Handpicked Gifts</h4>
              <p className="value-card-desc">Unique & high quality</p>
            </div>
          </div>

          <div className="value-card-item">
            <div className="value-card-icon">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="value-card-title">Secure Checkout</h4>
              <p className="value-card-desc">100% safe payments</p>
            </div>
          </div>

          <div className="value-card-item">
            <div className="value-card-icon">
              <Headphones size={28} />
            </div>
            <div>
              <h4 className="value-card-title">Customer Support</h4>
              <p className="value-card-desc">We're here to help you</p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
