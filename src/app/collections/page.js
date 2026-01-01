import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/product/ProductCard';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

async function getCategoriesWithProducts() {
  return client.fetch(`*[_type == "category"]{
    _id,
    title,
    "slug": slug.current,
    description,
    "products": *[_type == "product" && references(^._id)][0...4] {
      _id,
      name,
      "slug": slug.current,
      price,
      images
    }
  }`);
}

export default async function CollectionsPage() {
  const categories = await getCategoriesWithProducts();

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

      {categories.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', opacity: 0.7 }}>
          Aucune catégorie trouvée.
        </p>
      ) : (
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {categories.map((category) => (
             category.products && category.products.length > 0 && (
              <section key={category._id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>
                    {category.title}
                  </h2>
                  <Link 
                    href={`/collections/${category.slug}`}
                    style={{ textDecoration: 'underline', color: 'var(--color-primary)' }}
                  >
                    Voir tout
                  </Link>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                  gap: '2rem',
                }}>
                  {category.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </section>
             )
          ))}
        </div>
      )}
    </main>
  );
}
