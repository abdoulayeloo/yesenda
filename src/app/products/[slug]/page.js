import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import AddToCart from "@/components/cart/AddToCart";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

async function getProduct(slug) {
  return client.fetch(`*[_type == "product" && slug.current == $slug][0]`, {
    slug,
  });
}

import ProductGallery from "@/components/product/ProductGallery";

// Generate metadata for the product page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Produit Introuvable",
      description: "Le produit que vous cherchez n'existe pas.",
    };
  }

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(1200).height(630).url()
    : null;

  return {
    title: product.name,
    description: product.description
      ? product.description.substring(0, 160)
      : `Découvrez ${product.name} chez Yesanda.`,
    openGraph: {
      title: `${product.name} | Yesanda`,
      description: product.description
        ? product.description.substring(0, 160)
        : `Prix: ${product.price?.toLocaleString("fr-FR")} FCFA`,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Gallery */}
        <ProductGallery images={product.images} />

        {/* Info */}
        <div>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>
            {product.price?.toLocaleString("fr-FR")} FCFA
          </p>

          <div className={styles.description}>{product.description}</div>

          <AddToCart product={product} />

          <div className={styles.extraInfo}>
            <p>
              Ce modèle est réalisé sur commande. Les délais de confection
              varient entre 2 et 3 semaines.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
