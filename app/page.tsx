import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import About from '@/components/About';
import Academics from '@/components/Academics';
import Departments from '@/components/Departments';
import Admissions from '@/components/Admissions';
import NewsEvents from '@/components/NewsEvents';
import Gallery from '@/components/Gallery';
import StaffDirectory from '@/components/StaffDirectory';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import MobileBar from '@/components/MobileBar';
import JsonLd from '@/components/JsonLd';

// Rebuilt hourly, and immediately whenever staff publish from the portal.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Academics />
        <Departments />
        <Admissions />
        <NewsEvents />
        <Gallery />
        <StaffDirectory />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
      <MobileBar />
    </>
  );
}
