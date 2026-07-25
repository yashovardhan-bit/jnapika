import React from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ 
  product, 
  onOrderNow, 
  onQuickView
}) {
  return (
    <div className="bestseller-card-item">
      
      {/* Product Image */}
      <div className="card-image-box" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-element"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="card-details-box">
        <h3 className="card-title-text" onClick={() => onQuickView(product)}>
          {product.name}
        </h3>

        <div className="stars-rating-line">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} className="star-icon-filled" fill="#f5a623" color="#f5a623" />
          ))}
          <span style={{ marginLeft: '0.2rem' }}>({product.reviewsCount})</span>
        </div>

        <div className="card-price-action-line">
          <span className="price-bold-text">₹{product.price}</span>
          <button 
            onClick={() => onOrderNow(product)} 
            className="btn-add-cart-circle"
            title="Add to Cart / Order"
          >
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>

    </div>
  );
}
