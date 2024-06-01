import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemList from '../app/components/ItemList';
import { CartProvider } from '../app/cartContext';

describe('ItemList Component', () => {
  const items = [
    { id: 1, name: 'Item 1', description: 'Description 1', price: 10, quantity: 1 },
    { id: 2, name: 'Item 2', description: 'Description 2', price: 20, quantity: 1 },
    { id: 3, name: 'Item 3', description: 'Description 3', price: 15, quantity: 1 },
  ];

  it('renders items correctly', () => {
    render(
      <CartProvider>
        <ItemList initialItems={items} />
      </CartProvider>
    );

    items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
    });
  });

  it('filters items based on search input', () => {
    render(
      <CartProvider>
        <ItemList initialItems={items} />
      </CartProvider>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search items'), { target: { value: 'Item 1' } });

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search items'), { target: { value: '' } });

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('sorts items by price', () => {
    render(
      <CartProvider>
        <ItemList initialItems={items} />
      </CartProvider>
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'price' } });

    const sortedItemsByPrice = screen.getAllByText(/Item/);
    expect(sortedItemsByPrice[0]).toHaveTextContent('Item 1');
    expect(sortedItemsByPrice[1]).toHaveTextContent('Item 3');
    expect(sortedItemsByPrice[2]).toHaveTextContent('Item 2');
  });

  it('sorts items by name', () => {
    render(
      <CartProvider>
        <ItemList initialItems={items} />
      </CartProvider>
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'name' } });

    const sortedItemsByName = screen.getAllByText(/Item/);
    expect(sortedItemsByName[0]).toHaveTextContent('Item 1');
    expect(sortedItemsByName[1]).toHaveTextContent('Item 2');
    expect(sortedItemsByName[2]).toHaveTextContent('Item 3');
  });
});
