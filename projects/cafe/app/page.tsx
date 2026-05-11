import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutStrip from "@/components/AboutStrip";
import Menu from "@/components/Menu";
import Reservation from "@/components/Reservation";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <AboutStrip />
      <Menu />
      <Reservation />
      <Testimonials />
      <Footer />
    </main>
  );
}
