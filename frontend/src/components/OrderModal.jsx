import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Sparkles, ShoppingBag, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import './OrderModal.css';

export default function OrderModal({ product, cart, isOpen, onClose, onOrderPlaced, onClearCart, user }) {
  const [formData, setFormData] = useState({
    customerName: user ? user.name : '',
    phone: user ? user.phone : '',
    email: user ? user.email : '',
    hostelAddress: '',
    quantity: 1,
    selectedColor: product && product.availableColors
      ? product.availableColors[0]
      : 'Default',
    customNotes: ''
  });
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        customerName: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        hostelAddress: user.hostelAddress || ''
      }));
    }
  }, [user]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  if (!isOpen) return null;

  const isCartOrder = !product && cart && cart.length > 0;
  if (!isSubmitted && !product && !isCartOrder) return null;

  const totalPrice = isCartOrder 
    ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : (product ? product.price * formData.quantity : 0);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.hostelAddress) {
      alert("Please fill in your Name, Phone Number, and Hostel/Address so we can contact you!");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email || "N/A",
        hostelAddress: formData.hostelAddress,
        customNotes: formData.customNotes || "None",
        totalPrice
      };

      if (isCartOrder) {
        payload.items = cart.map((item) => ({
          product: item.name,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.price * item.quantity,
          selectedColor: item.selectedColor || item.color || "Default",
          customNotes: item.customNotes || formData.customNotes || "None"
        }));
      } else {
        payload.product = product.name;
        payload.quantity = formData.quantity;
        payload.selectedColor = formData.selectedColor;
        payload.price = product.price;
        payload.items = [{
          product: product.name,
          quantity: formData.quantity,
          price: product.price,
          totalPrice,
          selectedColor: formData.selectedColor,
          customNotes: formData.customNotes || "None"
        }];
      }

      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message || "Unable to place order.");
        setIsSubmitting(false);
        return;
      }

      const orderRecord = {
        id: result.orderId,
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email || "N/A",
        hostelAddress: formData.hostelAddress,
        customNotes: formData.customNotes || "None",
        totalPrice,
        date: new Date().toLocaleString("en-IN"),
        items: isCartOrder
          ? cart.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price }))
          : [{ name: product.name, quantity: formData.quantity, price: product.price }]
      };

      setCreatedOrder(orderRecord);

      // Trigger celebratory confetti animation
      try {
        confetti({ particleCount: 140, spread: 100, origin: { y: 0.5 } });
        setTimeout(() => {
          confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.6 } });
          confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.6 } });
        }, 200);
      } catch (err) { }

      setIsSubmitted(true);

      if (onOrderPlaced) {
        onOrderPlaced({
          id: result.orderId,
          product: isCartOrder ? { name: `Cart Order (${cart.length} items)` } : product,
          formData,
          totalPrice,
          date: orderRecord.date,
          items: orderRecord.items
        });
      }
    } catch (err) {
      console.error("Order submit error:", err);
      alert("Failed to connect to backend server. Please check if backend is running on http://localhost:5000.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseConfirmation = () => {
    if (onClearCart) {
      onClearCart();
    }
    setIsSubmitted(false);
    setCreatedOrder(null);
    onClose();
  };

  // Animated Screen on Confirmation inside Dialog Box
  if (isSubmitted && createdOrder) {
    return (
      <div className="modal-overlay">
        <div className="modal-dialog-box" style={{ animation: 'pinkCardPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          
          {/* Confetti Header */}
          <div className="modal-header-gradient" style={{ background: '#ecfdf5', borderBottom: '1.5px solid #a7f3d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={22} color="#059669" />
              <h3 className="modal-header-title" style={{ color: '#047857' }}>
                Order Confirmed!
              </h3>
            </div>
            <button onClick={handleCloseConfirmation} className="btn-close-modal">
              <X size={20} />
            </button>
          </div>

          {/* Confetti & Order Details Body */}
          <div className="modal-body-scroll" style={{ textAlign: 'center', padding: '1.5rem' }}>
            
            <div className="pink-success-checkmark" style={{ margin: '0 auto 1rem auto' }}>
              <CheckCircle2 size={46} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 800, color: '#059669', margin: '0 0 0.4rem 0' }}>
              🎉 Thank You for Your Order!
            </h3>

            <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.5', margin: '0 0 1.25rem 0', fontWeight: 500 }}>
              Your order has been recorded successfully. Our team will process it shortly!
            </p>

            <div className="pink-order-details-box">
              <div className="pink-details-header">
                <span>Order Summary</span>
                <span>#{createdOrder.id}</span>
              </div>

              <div style={{ marginBottom: '0.6rem', borderBottom: '1px dashed #fbcfe8', paddingBottom: '0.4rem' }}>
                {createdOrder.items.map((item, idx) => (
                  <div key={idx} className="pink-detail-row">
                    <span className="pink-detail-label">{item.name} (x{item.quantity})</span>
                    <span className="pink-detail-value">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pink-detail-row" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                <span className="pink-detail-label" style={{ color: '#d95e68', fontWeight: 700 }}>Total Order Amount</span>
                <span className="pink-detail-value" style={{ color: '#d95e68', fontWeight: 800 }}>₹{createdOrder.totalPrice}</span>
              </div>

              <div className="pink-detail-row" style={{ marginTop: '0.4rem' }}>
                <span className="pink-detail-label">Customer</span>
                <span className="pink-detail-value">{createdOrder.customerName} ({createdOrder.phone})</span>
              </div>

              <div className="pink-detail-row">
                <span className="pink-detail-label">Delivery Address</span>
                <span className="pink-detail-value">{createdOrder.hostelAddress}</span>
              </div>

              {createdOrder.customNotes !== 'None' && (
                <div className="pink-detail-row">
                  <span className="pink-detail-label">Custom Request</span>
                  <span className="pink-detail-value">"{createdOrder.customNotes}"</span>
                </div>
              )}

              <div className="pink-detail-row" style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: '#9ca3af' }}>
                <span className="pink-detail-label">Placed On</span>
                <span className="pink-detail-value">{createdOrder.date}</span>
              </div>
            </div>

            <button onClick={handleCloseConfirmation} className="btn-pink-done">
              Continue Shopping
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-dialog-box">

        {/* Header */}
        <div className="modal-header-gradient">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} color="#d95e68" />
            <h3 className="modal-header-title">
              {isCartOrder ? "Confirm Your Cart Order" : "Place Your Handicraft Order"}
            </h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body-scroll">
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Product Preview / Cart Summary Snippet */}
            {isCartOrder ? (
              <div style={{ background: '#fff0ed', border: '1.5px solid #fce8e6', borderRadius: '16px', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>
                    Cart Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--emerald-700)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Truck size={12} /> Pay on Delivery / Pickup
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '130px', overflowY: 'auto', paddingRight: '0.2rem' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', padding: '0.4rem 0.6rem', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '0.825rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src={item.image} alt={item.name} style={{ width: '2rem', height: '2rem', borderRadius: '6px', objectFit: 'cover' }} />
                        <span style={{ fontWeight: 600, color: '#2d2b2b' }}>
                          {item.name} <span style={{ color: '#888', fontWeight: 400 }}>× {item.quantity}</span>
                        </span>
                      </div>
                      <span style={{ fontWeight: 700, color: '#d95e68' }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem', paddingTop: '0.4rem', borderTop: '1px dashed #fbcfe8' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Total Order Amount:</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#d95e68' }}>₹{totalPrice}</span>
                </div>
              </div>
            ) : (
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
            )}

            {/* Input Fields */}
            <div>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Sharma"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input-text"
                />
              </div>

              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="ananya@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, hostelAddress: e.target.value })}
                className="form-input-text"
              />
            </div>

            <div>
              <label className="form-label">Customization Notes / Text / Photo Drive Link</label>
              <textarea
                rows={2}
                placeholder="Engrave text, photo link or special instructions..."
                value={formData.customNotes}
                onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                className="form-input-text"
              />
            </div>

            <button type="submit" className="btn-submit-order" disabled={isSubmitting}>
              <Sparkles size={16} />
              <span>{isSubmitting ? "Placing Order..." : "Confirm Order"}</span>
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
