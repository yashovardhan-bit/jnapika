import React, { useState } from 'react';
import { X, Send, Mail, CheckCircle2, Copy, Sparkles, ShoppingBag, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORE_INFO } from '../data/mockData';
import './OrderModal.css';

export default function OrderModal({ product, isOpen, onClose, onOrderPlaced, user }) {
  if (!isOpen || !product) return null;

  const [formData, setFormData] = useState({
    customerName: user ? user.name : '',
    phone: user ? user.phone : '',
    email: user ? user.email : '',
    hostelAddress: '',
    quantity: 1,
    selectedColor: product.availableColors ? product.availableColors[0] : 'Default',
    customNotes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalPrice = product.price * formData.quantity;

  const generateMessageText = () => {
    return `*🛍️ NEW ORDER - Jnapika Handicraft Gifts*
---------------------------------------
📌 *Product:* ${product.name}
🔢 *Quantity:* ${formData.quantity}
🎨 *Variant:* ${formData.selectedColor}
💰 *Total Amount:* ₹${totalPrice} (Pay on Pickup/Delivery)

👤 *Customer Details:*
• *Name:* ${formData.customerName || 'Not provided'}
• *Phone:* ${formData.phone || 'Not provided'}
• *Email:* ${formData.email || 'Not provided'}
• *Hostel / Address:* ${formData.hostelAddress || 'Campus Pickup'}

📝 *Customization Request / Notes:*
${formData.customNotes ? `"${formData.customNotes}"` : 'Standard product design'}

---------------------------------------
_Sent via Jnapika Campus Web App_`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.hostelAddress) {
      alert("Please fill in your Name, Phone Number, and Hostel/Address so we can contact you!");
      return;
    }

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}

    setIsSubmitted(true);

    if (onOrderPlaced) {
      onOrderPlaced({
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        product,
        formData,
        totalPrice,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    }
  };

  const messageText = generateMessageText();
  const encodedText = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${STORE_INFO.ownerWhatsApp}?text=${encodedText}`;
  const mailtoUrl = `mailto:${STORE_INFO.ownerEmail}?subject=${encodeURIComponent(`New Order: ${product.name} - ${formData.customerName}`)}&body=${encodedText}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog-box">
        
        {/* Header */}
        <div className="modal-header-gradient">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} color="#fbcfe8" />
            <h3 className="modal-header-title">
              {isSubmitted ? 'Order Details Ready!' : 'Place Your Handicraft Order'}
            </h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body-scroll">
          
          {!isSubmitted ? (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Product Preview */}
              <div className="product-snippet-card">
                <img src={product.image} alt={product.name} className="snippet-img" />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', fontWeight: 700 }}>{product.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--pink-700)', fontWeight: 700 }}>
                    ₹{product.price} × {formData.quantity} = <strong>₹{totalPrice}</strong>
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--emerald-700)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.2rem' }}>
                    <Truck size={10} /> Pay on Pickup / Delivery
                  </span>
                </div>
              </div>

              {/* Input Fields */}
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  className="form-input-text"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label className="form-label">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="form-input-text"
                  />
                </div>

                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="ananya@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="form-input-text"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Hostel / Campus Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gargi Hostel, Room 304"
                  value={formData.hostelAddress}
                  onChange={(e) => setFormData({...formData, hostelAddress: e.target.value})}
                  className="form-input-text"
                />
              </div>

              <div>
                <label className="form-label">Customization Notes / Text / Photo Drive Link</label>
                <textarea
                  rows={2}
                  placeholder="Engrave text, photo link or special instructions..."
                  value={formData.customNotes}
                  onChange={(e) => setFormData({...formData, customNotes: e.target.value})}
                  className="form-input-text"
                />
              </div>

              <button type="submit" className="btn-submit-order">
                <Sparkles size={16} />
                <span>Confirm & Generate Order</span>
              </button>

            </form>
          ) : (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'var(--emerald-100)', color: 'var(--emerald-600)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                <CheckCircle2 size={32} style={{ margin: 'auto' }} />
              </div>

              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800 }}>Order Details Generated!</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--neutral-600)' }}>
                Click below to send your order directly to the owner via WhatsApp or Email!
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" style={{ padding: '0.8rem', borderRadius: 'var(--radius-xl)', background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <Send size={18} />
                  <span>Send Order via WhatsApp</span>
                </a>

                <a href={mailtoUrl} target="_blank" rel="noreferrer" style={{ padding: '0.75rem', borderRadius: 'var(--radius-xl)', background: 'var(--purple-700)', color: '#fff', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <Mail size={18} />
                  <span>Send Order via Email</span>
                </a>
              </div>

              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--purple-50)', border: '1px solid var(--purple-200)', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.75rem' }}>
                  <span>Order Message Summary</span>
                  <button onClick={copyToClipboard} style={{ color: 'var(--pink-600)', background: '#fff', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                    <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre style={{ fontSize: '0.7rem', whiteSpace: 'pre-wrap', color: 'var(--neutral-700)' }}>{messageText}</pre>
              </div>

              <button onClick={onClose} style={{ fontSize: '0.8rem', color: 'var(--neutral-500)', fontWeight: 600 }}>Close Dialog</button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
