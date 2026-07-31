import React from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS, OCCASIONS } from '../data/mockData';
import './ProductGrid.css';

export default function ProductGrid({ 
  selectedCategory, 
  setSelectedCategory,
  onOrderNow, 
  onAddToCart,
  onQuickView 
}) {
  const categoriesList = [
    { id: 'all', name: 'All Products' },
    ...OCCASIONS.filter(o => o.id !== 'all')
  ];

  const filteredProducts = selectedCategory === 'all' 
    ?  PRODUCTS.filter(p => p.isPersonalized || p.category === 'personalized' || ['vintageletters', 'photoframe', 'photocards', 'birthdaybook', 'pencilart'].includes(p.category))
      : PRODUCTS.filter(p => p.category === selectedCategory);

  
  
  
  return (
    <section id="products-catalog" className="bestsellers-section">
      
      {/* Header */}
      <div className="bestsellers-header-row">
        <div>
          <h2 className="section-main-title">OUR HANDCRAFTED PRODUCTS</h2>
          <div className="title-heart-accent">♡</div>
        </div>
      </div>

      {/* Occasion Categories Filter Bar */}
      <div className="products-category-tabs">
        {categoriesList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`cat-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid of Product Cards */}
      <div className="bestsellers-grid-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrderNow={onOrderNow}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem' }}>
            <p style={{ fontSize: '1rem', color: 'var(--neutral-muted)' }}>No products found in this category.</p>
            <button 
              onClick={() => setSelectedCategory('all')} 
              style={{ marginTop: '0.5rem', color: 'var(--coral-pink)', fontWeight: 700 }}
            >
              Show All Products
            </button>
          </div>
        )}
      </div>

    </section>
  );
}
