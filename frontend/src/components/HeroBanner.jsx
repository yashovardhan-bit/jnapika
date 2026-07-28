import React, { useState, useEffect } from 'react';
import { Truck, Gift, ShieldCheck, Headphones, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import './HeroBanner.css';
import image1 from '../assets/imageone.jpeg';
import image2 from '../assets/imagetwo.png';
import image3 from '../assets/imagethree.jpeg';
import image4 from '../assets/imagefour.jpeg';

const HERO_CARDS = [
  {
    id: 1,
    title: 'Explosion Surprise Box',
    desc: 'Multi-layer handmade surprise box with 20+ photo slots & hidden note pockets',
    price: '₹1,149',
    originalPrice: '₹1,499',
    badge: '★ Bestseller',
    image: image1,
    category: 'birthdaybook'
  },
  {
    id: 2,
    title: 'Custom Memory Frame',
    desc: 'Natural pine wood frame custom engraved with your favorite picture & quote',
    price: '₹899',
    originalPrice: '₹1,199',
    badge: '🔥 Trending',
    image: image2,
    category: 'anniversary'
  },
  {
    id: 3,
    title: 'Vintage Love Letters',
    desc: 'Hand-written customized scroll letters sealed with real stamp wax & dried roses',
    price: '₹549',
    originalPrice: '₹799',
    badge: '✨ Handcrafted',
    image: image3,
    category: 'vintageletters'
  },
  {
    id: 4,
    title: 'Realistic Pencil Portrait',
    desc: 'Detailed pencil sketch drawn by expert artists from your submitted photograph',
    price: '₹1,299',
    originalPrice: '₹1,699',
    badge: '💎 Premium',
    image: image4,
    category: 'pencilart'
  }
];

export default function HeroBanner({ onExploreClick, onCustomOrderClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CARDS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? HERO_CARDS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_CARDS.length);
  };

  return (
    <section id="home" className="hero-section-root">
      
      {/* Main Hero Banner */}
      <div className="hero-container">
        <div className="hero-inner-wrapper">
          
          {/* Left Text Box */}
          <div className="hero-left-content">
            
            <div className="hero-top-tag">
              <Sparkles size={14} />
              <span>Handcrafted Memory Gifts</span>
            </div>

            <h1 className="hero-heading">
              Make Every <br />
              Occasion Special
              <span className="heart-drawing-icon">♡</span>
            </h1>

            <p className="hero-subtitle">
              Personalized gifts crafted with love for birthdays, weddings, anniversaries, and all of life's precious moments.
            </p>

            <div className="hero-buttons-row">
              <button onClick={onExploreClick} className="btn-hero-solid">
                <span>Shop Now</span>
                <ArrowRight size={16} />
              </button>

              <button onClick={onCustomOrderClick} className="btn-hero-outline">
                Personalized Gifts
              </button>
            </div>

            {/* Slider Navigation Dots */}
            <div className="hero-slider-controls">
              <button onClick={handlePrev} className="hero-nav-arrow" title="Previous Card">
                <ChevronLeft size={18} />
              </button>
              <div className="pagination-dots">
                {HERO_CARDS.map((card, i) => (
                  <button
                    key={card.id}
                    onClick={() => setActiveIndex(i)}
                    className={`dot-pill ${activeIndex === i ? 'active' : ''}`}
                    title={`Slide ${i + 1}: ${card.title}`}
                  />
                ))}
              </div>
              <button onClick={handleNext} className="hero-nav-arrow" title="Next Card">
                <ChevronRight size={18} />
              </button>
            </div>

          </div>

          {/* Right Sliding Cards Deck */}
          <div 
            className="hero-right-cards-deck"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="cards-slider-viewport">
              <div 
                className="cards-slider-track"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {HERO_CARDS.map((card, i) => (
                  <div key={card.id} className="hero-sliding-card">
                    <div className="hero-card-img-wrapper">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="hero-card-img"
                      />
                      <span className="hero-card-badge">{card.badge}</span>
                      <div className="hero-card-gradient-overlay" />
                    </div>

                    <div className="hero-card-details">
                      <div className="hero-card-header">
                        <h3 className="hero-card-title">{card.title}</h3>
                        <div className="hero-card-prices">
                          <span className="hero-card-price">{card.price}</span>
                          <span className="hero-card-old-price">{card.originalPrice}</span>
                        </div>
                      </div>
                      
                      <p className="hero-card-desc">{card.desc}</p>
                      
                      <div className="hero-card-action-row">
                        <button onClick={onExploreClick} className="btn-card-action">
                          Order This Gift
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Arrow Controls over Image */}
            <button onClick={handlePrev} className="deck-arrow-btn left" title="Previous">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} className="deck-arrow-btn right" title="Next">
              <ChevronRight size={20} />
            </button>

          </div>

        </div>
      </div>

      {/* 4 Feature Value Props Bar */}
      <div className="feature-values-section">
        <div className="feature-cards-grid">
          
          <div className="value-card-item">
            <div className="value-card-icon">
              <Truck size={26} />
            </div>
            <div>
              <h4 className="value-card-title">Fast Delivery</h4>
              <p className="value-card-desc">Quick & reliable shipping</p>
            </div>
          </div>

          <div className="value-card-item">
            <div className="value-card-icon">
              <Gift size={26} />
            </div>
            <div>
              <h4 className="value-card-title">Handpicked Gifts</h4>
              <p className="value-card-desc">Unique & high quality</p>
            </div>
          </div>

          <div className="value-card-item">
            <div className="value-card-icon">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h4 className="value-card-title">Secure Checkout</h4>
              <p className="value-card-desc">100% safe payments</p>
            </div>
          </div>

          <div className="value-card-item">
            <div className="value-card-icon">
              <Headphones size={26} />
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
