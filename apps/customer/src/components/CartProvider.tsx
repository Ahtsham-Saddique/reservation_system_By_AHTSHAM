"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";

export interface CartItem {
  id: string;
  itemModel: 'hotel' | 'bus' | 'tour' | 'flight';
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  selectedDate?: string;
  selectedTime?: string;
  details?: any;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const getCartKey = () => {
    if (!user?.id) return null;
    return `ecotravel_cart_${user.id}`;
  };

  useEffect(() => {
    if (authLoading) return;
    const cartKey = getCartKey();
    if (cartKey) {
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart");
        }
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
    setIsLoaded(true);
  }, [user?.id, authLoading]);

  useEffect(() => {
    if (isLoaded) {
      const cartKey = getCartKey();
      if (cartKey) {
        localStorage.setItem(cartKey, JSON.stringify(cart));
      }
    }
  }, [cart, isLoaded, user?.id]);

  const addToCart = (item: CartItem) => {
    if (!user?.id) {
      console.warn("Please log in to add items to cart");
      return;
    }
    setCart((prev) => {
      const existing = prev.find(i => i.itemId === item.itemId);
      if (existing) {
        return prev.map(i => i.itemId === item.itemId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    const cartKey = getCartKey();
    if (cartKey) {
      localStorage.removeItem(cartKey);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
