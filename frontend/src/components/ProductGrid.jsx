import React from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/mockData';
import './ProductGrid.css';

export default function ProductGrid({ 
  selectedCategory, 
  onOrderNow, 
  onQuickView 
}) {
  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <section id="products-catalog" className="bestsellers-section">
      
      {/* Header */}
      <div className="bestsellers-header-row">
        <h2 className="section-main-title">BEST SELLERS</h2>
        <div className="title-heart-accent">♡</div>

        <a href="#all-products" className="view-all-link">
          <span>View All</span>
          <span>→</span>
        </a>
      </div>

      {/* Grid of 6 Cards */}
      <div className="bestsellers-grid-container">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOrderNow={onOrderNow}
            onQuickView={onQuickView}
          />
        ))}
      </div>

    </section>
  );
}
