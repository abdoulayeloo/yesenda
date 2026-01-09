import { client } from '@/sanity/client';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';

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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await client.fetch(`*[_type == "category" && slug.current == $slug][0]{ title, description }`, { slug });

  if (!category) {
    return {
      title: 'Catégorie Introuvable'
    };
  }

  return {
    title: category.title,
    description: category.description || `Découvrez notre collection ${category.title}.`,
    openGraph: {
      title: `${category.title} | Collections Yesanda`,
      description: category.description || `Explorez nos modèles de type ${category.title}.`,
    },
  };
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
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
