import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuOrderSection, type MenuTab } from './components/MenuOrderSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { LocationFooterSection } from './components/LocationFooterSection';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { CartDrawer } from './components/CartDrawer';
import type { CartItem } from './data/acaiteriaData';

const CART_STORAGE_KEY = 'acaiteria_cart_v1';

function loadInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [menuTab, setMenuTab] = useState<MenuTab>('destaques');
  const [cartItems, setCartItems] = useState<CartItem[]>(loadInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [focusNoteForId, setFocusNoteForId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartItems]);

  const handleOpenBuilder = () => {
    setMenuTab('montar');
    const target = document.getElementById('cardapio');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === newItem.cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === newItem.cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleUpdateItemNotes = (cartItemId: string, notes: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, notes } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenCartForNote = (cartItemId?: string) => {
    setFocusNoteForId(cartItemId || null);
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
    setFocusNoteForId(null);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#1A0B24] text-[#bef264]">
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => handleOpenCartForNote()}
        />
        <main>
          <HeroSection onOpenBuilder={handleOpenBuilder} />
          <MenuOrderSection
            activeTab={menuTab}
            onTabChange={setMenuTab}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onOpenCart={handleOpenCartForNote}
          />
          <GallerySection />
          <TestimonialsSection />
          <FaqSection />
          <LocationFooterSection />
        </main>
        <FloatingWhatsAppButton />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={handleCloseCart}
          items={cartItems}
          focusNoteForId={focusNoteForId}
          onUpdateQuantity={handleUpdateQuantity}
          onUpdateItemNotes={handleUpdateItemNotes}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      </div>
    </MotionConfig>
  );
}
