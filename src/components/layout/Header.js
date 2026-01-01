import Link from 'next/link';
import Button from '../ui/Button';
import styles from './Header.module.css';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { toggleCart, cartCount } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Yesanda
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/about" className={styles.navLink}>La Marque</Link>
          <Link href="/collections" className={styles.navLink}>Collections</Link>
          <Link href="/bespoke" className={styles.navLink}>Sur-Mesure</Link>
          
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
        </nav>
      </div>
    </header>
  );
}
