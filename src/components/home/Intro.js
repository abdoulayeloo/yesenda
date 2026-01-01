import styles from './Intro.module.css';

export default function Intro() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>À Propos de Yesanda</span>
        <h2 className={styles.title}>
          Une passion pour la mode, un engagement pour l&apos;excellence.
        </h2>
        <p className={styles.description}>
          Chez Yesanda, nous croyons que chaque vêtement doit raconter une histoire : la vôtre. 
          Située au cœur de Dakar, notre boutique célèbre l&apos;artisanat et la féminité à travers des créations uniques et sur-mesure. 
          Que ce soit pour une grande occasion ou pour le quotidien, nous façonnons des pièces qui subliment votre silhouette avec une élégance intemporelle.
        </p>
        <span className={styles.signature}>Yesanda</span>
      </div>
    </section>
  );
}
