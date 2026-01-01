import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import Image from 'next/image';
import AddToCart from '@/components/cart/AddToCart';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getProduct(slug) {
  return client.fetch(`*[_type == "product" && slug.current == $slug][0]`, {
    slug
  });
}

import ProductGallery from '@/components/product/ProductGallery';

// Generate metadata for the product page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Produit Introuvable',
      description: 'Le produit que vous cherchez n\'existe pas.'
    };
  }

  const imageUrl = product.images?.[0] 
    ? urlFor(product.images[0]).width(1200).height(630).url() 
    : null;

  return {
    title: product.name,
    description: product.description ? product.description.substring(0, 160) : `Découvrez ${product.name} chez Yesanda.`,
    openGraph: {
      title: `${product.name} | Yesanda`,
      description: product.description ? product.description.substring(0, 160) : `Prix: ${product.price?.toLocaleString('fr-FR')} FCFA`,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params; // Await params in newer Next.js versions if needed, or simply access properties
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main style={{ padding: '8rem 2rem' }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '4rem'
      }}>
        {/* Gallery */}
        <ProductGallery images={product.images} />

        {/* Info */}
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem' }}>
            {product.name}
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--color-accent)', marginBottom: '2rem' }}>
            {product.price?.toLocaleString('fr-FR')} FCFA
          </p>
          
          <div style={{ marginBottom: '2rem', lineHeight: '1.6', color: 'var(--color-secondary)' }}>
            {product.description}
          </div>

          <AddToCart product={product} />
          
          <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#888' }}>
            <p>Ce modèle est réalisé sur commande. Les délais de confection varient entre 2 et 3 semaines.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
