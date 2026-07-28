import React from 'react';
import { INSTAGRAM_POSTS, STORE_INFO } from '../data/mockData';
import { Heart } from 'lucide-react';
import './InstagramGallery.css';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function InstagramGallery() {
  const postsToDisplay = INSTAGRAM_POSTS.slice(0, 5);

  return (
    <section className="insta-gallery-section">
      
      {/* Title Header */}
      <div className="section-header-title-box">
        <h2 className="section-main-title">FOLLOW US ON INSTAGRAM</h2>
        <div className="title-heart-accent">♡</div>
      </div>

      {/* Identical Single-Line Row: 5 Photos + 1 Follow CTA Card */}
      <div className="insta-photos-row">
        {postsToDisplay.map((post) => (
          <a
            key={post.id}
            href={STORE_INFO.instagramUrl || `https://instagram.com/${STORE_INFO.instagram.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="insta-photo-box"
          >
            <img src={post.image} alt={post.caption} className="insta-photo-img" />
            <div className="insta-hover-overlay">
              <InstagramIcon size={22} />
              <div className="insta-likes-pill">
                <Heart size={12} fill="#ffffff" color="#ffffff" />
                <span>{post.likes}</span>
              </div>
            </div>
          </a>
        ))}

        {/* Identical 6th Follow CTA Box */}
        <a
          href={STORE_INFO.instagramUrl || `https://instagram.com/${STORE_INFO.instagram.replace('@', '')}`}
          target="_blank"
          rel="noreferrer"
          className="insta-callout-card"
        >
          <div className="insta-icon-badge">
            <InstagramIcon size={24} />
          </div>
          <div className="insta-callout-content">
            <span className="insta-callout-label">Follow Us</span>
            <span className="insta-handle-text">{STORE_INFO.instagram}</span>
          </div>
          <span className="insta-btn-follow">Visit Instagram</span>
        </a>
      </div>

    </section>
  );
}
