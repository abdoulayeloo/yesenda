import Button from '@/components/ui/Button';

export default function CheckoutSuccessPage() {
  return (
    <main style={{ padding: '8rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '2rem', color: 'green' }}>
        Commande envoyée !
      </h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '3rem', lineHeight: '1.6' }}>
        Merci pour votre confiance. Vous devriez avoir été redirigé vers WhatsApp pour finaliser votre commande avec notre équipe.<br/>
        Nous vous répondrons dans les plus brefs délais.
      </p>
      <Button href="/" variant="primary">
        Retour à l'accueil
      </Button>
    </main>
  );
}
