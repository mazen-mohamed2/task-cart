"use client";
import { createContext, useContext, useState } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  updateCart: (item: Item, quantity: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cart, setCart] = useState<Item[]>([]);

  const addToCart = (item: Item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item: Item) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const updateCart = (item: Item, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}
