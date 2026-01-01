'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  if (cart.length === 0) {
    return (
      <main style={{ padding: '8rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Votre panier est vide</h1>
        <Button href="/collections" variant="secondary" style={{ marginTop: '2rem' }}>
          Retourner à la boutique
        </Button>
      </main>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format message for WhatsApp
    let message = `*Nouvelle Commande Yesanda*\n\n`;
    message += `*Client*: ${formData.name}\n`;
    message += `*Téléphone*: ${formData.phone}\n`;
    message += `*Adresse*: ${formData.address}\n\n`;
    message += `*Commande*:\n`;
    
    cart.forEach(item => {
      message += `- ${item.name} (x${item.quantity}) - ${item.size ? item.size : 'Standard'}\n`;
    });
    
    message += `\n*Total*: ${cartTotal.toLocaleString('fr-FR')} FCFA\n`;
    if (formData.notes) message += `\n*Note*: ${formData.notes}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/221775850866?text=${encodedMessage}`;

    // Ideally, we might want to save the order to Sanity here before redirecting
    // For now, simpler flow:
    
    clearCart();
    window.open(whatsappUrl, '_blank');
    router.push('/checkout/success');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main style={{ padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          Validation de la commande
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          {/* Form */}
          <div>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Vos coordonnées</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nom complet</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '2px' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Téléphone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '2px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Adresse de livraison</label>
                <textarea 
                  name="address" 
                  required 
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '2px' }}
                />
              </div>

              <Button type="submit" variant="primary">
                Confirmer sur WhatsApp
              </Button>
            </form>
          </div>

          {/* Summary */}
          <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '2px', height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Récapitulatif</h2>
            <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
              {cart.map(item => (
                <li key={`${item._id}-${item.size}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                  <div>
                    <span style={{ fontWeight: '600' }}>{item.name}</span>
                    <br/>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>x{item.quantity} {item.size && `(${item.size})`}</span>
                  </div>
                  <span>{(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '1rem' }}>
              <span>Total</span>
              <span>{cartTotal.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '1rem', textAlign: 'center' }}>
              Le paiement se fera à la livraison ou par transfert mobile money après confirmation.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
