import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { PRODUCTS, SEARCH_KEYWORDS } from '../data/mockData';
import './SearchBarModal.css';

export default function SearchBarModal({ isOpen, onClose, onSelectProduct, onSelectKeyword }) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = searchTerm.trim() === ''
    ? []
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleKeywordClick = (keyword) => {
    setSearchTerm(keyword);
    onSelectKeyword(keyword);
  };

  const handleProductClick = (product) => {
    onSelectProduct(product);
    onClose();
  };

  return (
    <div className="modal-overlay search-modal-overlay" onClick={onClose}>
      <div className="search-dialog-box" onClick={(e) => e.stopPropagation()}>
        
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={20} className="search-icon-magenta" />
          <input
            ref={inputRef}
            type="text"
            className="search-main-input"
            placeholder="Search gifts, letters, photo frames, cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="search-clear-btn" title="Clear search">
              <X size={16} />
            </button>
          )}
          <button onClick={onClose} className="search-close-btn" title="Close search">
            Esc
          </button>
        </div>

        {/* Popular Keyword Chips */}
        <div className="search-keywords-section">
          <div className="search-keywords-label">
            <Sparkles size={14} color="#d95e68" />
            <span>Popular Keywords:</span>
          </div>
          <div className="search-chips-wrapper">
            {SEARCH_KEYWORDS.map((kw, i) => (
              <button
                key={i}
                onClick={() => handleKeywordClick(kw)}
                className={`search-chip-btn ${searchTerm.toLowerCase() === kw.toLowerCase() ? 'active' : ''}`}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Results List */}
        {searchTerm.trim() !== '' && (
          <div className="search-results-section">
            <h4 className="search-results-title">
              Search Results ({filteredProducts.length})
            </h4>

            {filteredProducts.length > 0 ? (
              <div className="search-results-grid">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="search-product-item"
                    onClick={() => handleProductClick(product)}
                  >
                    <img src={product.image} alt={product.name} className="search-prod-img" />
                    <div className="search-prod-info">
                      <h5 className="search-prod-name">{product.name}</h5>
                      <span className="search-prod-category">{product.category}</span>
                      <span className="search-prod-price">₹{product.price}</span>
                    </div>
                    <button className="search-view-btn">
                      <ShoppingBag size={14} />
                      <span>View</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="search-empty-state">
                <p>No products found matching "{searchTerm}"</p>
                <span className="search-empty-hint">Try searching for "letters", "gift cards", or "photo frame"</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
