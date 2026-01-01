'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return (
    <div style={{ aspectRatio: '1/1', backgroundColor: '#f5f5f5' }} />
  );

  return (
    <div>
      <div style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#f5f5f5', marginBottom: '1rem', overflow: 'hidden' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <Image
              src={urlFor(images[selectedIndex]).width(1000).height(1000).url()}
              alt="Product Image"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {images.map((img, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedIndex(i)}
            style={{ 
              position: 'relative', 
              width: '80px', 
              height: '80px', 
              flexShrink: 0,
              border: selectedIndex === i ? '2px solid var(--color-primary)' : '2px solid transparent',
              cursor: 'pointer',
              padding: 0,
              background: 'none'
            }}
          >
             <Image
              src={urlFor(img).width(160).height(160).url()}
              alt={`Thumbnail ${i + 1}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
