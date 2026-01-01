import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import FeaturedCollections from '@/components/home/FeaturedCollections';

import Testimonials from '@/components/home/Testimonials';
import VisitUs from '@/components/home/VisitUs';

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <FeaturedCollections />
      <Testimonials />
      <VisitUs />
    </main>
  );
}
