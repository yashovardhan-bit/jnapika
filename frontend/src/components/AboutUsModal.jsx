import React from 'react';
import { X, Heart, Sparkles, Gift, Users, Award, ShieldCheck } from 'lucide-react';
import { STORE_INFO } from '../data/mockData';
import './AboutUsModal.css';

export default function AboutUsModal({ isOpen, onClose, onExploreProducts }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="about-dialog-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="about-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="about-header-icon">
              <Gift size={20} color="#d95e68" />
            </div>
            <div>
              <h3 className="about-modal-title">About Jnapika</h3>
              <p className="about-modal-sub">Student-led Handcrafted Gifts Studio</p>
            </div>
          </div>
          <button onClick={onClose} className="about-btn-close" title="Close">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="about-modal-body">
          
          {/* Motto Banner Box */}
          <div className="about-motto-box">
            <Sparkles size={20} className="about-motto-sparkle" />
            <h4 className="about-motto-title">OUR MOTTO</h4>
            <p className="about-motto-quote">
              "{STORE_INFO.motto}"
            </p>
          </div>

          {/* Core Work of Jnapika */}
          <div className="about-content-section">
            <h4 className="about-section-heading">
              <Heart size={16} color="#d95e68" fill="#d95e68" /> The Work of Jnapika
            </h4>
            <p className="about-paragraph">
              At <strong>Jnapika</strong>, we believe every memory deserves to be preserved with warmth and touchable beauty. Started by creative campus students, we specialize in handcrafted personalized gifts — from wax-sealed vintage letters and realistic pencil sketches to glowing custom photo frames and memory explosion boxes.
            </p>
            <p className="about-paragraph">
              Whether it’s a birthday surprise, anniversary celebration, or a heartfelt message to a friend, our mission is to craft authentic keepsakes that make your loved ones feel truly cherished and happy.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="about-highlights-grid">
            <div className="about-highlight-card">
              <Sparkles size={18} color="#d95e68" />
              <h5>100% Handcrafted</h5>
              <p>Made with love & attention by student artisans</p>
            </div>
            <div className="about-highlight-card">
              <ShieldCheck size={18} color="#d95e68" />
              <h5>Personalized Care</h5>
              <p>Custom notes, photos & tailored packaging</p>
            </div>
            <div className="about-highlight-card">
              <Users size={18} color="#d95e68" />
              <h5>Express Campus Delivery</h5>
              <p>Fast hostel & local delivery within 24-48 hours</p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="about-footer-row">
            <button
              onClick={() => {
                onClose();
                onExploreProducts();
              }}
              className="about-btn-primary"
            >
              Explore Our Collection
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
