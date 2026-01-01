'use client';

import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';
import Image from 'next/image';
import { urlFor } from '@/sanity/image';
import Button from '../ui/Button';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartDrawer() {
  const { cart, isOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`} 
        onClick={toggleCart} 
      />
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>Panier</h2>
          <button onClick={toggleCart} className={styles.closeParams}><X /></button>
        </div>

        <div className={styles.body}>
          {cart.length === 0 ? (
            <div className={styles.empty}>
              <p>Votre panier est vide.</p>
              <Button onClick={toggleCart} href="/collections" variant="secondary" style={{ marginTop: '1rem' }}>
                Explorer la boutique
              </Button>
            </div>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={`${item._id}-${item.size}`} className={styles.item}>
                  <div className={styles.itemImage}>
                    {item.images?.[0] && (
                       <Image
                         src={urlFor(item.images[0]).width(200).url()}
                         alt={item.name}
                         fill
                         style={{ objectFit: 'cover' }}
                       />
                    )}
                  </div>
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemMeta}>
                      {item.size && `Taille: ${item.size}`}<br/>
                      {item.price?.toLocaleString('fr-FR')} FCFA
                    </p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className={styles.quantityControls}>
                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item._id, item.size)} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span>Total</span>
              <span>{cartTotal.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <Button href="/checkout" variant="primary" style={{ width: '100%' }} onClick={toggleCart}>
              Commander via WhatsApp
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
