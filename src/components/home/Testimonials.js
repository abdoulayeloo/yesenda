import styles from './Testimonials.module.css';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Aïssatou D.",
    text: "Une expérience incroyable. La robe sur-mesure pour mon mariage civil était tout simplement parfaite. L'équipe a su écouter mes envies.",
    rating: 5
  },
  {
    id: 2,
    name: "Sophie M.",
    text: "J'adore la collection prêt-à-porter ! Les coupes sont élégantes et les tissus d'une qualité rare à Dakar. Je recommande vivement.",
    rating: 5
  },
  {
    id: 3,
    name: "Fatou B.",
    text: "Le service client est irréprochable. On se sent vraiment unique chez Yesanda. Merci pour ce professionnalisme.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Elles nous font confiance</h2>
        <div className={styles.grid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.card}>
              <div className={styles.stars}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" style={{ display: 'inline-block', marginRight: 2 }} />
                ))}
              </div>
              <p className={styles.quote}>&ldquo;{review.text}&rdquo;</p>
              <p className={styles.author}>{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
