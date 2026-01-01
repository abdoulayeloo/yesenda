'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = product.images || [];

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1500); // Change every 1.5s
    } else {
      setCurrentImageIndex(0); // Reset on mouse leave
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <Link 
      href={`/products/${product.slug}`}
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ 
        position: 'relative', 
        aspectRatio: '1/1', // Square aspect ratio
        marginBottom: '1rem',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden'
      }}>
        {images.length > 0 ? (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <Image
                src={urlFor(images[currentImageIndex]).width(600).height(600).url()}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
            No Image
          </div>
        )}
      </div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
        {product.name}
      </h3>
      <p style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>
        {product.price?.toLocaleString('fr-FR')} FCFA
      </p>
    </Link>
  );
}
