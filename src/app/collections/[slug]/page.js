import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getData(slug) {
  const category = await client.fetch(`*[_type == "category" && slug.current == $slug][0]{
    _id,
    title,
    description
  }`, { slug });

  if (!category) return null;

  const products = await client.fetch(`*[_type == "product" && references($id)] {
    _id,
    name,
    "slug": slug.current,
    price,
    images
  }`, { id: category._id });

  return { category, products };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data) {
    notFound();
  }

  const { category, products } = data;

  return (
    <main style={{ padding: '8rem 2rem' }}>
       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '3rem', 
            marginBottom: '1rem' 
          }}>
            {category.title}
          </h1>
          {category.description && (
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-secondary)', lineHeight: '1.6' }}>
              {category.description}
            </p>
          )}
        </header>

        {products.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.2rem', opacity: 0.7 }}>
            Aucun produit dans cette catégorie pour le moment.
          </p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '3rem',
          }}>
            {products.map((product) => (
              <Link 
                key={product._id} 
                href={`/products/${product.slug}`}
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ 
                  position: 'relative', 
                  aspectRatio: '3/4', 
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
      </div>
    </main>
  );
}
