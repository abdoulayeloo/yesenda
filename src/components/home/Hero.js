'use client';

import Image from 'next/image';
import Button from '../ui/Button';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className={styles.section}>
      {/* Background Image */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Image
          src="/images/hero-bg.png"
          alt="Yesanda Collection Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </div>

      {/* Overlay */}
      <div className={styles.backgroundOverlay}></div>

      {/* Content */}
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h1 className={styles.title}>
          Yesanda – L&apos;Art du Sur-Mesure
        </h1>
        <p className={styles.subtitle}>
          Créez des tenues uniques qui révèlent votre élégance. 
          Entre tradition et modernité.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button href="/collections" variant="primary">
            Découvrir la collection
          </Button>
          <Button href="/contact" variant="outline">
            Prendre Rendez-vous
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
