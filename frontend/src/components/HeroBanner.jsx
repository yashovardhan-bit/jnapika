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
    category: 'photoframe'
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

const VALUE_PROPS = [
  { id: 'v1', Icon: Truck, title: 'Fast Delivery', desc: 'Quick & reliable shipping' },
  { id: 'v2', Icon: Gift, title: 'Handpicked Gifts', desc: 'Unique & high quality' },
  { id: 'v3', Icon: ShieldCheck, title: 'Secure Checkout', desc: '100% safe payments' },
  { id: 'v4', Icon: Headphones, title: 'Customer Support', desc: "We're here to help you" },
];

export default function HeroBanner({ onExploreClick, onCustomOrderClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Clone first item to create smooth infinite forward loop [Card 1, Card 2, Card 3, Card 4, Card 1 Clone]
  const extendedCards = [...HERO_CARDS, HERO_CARDS[0]];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3200);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(HERO_CARDS.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(HERO_CARDS.length - 1);
      }, 30);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= HERO_CARDS.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const activeDotIndex = currentIndex % HERO_CARDS.length;

  return (
    <section id="home" className="hero-section-root">
      
      {/* Main Hero Banner Container */}
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
                    onClick={() => {
                      setIsTransitioning(true);
                      setCurrentIndex(i);
                    }}
                    className={`dot-pill ${activeDotIndex === i ? 'active' : ''}`}
                    title={`Slide ${i + 1}: ${card.title}`}
                  />
                ))}
              </div>
              <button onClick={handleNext} className="hero-nav-arrow" title="Next Card">
                <ChevronRight size={18} />
              </button>
            </div>

          </div>

          {/* Right Full-Width Sliding Deck */}
          <div 
            className="hero-right-cards-deck"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="cards-slider-viewport">
              <div 
                className="cards-slider-track"
                onTransitionEnd={handleTransitionEnd}
                style={{ 
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
                }}
              >
                {extendedCards.map((card, i) => (
                  <div key={`${card.id}-${i}`} className="hero-sliding-card">
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

            {/* Quick Arrow Overlay Controls */}
            <button onClick={handlePrev} className="deck-arrow-btn left" title="Previous">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} className="deck-arrow-btn right" title="Next">
              <ChevronRight size={20} />
            </button>

          </div>

        </div>
      </div>

      {/* 4 Feature Value Props Bar (Horizontal Looping Marquee Ticker on Mobile) */}
      <div className="feature-values-section">
        <div className="feature-cards-grid">
          {[...VALUE_PROPS, ...VALUE_PROPS].map((item, idx) => {
            const IconComp = item.Icon;
            return (
              <div key={`${item.id}-${idx}`} className="value-card-item">
                <div className="value-card-icon">
                  <IconComp size={22} />
                </div>
                <div>
                  <h4 className="value-card-title">{item.title}</h4>
                  <p className="value-card-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
