
import { X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const { items, removeItem, updateQuantity, getTotal } = useCart();
  const { user } = useAuth();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Cart Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 transform transition-transform duration-300 ease-out shadow-lg",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Cart Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-medium">Your Cart</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-grow overflow-auto py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <button 
                  onClick={onClose}
                  className="bg-black text-white px-4 py-2 rounded-sm hover:bg-black/90 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4 px-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex border-b pb-4">
                    <div className="w-20 h-24 bg-secondary flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Remove item"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex border border-border">
                          <button
                            onClick={() => item.quantity > 1 && updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        <p className="font-medium">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>₹{getTotal().toLocaleString()}</span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              
              <div className="grid gap-2">
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="bg-black text-white py-3 text-center font-medium hover:bg-black/90 transition-colors"
                >
                  Checkout
                </Link>
                
                {!user && (
                  <p className="text-sm text-center text-muted-foreground">
                    You'll need to{' '}
                    <Link to="/auth" onClick={onClose} className="text-primary underline">
                      sign in
                    </Link>{' '}
                    to complete your purchase
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
