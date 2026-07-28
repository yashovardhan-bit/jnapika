import React from 'react';
import { OCCASIONS } from '../data/mockData';
import './OccasionsSection.css';

export default function OccasionsSection({ selectedCategory, setSelectedCategory }) {
  const occasionItems = OCCASIONS.filter(o => o.id !== 'all');

  return (
    <section id="occasions" className="occasions-section">
      
      {/* Title */}
      <div className="section-header-title-box">
        <h2 className="section-main-title">SHOP BY CATEGORIES</h2>
        <div className="title-heart-accent">♡</div>
      </div>


      {/* 5 Cards Single Line Container */}
      <div className="occasions-slider-wrapper">
        <div className="occasions-cards-row">
          {occasionItems.map((occ) => (
            <div
              key={occ.id}
              onClick={() => setSelectedCategory(occ.id)}
              className={`occasion-item-card ${selectedCategory === occ.id ? 'active-occasion' : ''}`}
            >
              <div className="occasion-img-box">
                <img src={occ.image} alt={occ.name} className="occasion-img" />
                <span className="occasion-badge">{occ.badge || 'Popular'}</span>
              </div>
              <div className="occasion-info-box">
                <h3 className="occasion-name-text">{occ.name}</h3>
                <p className="occasion-count-text">{occ.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
