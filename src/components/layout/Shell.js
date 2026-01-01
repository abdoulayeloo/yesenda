'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

import CartDrawer from '../cart/CartDrawer';

export default function Shell({ children }) {
  const pathname = usePathname();
  // Check if we are in the studio route
  const isStudio = pathname?.startsWith('/studio');

  return (
    <>
      {!isStudio && <Header />}
      {!isStudio && <CartDrawer />}
      {children}
      {!isStudio && <Footer />}
    </>
  );
}
