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
import SearchBarModal from './components/SearchBarModal';
import AboutUsModal from './components/AboutUsModal';
import ContactUsModal from './components/ContactUsModal';
import Toast from './components/Toast';

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
  
  // Dialog States
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Toast Notification State: { text: string, type: 'cart' | 'wishlist' | 'order' }
  const [toast, setToast] = useState(null);
  
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

  const showToast = (text, type = 'info') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3200);
  };

  const handleToggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist`, 'wishlist');
    } else {
      setWishlist([...wishlist, product]);
      showToast(`Added "${product.name}" to wishlist`, 'wishlist');
    }
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, customNotes: product.customNotes || item.customNotes }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to cart`, 'cart');
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
    showToast('Item removed from cart', 'cart');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart cleared', 'cart');
  };

  const handleOpenOrder = (product) => {
    setSelectedProduct(product);
    setActiveModal('order');
  };

  const handleOpenQuickView = (product) => {
    setSelectedProduct(product);
    setActiveModal('quickview');
  };

  const handlePersonalizedGiftsClick = () => {
    setSelectedCategory('vintageletters');
    const el = document.getElementById('products-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast('Showing Personalized Gifts & Custom Keepsakes', 'info');
  };

  const handleOrderPlaced = (newOrder) => {
    setOrderHistory([newOrder, ...orderHistory]);
    showToast('Order generated! Send via WhatsApp now.', 'order');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('jnapika_user', JSON.stringify(userData));
    showToast(`Welcome back, ${userData.name}!`, 'info');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('jnapika_user');
    showToast('Logged out successfully.', 'info');
    setActiveModal(null);
  };

  const handleKeywordSearch = (keyword) => {
    setSearchQuery(keyword);
    setSelectedCategory('all');
    setSearchOpen(false);
    const el = document.getElementById('products-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
        onOpenCustomOrder={handlePersonalizedGiftsClick}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAbout={() => setAboutOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        user={user}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        <HeroBanner
          onExploreClick={() => {
            setSelectedCategory('all');
            document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onCustomOrderClick={handlePersonalizedGiftsClick}
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

        <OfferBanner onCustomOrderClick={handlePersonalizedGiftsClick} />

        <ReviewsSection />

        <InstagramGallery />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCustomOrder={handlePersonalizedGiftsClick}
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

      {/* Popup Notification Toast (White background, black text, green tick & icon at bottom) */}
      <Toast toast={toast} />

      {/* Modals & Dialogs */}
      <SearchBarModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectKeyword={handleKeywordSearch}
        onSelectProduct={(product) => {
          setSearchOpen(false);
          handleOpenQuickView(product);
        }}
      />

      <AboutUsModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        onExploreProducts={() => {
          setSelectedCategory('all');
          document.getElementById('products-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <ContactUsModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

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
