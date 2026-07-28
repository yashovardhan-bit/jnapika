import React from 'react';
import { Star, ShoppingBag, ShoppingCart } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ 
  product, 
  onOrderNow, 
  onAddToCart,
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
        {product.offerBadge && (
          <span className="card-badge-pill">{product.offerBadge}</span>
        )}
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

        <div className="card-price-row">
          <span className="price-bold-text">₹{product.price}</span>
          {product.originalPrice && (
            <span className="original-price-text">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Both Order Now and Add to Cart Action Options */}
        <div className="card-actions-row">
          <button 
            onClick={() => onOrderNow(product)} 
            className="btn-card-order-now"
            title="Order Now"
          >
            <ShoppingBag size={14} />
            <span>Order Now</span>
          </button>

          <button 
            onClick={() => onAddToCart(product)} 
            className="btn-card-add-cart"
            title="Add to Cart"
          >
            <ShoppingCart size={14} />
            <span>Cart</span>
          </button>
        </div>

      </div>

    </div>
  );
}
