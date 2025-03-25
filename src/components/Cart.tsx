
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Product } from './ProductCard';
import { cn } from '@/lib/utils';

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // In a real app, we would fetch the cart items from a state management solution or API
  // This is just a placeholder implementation
  useEffect(() => {
    // Mock cart data - in a real app this would come from a state manager or API
    if (isOpen && cartItems.length === 0) {
      // Simulate loading cart items when opened
      const mockCartItems: CartItem[] = [];
      setCartItems(mockCartItems);
    }
  }, [isOpen]);
  
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const removeItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };
  
  const subtotal = cartItems.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}
      
      {/* Cart Sidebar */}
      <div 
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-xl",
          "transform transition-transform duration-300 ease-out-expo",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-medium flex items-center">
              <ShoppingBag size={18} className="mr-2" />
              Shopping Bag
              {cartItems.length > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                </span>
              )}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <ShoppingBag size={48} className="text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Your bag is empty</p>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added anything to your bag yet.
                </p>
                <Link
                  to="/products"
                  className="bg-black text-white font-medium px-6 py-2.5 rounded-sm hover:bg-black/90 transition-colors"
                  onClick={onClose}
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 py-4 border-b border-border">
                    <Link to={`/product/${item.product.slug}`} onClick={onClose} className="shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-20 h-24 object-cover bg-secondary"
                      />
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div>
                          <Link 
                            to={`/product/${item.product.slug}`}
                            onClick={onClose}
                            className="font-medium text-sm hover:underline line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.product.brand}
                          </p>
                          {item.size && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                        
                        <p className="text-sm font-medium">
                          ₹{item.product.price.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-input rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 py-1 text-sm min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-secondary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1.5 text-muted-foreground hover:text-black transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-border">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                to="/checkout"
                className="w-full bg-black text-white font-medium p-3 rounded-sm flex items-center justify-center hover:bg-black/90 transition-colors"
                onClick={onClose}
              >
                Checkout
              </Link>
              <button
                onClick={onClose}
                className="w-full text-center mt-3 py-2 text-sm hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
