'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';
import styles from './Header.module.css';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { toggleCart, cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
          <div style={{ position: 'relative', width: '120px', height: '60px' }}>
            <Image 
              src="/images/logo.jpg" 
              alt="Yesanda Logo" 
              fill
              style={{ objectFit: 'contain', objectPosition: 'left' }}
              priority
            />
          </div>
        </Link>
        
        <nav className={styles.nav}>
          {/* Desktop & Mobile Menu wrapper */}
          <div className={`${styles.linksContainer} ${isMenuOpen ? styles.open : ''}`}>
            <Link href="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>La Marque</Link>
            <Link href="/collections" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Collections</Link>
            <Link href="/bespoke" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Sur-Mesure</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={toggleCart} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}>
              <ShoppingBag size={24} color="#1A1A1A" />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: 'var(--color-accent)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
            
            <button className={styles.menuBtn} onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
