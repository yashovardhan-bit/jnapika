import React from 'react';
import { X, MessageCircle, Mail, Phone, MapPin, Camera, Globe, MessageSquare, Share2 } from 'lucide-react';
import { STORE_INFO } from '../data/mockData';
import './ContactUsModal.css';

export default function ContactUsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="contact-dialog-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="contact-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="contact-header-icon">
              <MessageCircle size={20} color="#10B981" />
            </div>
            <div>
              <h3 className="contact-modal-title">Contact & Help Center</h3>
              <p className="contact-modal-sub">We're here for your issues, queries & custom orders</p>
            </div>
          </div>
          <button onClick={onClose} className="contact-btn-close" title="Close">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="contact-modal-body">

          {/* Quick Direct WhatsApp Button */}
          <a
            href={`https://wa.me/${STORE_INFO.ownerWhatsApp}?text=Hi%20Jnapika!%20I%20have%20a%20query/issue%20regarding%20an%20order.`}
            target="_blank"
            rel="noreferrer"
            className="contact-whatsapp-banner"
          >
            <div className="contact-wa-circle">
              <MessageCircle size={22} color="#ffffff" fill="#ffffff" />
            </div>
            <div className="contact-wa-info">
              <h4>Chat Directly on WhatsApp</h4>
              <p>Instant support for custom orders, queries & status</p>
            </div>
            <span className="contact-wa-badge">Connect Now</span>
          </a>

          {/* Contact Details List */}
          <div className="contact-details-grid">
            
            <div className="contact-item-card">
              <div className="contact-item-icon bg-pink">
                <Mail size={18} color="#d95e68" />
              </div>
              <div>
                <span className="contact-item-label">Direct Email</span>
                <p className="contact-item-value">{STORE_INFO.ownerEmail}</p>
              </div>
            </div>

            <div className="contact-item-card">
              <div className="contact-item-icon bg-blue">
                <Phone size={18} color="#2563eb" />
              </div>
              <div>
                <span className="contact-item-label">Phone Support</span>
                <p className="contact-item-value">{STORE_INFO.ownerPhone}</p>
              </div>
            </div>

            <div className="contact-item-card contact-full-width">
              <div className="contact-item-icon bg-purple">
                <MapPin size={18} color="#8b5cf6" />
              </div>
              <div>
                <span className="contact-item-label">Campus Location</span>
                <p className="contact-item-value">{STORE_INFO.location}</p>
              </div>
            </div>

          </div>

          {/* Social Media Handles */}
          <div className="contact-social-section">
            <h4 className="contact-social-title">
              <Share2 size={15} color="#d95e68" /> Connect on Social Media
            </h4>
            <div className="contact-social-buttons-row">
              <a
                href={STORE_INFO.instagram}
                target="_blank"
                rel="noreferrer"
                className="contact-social-btn instagram"
              >
                <Camera size={18} />
                <span>Instagram</span>
              </a>

              <a
                href={STORE_INFO.facebook}
                target="_blank"
                rel="noreferrer"
                className="contact-social-btn facebook"
              >
                <Globe size={18} />
                <span>Facebook</span>
              </a>

              <a
                href={STORE_INFO.twitter}
                target="_blank"
                rel="noreferrer"
                className="contact-social-btn twitter"
              >
                <MessageSquare size={18} />
                <span>Twitter / X</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

