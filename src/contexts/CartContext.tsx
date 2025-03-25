import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { Product } from "@/components/ProductCard";

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size: string) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "klassico_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Load cart from localStorage on mount or when user changes
  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error parsing cart data", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number, size: string) => {
    setItems((currentItems) => {
      // Check if item already exists
      const existingItemIndex = currentItems.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      // If it exists, update quantity
      if (existingItemIndex !== -1) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success(`Updated quantity in cart`);
        return updatedItems;
      }

      // Otherwise add new item
      toast.success(`Added to cart`);
      return [...currentItems, { product, quantity, size }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((currentItems) => {
      const updatedItems = currentItems.filter(
        (item) => item.product.id !== productId
      );
      toast.success(`Removed from cart`);
      return updatedItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    toast.success(`Cart cleared`);
  };

  const getTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
