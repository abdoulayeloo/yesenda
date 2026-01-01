import Button from '../ui/Button';
import styles from './VisitUs.module.css';

export default function VisitUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.infoContent}>
          <h2>Nous rendre visite</h2>
          
          <div className={styles.infoBlock}>
            <h3>Adresse</h3>
            <p>Rue OKM 188<br />Dakar 12300, Sénégal</p>
          </div>

          <div className={styles.infoBlock}>
            <h3>Horaires</h3>
            <p>Mardi - Samedi: 12h - 20h<br />Dimanche - Lundi: Fermé</p>
            <p style={{ fontSize: '0.8rem', fontStyle: 'italic', marginTop: '0.5rem' }}>* Susceptibles d&apos;être ajustés</p>
          </div>

          <div className={styles.infoBlock}>
            <h3>Contact</h3>
            <p>+221 77 585 08 66</p>
          </div>

          <Button href="/contact" variant="primary">
            Nous Contacter
          </Button>
        </div>

        <div className={styles.mapWrapper}>
          {/* Placeholder for Google Maps Embed */}
          <p>Carte Interactive (Google Maps)</p>
        </div>
      </div>
    </section>
  );
}
