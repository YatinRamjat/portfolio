import Link from "next/link";
import { Globe, Camera, X, Video, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  shop: [
    { name: "Kurtas", href: "/products?category=kurtas" },
    { name: "Sarees", href: "/products?category=sarees" },
    { name: "Lehengas", href: "/products?category=lehengas" },
    { name: "Sherwanis", href: "/products?category=sherwanis" },
    { name: "Fusion Wear", href: "/products?category=fusion-wear" },
    { name: "Accessories", href: "/products?category=accessories" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press", href: "#" },
  ],
  help: [
    { name: "Contact Us", href: "#" },
    { name: "Shipping & Returns", href: "#" },
    { name: "Size Guide", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Track Order", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Refund Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: X, href: "#", label: "Twitter" },
  { icon: Video, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80 paisley-bg-dark">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span
                className="text-2xl font-bold text-saffron"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                ThreadsWala
              </span>
            </Link>
            <p className="mt-2 text-sm text-white/60">
              Desi Style, Delivered Fast
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-saffron" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-saffron" />
                <span>hello@threadswala.in</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-saffron" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-saffron hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-saffron"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-saffron"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Help
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-saffron"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-saffron"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        {/* Payment Methods & Copyright */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} ThreadsWala. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40">We accept:</span>
            <div className="flex items-center gap-3">
              {/* UPI */}
              <div className="flex h-8 items-center rounded bg-white/10 px-3 text-xs font-semibold text-white/70">
                UPI
              </div>
              {/* Visa */}
              <div className="flex h-8 items-center rounded bg-white/10 px-3 text-xs font-semibold text-white/70">
                VISA
              </div>
              {/* Mastercard */}
              <div className="flex h-8 items-center rounded bg-white/10 px-3 text-xs font-semibold text-white/70">
                MC
              </div>
              {/* Razorpay */}
              <div className="flex h-8 items-center rounded bg-white/10 px-3 text-xs font-semibold text-saffron">
                Razorpay
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
