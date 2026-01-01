import Link from 'next/link';
import Button from '../ui/Button';
import styles from './Header.module.css';

export default function Header() {
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
          
          <Button href="/contact" variant="primary">
            Prendre RDV
          </Button>
        </nav>
      </div>
    </header>
  );
}
