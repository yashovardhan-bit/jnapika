import React from 'react';
import './OfferBanner.css';

export default function OfferBanner({ onCustomOrderClick }) {
  return (
    <section className="promo-banners-section">
      <div className="promo-banners-grid">
        
        {/* Left Pink Promo Card */}
        <div className="promo-card pink-theme">
          <div className="promo-text-content">
            <span className="promo-badge-tag">Personalized Just for You</span>
            <h3 className="promo-title-text">
              Customize your gift with names, photos & special messages.
            </h3>
            <button onClick={onCustomOrderClick} className="btn-promo-pink">
              Create Your Gift
            </button>
          </div>

          <div className="promo-img-box">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
              alt="You are Special Customized Mug"
              className="promo-img"
            />
          </div>
        </div>

        {/* Right Cream Promo Card */}
        <div className="promo-card cream-theme">
          <div className="promo-text-content">
            <span className="promo-badge-tag">Special Offer</span>
            <h3 className="promo-title-text">
              Get 15% Off on your first order
            </h3>
            <div className="code-pill-box">
              Use Code: <strong>JNAPIKA15</strong>
            </div>
            <br />
            <button onClick={onCustomOrderClick} className="btn-promo-brown">
              Shop Now
            </button>
          </div>

          <div className="promo-img-box">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
              alt="Gift Box with Flowers Special Offer"
              className="promo-img"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
