'use client';

import Image from 'next/image';
import Button from '../ui/Button';
import styles from './FeaturedCollections.module.css';
import { motion } from 'framer-motion';

const CollectionCard = ({ title, description, image, link, delay }) => (
  <motion.div
    className={styles.card}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <div className={styles.imageWrapper}>
      <Image
        src={image}
        alt={title}
        fill
        style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
        className="hover-zoom" // We can add global util or inline style for hover scale if needed, or simple CSS module hover
      />
    </div>
    <div className={styles.cardContent}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>
      <Button href={link} variant="outline">
        Découvrir
      </Button>
    </div>
  </motion.div>
);

export default function FeaturedCollections() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <CollectionCard
            title="Sur-Mesure"
            description="L'essence même de Yesanda. Votre tenue unique, imaginée et créée pour vous."
            image="/images/bespoke.png"
            link="/bespoke"
            delay={0}
          />
          <CollectionCard
            title="Prêt-à-Porter"
            description="Nos collections capsules : casual chic, tenues de soirée et pièces intemporelles."
            image="/images/rtw.png"
            link="/collections"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
