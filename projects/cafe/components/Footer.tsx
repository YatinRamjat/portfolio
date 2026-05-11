"use client";

import { Coffee, Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-espresso text-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <Coffee className="w-10 h-10 text-saffron" />
              <span className="font-serif text-3xl font-bold tracking-tight">Chai & Chowk</span>
            </div>
            <p className="text-cream/60 leading-relaxed max-w-xs">
              Bringing the vibrant spirit of Indian streets to your table. Artisan chai, 
              fusion bites, and a warm neighborhood vibe in Pune.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram className="w-5 h-5" />, href: "#" },
                { icon: <Facebook className="w-5 h-5" />, href: "#" },
                { icon: <Coffee className="w-5 h-5" />, href: "#" }, // Placeholder for Zomato
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-saffron hover:border-saffron hover:text-espresso transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-8 text-saffron">Quick Links</h4>
            <ul className="space-y-4 font-medium text-cream/80">
              <li><Link href="#menu" className="hover:text-saffron transition-colors">Digital Menu</Link></li>
              <li><Link href="#reserve" className="hover:text-saffron transition-colors">Book a Table</Link></li>
              <li><Link href="#about" className="hover:text-saffron transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-saffron transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl font-bold mb-8 text-saffron">Find Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="w-6 h-6 text-saffron shrink-0" />
                <span className="text-cream/60 leading-relaxed">
                  12, Moledina Road, <br />
                  Koregaon Park, Pune – 411001
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-saffron shrink-0" />
                <span className="text-cream/60">Mon–Sun: 8:00 AM – 10:30 PM</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-saffron shrink-0" />
                <span className="text-cream/60">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-saffron shrink-0" />
                <span className="text-cream/60">hello@chaichowk.in</span>
              </li>
            </ul>
          </div>

          {/* Map Placeholder */}
          <div className="relative group overflow-hidden rounded-3xl h-[300px] lg:h-auto">
            <div className="absolute inset-0 bg-saffron/10 group-hover:bg-saffron/5 transition-colors z-10 pointer-events-none" />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.965551234567!2d73.88!3d18.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMyJzI0LjAiTiA3M8KwNTInNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890" 
              className="w-full h-full border-0 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-cream/40 text-sm font-bold tracking-widest uppercase text-center md:text-left">
            © 2024 Chai & Chowk · Made with ☕ in Pune
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-[0.2em] text-cream/40">
            <Link href="#" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-cream transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
