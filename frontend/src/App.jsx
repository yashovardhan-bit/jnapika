import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import OccasionsSection from './components/OccasionsSection';
import ProductGrid from './components/ProductGrid';
import OfferBanner from './components/OfferBanner';
import ReviewsSection from './components/ReviewsSection';
import InstagramGallery from './components/InstagramGallery';
import Footer from './components/Footer';

import OrderModal from './components/OrderModal';
import QuickViewModal from './components/QuickViewModal';
import AuthModal from './components/AuthModal';
import WishlistDrawer from './components/WishlistDrawer';
import CartDrawer from './components/CartDrawer';

import { STORE_INFO, PRODUCTS } from './data/mockData';
import { MessageCircle } from 'lucide-react';
import './App.css';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('jnapika_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('jnapika_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem('jnapika_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeModal, setActiveModal] = useState(null); // 'order' | 'quickview' | 'auth'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('jnapika_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('jnapika_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('jnapika_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('jnapika_orders', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      showToast(`Added "${product.name}" to wishlist ❤️`);
    }
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to cart 🛒`);
  };

  const handleUpdateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart cleared');
  };

  const handleOpenOrder = (product) => {
    setSelectedProduct(product);
    setActiveModal('order');
  };

  const handleOpenQuickView = (product) => {
    setSelectedProduct(product);
    setActiveModal('quickview');
  };

  const handleCustomOrderClick = () => {
    setSelectedProduct(PRODUCTS[0]);
    setActiveModal('order');
  };

  const handleOrderPlaced = (newOrder) => {
    setOrderHistory([newOrder, ...orderHistory]);
    showToast('Order generated! Please complete sending via WhatsApp.');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('jnapika_user', JSON.stringify(userData));
    showToast(`Welcome back, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('jnapika_user');
    showToast('Signed out successfully.');
    setActiveModal(null);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-wrapper">
      
      {/* Navigation Header */}
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={(catId) => {
          setSelectedCategory(catId);
          document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenAuth={() => setActiveModal('auth')}
        onOpenCustomOrder={handleCustomOrderClick}
        user={user}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        <HeroBanner
          onExploreClick={() => {
            setSelectedCategory('all');
            document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onCustomOrderClick={handleCustomOrderClick}
        />

        <OccasionsSection
          selectedCategory={selectedCategory}
          setSelectedCategory={(catId) => {
            setSelectedCategory(catId);
            document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <ProductGrid
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onOrderNow={handleOpenOrder}
          onAddToCart={handleAddToCart}
          onQuickView={handleOpenQuickView}
        />

        <OfferBanner onCustomOrderClick={handleCustomOrderClick} />

        <ReviewsSection />

        <InstagramGallery />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomOrder={handleCustomOrderClick}
      />

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${STORE_INFO.ownerWhatsApp}?text=Hi%20Jnapika!%20I%20want%20to%20order%20a%20customized%20gift.`}
        target="_blank"
        rel="noreferrer"
        className="float-whatsapp-button"
        title="Direct WhatsApp Chat with Owner"
      >
        <MessageCircle size={24} />
      </a>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-popup">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      <OrderModal
        isOpen={activeModal === 'order'}
        onClose={() => setActiveModal(null)}
        product={selectedProduct}
        onOrderPlaced={handleOrderPlaced}
        user={user}
      />

      <QuickViewModal
        isOpen={activeModal === 'quickview'}
        onClose={() => setActiveModal(null)}
        product={selectedProduct}
        onOrderNow={handleOpenOrder}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <AuthModal
        isOpen={activeModal === 'auth'}
        onClose={() => setActiveModal(null)}
        user={user}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        orderHistory={orderHistory}
        wishlist={wishlist}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist(wishlist.filter((w) => w.id !== id))}
        onOrderNow={handleOpenOrder}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOpenOrderModal={handleOpenOrder}
        user={user}
      />

    </div>
  );
}
