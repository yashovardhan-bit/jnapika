import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '../data/mockData';
import './ReviewsSection.css';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="reviews-section">
      
      {/* Header */}
      <div className="section-header-title-box">
        <h2 className="section-main-title">WHAT OUR CUSTOMERS SAY</h2>
        <div className="title-heart-accent">♡</div>
      </div>

      {/* Carousel Grid with Arrow Controls */}
      <div className="reviews-carousel-wrapper">
        <button className="arrow-circle-btn" title="Previous">
          <ChevronLeft size={18} />
        </button>

        <div className="reviews-cards-grid">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="review-card-item">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="review-author-avatar"
              />

              <div>
                <h4 className="review-author-name">{rev.name}</h4>

                <div className="review-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#f5a623" color="#f5a623" />
                  ))}
                </div>

                <p className="review-quote-body">
                  "{rev.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow-circle-btn" title="Next">
          <ChevronRight size={18} />
        </button>
      </div>

    </section>
  );
}
