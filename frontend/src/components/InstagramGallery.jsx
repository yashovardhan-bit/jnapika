import React from 'react';
import { INSTAGRAM_POSTS, STORE_INFO } from '../data/mockData';
import './InstagramGallery.css';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function InstagramGallery() {
  return (
    <section className="insta-gallery-section">
      
      {/* Header */}
      <div className="section-header-title-box">
        <h2 className="section-main-title">FOLLOW US ON INSTAGRAM</h2>
        <div className="title-heart-accent">♡</div>
      </div>

      {/* Grid of 7 Photos + 1 Callout Card */}
      <div className="insta-photos-grid">
        {INSTAGRAM_POSTS.slice(0, 7).map((post) => (
          <div key={post.id} className="insta-photo-box">
            <img src={post.image} alt={post.caption} className="insta-photo-img" />
          </div>
        ))}

        {/* 8th Callout Box */}
        <a
          href={`https://instagram.com/${STORE_INFO.instagram.replace('@', '')}`}
          target="_blank"
          rel="noreferrer"
          className="insta-callout-card"
        >
          <div className="insta-callout-text">
            <span>Follow Us</span>
            <InstagramIcon size={14} />
          </div>
          <span className="insta-handle-text">{STORE_INFO.instagram}</span>
        </a>
      </div>

    </section>
  );
}
