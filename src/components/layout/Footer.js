import Link from 'next/link';
import Image from 'next/image';
import { Instagram, MapPin, Phone } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div style={{ position: 'relative', width: '150px', height: '80px', marginBottom: '1rem' }}>
            <Image 
              src="/images/logo.jpg" 
              alt="Yesanda Logo" 
              fill
              style={{ objectFit: 'contain', objectPosition: 'left' }}
            />
          </div>
          <p className={styles.mission}>
            L&apos;élégance du sur-mesure au cœur de Dakar.
            Élégance simple et raffinée pour la femme moderne.<br />
            Créations uniques et Prêt-à-porter.
          </p>
        </div>

        <div className={styles.column}>
          <h3>Découvrir</h3>
          <ul className={styles.linkList}>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/collections">Collections</Link></li>
            <li><Link href="/bespoke">Sur-Mesure</Link></li>
            <li><Link href="/about">Notre Histoire</Link></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Contact & Boutique</h3>
          <div className={styles.contactInfo}>
            <p className={styles.linkList}>
              <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <MapPin size={16} /> Rue OKM 188, Dakar 12300, Sénégal
              </span>
            </p>
            <p className={styles.linkList}>
              <a href="tel:+221775850866" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={16} /> +221 77 585 08 66
              </a>
            </p>
            <p>
              Mardi - Samedi: 12h - 20h<br />
              Dimanche - Lundi: Fermé
            </p>
          </div>
        </div>

        <div className={styles.column}>
          <h3>Suivez-nous</h3>
          <ul className={styles.linkList}>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Instagram size={18} /> Instagram
              </a>
            </li>
            {/* Add TikTok if icon available or fallback text */}
            <li><a href="#">TikTok</a></li>
          </ul>
        </div>
      </div>
      
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Yesanda. Tous droits réservés.
      </div>
    </footer>
  );
}
