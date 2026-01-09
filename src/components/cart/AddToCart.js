'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Button from '../ui/Button';

export default function AddToCart({ product }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    // Basic validation if sizes were implemented directly in schema, usually helpful
    setIsAdding(true);
    addToCart(product, 1, size || 'Standard');
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* If sizes existed in schema, we'd map them here */}

      <Button onClick={handleAdd} variant="primary" style={{ marginTop: '1rem' }}>
        {isAdding ? <span style={{ marginRight: '0.5rem', animation: 'spin 0.5s linear infinite'}}></span> : 'Ajouter au panier'}
      </Button>
    </div>
  );
}
