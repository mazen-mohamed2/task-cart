"use client";
import React from 'react';
import Link from 'next/link';
import './globals.css';
import { CartProvider, useCart } from './cartContext';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Cart {
  cart: Item[]; 
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  
}

function CartIcon() {
  const { cart } = useCart() as Cart;
  return (
    <div className=" fixed top-6  right-6 bg-indigo-700 p-1 bg-opacity-30 rounded-md shadow-lg">
      <Link href="/cart">
        🛒  <span className=' text-white rounded-full py-[1px] px-1 '>{cart.length}</span>
      </Link>
    </div>
  );
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>
        <CartProvider>
          <CartIcon />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

