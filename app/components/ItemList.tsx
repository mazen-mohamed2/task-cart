"use client"

import { useState } from 'react';
import { useCart } from '../cartContext';

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


export default function ItemList({ initialItems }:{initialItems:Item[]}) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const { addToCart } = useCart() as Cart ;

  const filteredItems = initialItems
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => (minPrice === '' || item.price >= parseFloat(minPrice)))
    .filter((item) => (maxPrice === '' || item.price <= parseFloat(maxPrice)))
    .sort((a, b) => {
      if (sortOption === 'price') {
        return a.price - b.price;
      }
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <main className='grid lg:grid-cols-5 md:grid-cols-5 grid-cols-1 gap-8 my-10'>
      <section className='flex flex-col md:col-span-2 lg:col-span-1 space-y-3 bg-violet-900 bg-opacity-15 px-3 py-3 rounded'>
        <h3>Filters</h3>
      <input 
        type="text" 
        placeholder="Search items" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <div className='flex  gap-2'>
      <input 
        type="number" 
        placeholder="Min price" 
        value={minPrice} 
        onChange={(e) => setMinPrice(e.target.value)} 
        className='price_range'
      />
      <input 
        type="number" 
        placeholder="Max price" 
        value={maxPrice} 
        onChange={(e) => setMaxPrice(e.target.value)} 
        className='price_range'
      />
      </div>
      <select  onChange={(e) => setSortOption(e.target.value)}
      className='cursor-pointer'
      >
        <option >Sort by</option>
        <option value="">Nothing</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
      </section>
      <section className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 md:col-span-3 lg:col-span-4'>
        {filteredItems.map((item) => (
          <div key={item.id}>
            <div className='border border-indigo-900 rounded-lg p-3 '>
            <h2 className='text-2xl font-semibold capitalize font-mono'>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <button onClick={() => addToCart(item)}
            className='bg-indigo-900 py-1 px-3 w-full mt-3 rounded hover:bg-indigo-950 transition-all ease-in-out '
            >Add to Cart</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
