
import { useState } from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Cart } from './Cart';
import { ShoppingBag } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      
      <Footer />
      
      {/* Cart */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      
      {/* Floating cart button (mobile) */}
      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 p-4 bg-black text-white rounded-full shadow-lg md:hidden z-20"
        aria-label="Open shopping bag"
      >
        <ShoppingBag size={20} />
      </button>
    </div>
  );
};
