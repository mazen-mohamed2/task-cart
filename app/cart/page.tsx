"use client";
import { useCart } from '../cartContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
  updateCart: (item: Item, quantity: number) => void;
}

export default function CartPage() {
  const { cart, removeFromCart, updateCart } = useCart() as Cart;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(calculatedTotal);
  }, [cart]);

  const handleIncrement = (item: Item) => {
    updateCart(item, item.quantity + 1);
  };

  const handleDecrement = (item: Item) => {
    if (item.quantity > 1) {
      updateCart(item, item.quantity - 1);
    } else {
      removeFromCart(item);
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout with total price: $" + totalPrice);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className='my-9'>Your cart is empty. <Link href="/" className='text-indigo-500 hover:text-indigo-800'>Go back to shopping</Link></p>
      ) : (
        <section className='space-y-5 my-9'>
          {cart.map((item: Item) => (
            <div className='border flex justify-between items-center hover:bg-indigo-900 hover:bg-opacity-15 border-indigo-900 rounded-lg p-3' key={item.id}>
              <div>
                <h2 className='text-2xl font-semibold capitalize font-mono'>{item.name}</h2>
                <p>{item.description}</p>
                <p>${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div>
                  <button 
                    className='bg-indigo-900 py-1 px-3 self-end mt-3 rounded hover:bg-indigo-950 transition-all ease-in-out mr-2'
                    onClick={() => handleIncrement(item)}>+</button>
                  <button 
                    className='bg-indigo-900 py-1 px-3 self-end mt-3 rounded hover:bg-indigo-950 transition-all ease-in-out'
                    onClick={() => handleDecrement(item)}>-</button>
                </div>
              </div>
              <button 
                className='bg-indigo-900 py-1 px-3 self-end mt-3 rounded hover:bg-indigo-950 transition-all ease-in-out'
                onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))}
          <div className='flex justify-between items-center mt-9'>
            <h2 className='text-2xl font-semibold capitalize font-mono'>Total Price: ${totalPrice}</h2>
            <button 
              className='bg-green-500 py-2 px-4 rounded hover:bg-green-700 transition-all ease-in-out'
              onClick={handleCheckout}>Checkout</button>
          </div>
        </section>
      )}
    </div>
  );
}
