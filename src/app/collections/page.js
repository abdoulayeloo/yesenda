import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import Link from 'next/link';
import Image from 'next/image';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

async function getProducts() {
  return client.fetch(`*[_type == "product"]{
    _id,
    name,
    "slug": slug.current,
    price,
    images
  }`);
}

export default async function CollectionsPage() {
  const products = await getProducts();

  return (
    <main style={{ padding: '8rem 2rem' }}>
      <h1 style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '3rem', 
        textAlign: 'center', 
        marginBottom: '4rem' 
      }}>
        Nos Collections
      </h1>

      {products.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', opacity: 0.7 }}>
          Aucun produit disponible pour le moment.
        </p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '3rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {products.map((product) => (
            <Link 
              key={product._id} 
              href={`/products/${product.slug}`}
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ 
                position: 'relative', 
                height: '400px', 
                marginBottom: '1rem',
                backgroundColor: '#f5f5f5',
                overflow: 'hidden'
              }}>
                {product.images?.[0] && (
                  <Image
                    src={urlFor(product.images[0]).width(600).url()}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                    className="hover-zoom"
                  />
                )}
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                {product.name}
              </h2>
              <p style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>
                {product.price?.toLocaleString('fr-FR')} FCFA
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
