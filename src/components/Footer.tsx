"use client";

import { useState } from "react";
import { Send, Compass, ChevronRight } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="bg-charcoal text-cream border-t border-cream/5 pt-20 pb-12 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-matcha/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Section: Newsletter Subscribe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-cream/10 items-center">
          <div className="lg:col-span-6 max-w-lg">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-3">
              Join the Matcha Circle
            </h3>
            <p className="text-cream/60 text-sm md:text-base leading-relaxed">
              Subscribe to receive seasonal beverage releases, exclusive recipes, and early invitations to community workshops.
            </p>
          </div>

          <div className="lg:col-span-6 w-full">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-matcha/10 border border-matcha/20 text-gold font-serif italic text-center">
                Thank you. You have joined the circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-cream/5 border border-cream/10 focus:border-gold px-6 py-4 rounded-full text-sm placeholder-cream/40 focus:outline-none flex-grow transition-all duration-300"
                />
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold-dark text-charcoal font-bold tracking-widest px-8 py-4 rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group shrink-0"
                >
                  SUBSCRIBE
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Section: Footer Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-matcha flex items-center justify-center text-cream">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12M12 18V6M6 12H18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-serif text-lg tracking-[0.2em] font-bold text-cream">
                MATCHAMAN
              </span>
            </div>
            <p className="text-cream/60 text-xs md:text-sm leading-relaxed max-w-sm">
              Meticulously sourcing, grinding, and preparing premium ceremonial-grade Japanese matcha. Bridging age-old rituals with modern daily wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-serif text-lg font-semibold text-cream">
              Atelier Links
            </h4>
            <nav className="flex flex-col gap-3">
              {["Home", "Menu", "About", "Stores", "Rewards", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-cream/60 hover:text-gold text-xs md:text-sm tracking-wider flex items-center gap-1.5 transition-colors duration-300 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-gold/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Opening Hours */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="font-serif text-lg font-semibold text-cream">
              Opening Hours
            </h4>
            <ul className="flex flex-col gap-3 text-cream/60 text-xs md:text-sm leading-relaxed">
              <li>
                <span className="font-bold text-cream">Kyoto Atelier:</span><br/>
                09:00 AM - 06:00 PM Daily
              </li>
              <li>
                <span className="font-bold text-cream">Soho Sanctuary:</span><br/>
                07:30 AM - 08:00 PM Mon-Sun
              </li>
              <li>
                <span className="font-bold text-cream">Tokyo Oasis:</span><br/>
                08:00 AM - 08:00 PM Daily
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="font-serif text-lg font-semibold text-cream">
              Get in Touch
            </h4>
            <ul className="flex flex-col gap-3 text-cream/60 text-xs md:text-sm">
              <li>
                <a href="mailto:contact@matchaman.co" className="hover:text-gold transition-colors">
                  contact@matchaman.co
                </a>
              </li>
              <li>
                <a href="tel:+12125550199" className="hover:text-gold transition-colors">
                  +1 (212) 555-0199
                </a>
              </li>
              <li className="mt-4 flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-cream/5 hover:bg-gold hover:text-charcoal transition-all duration-300" aria-label="Instagram">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-cream/5 hover:bg-gold hover:text-charcoal transition-all duration-300" aria-label="Facebook">
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-cream/5 hover:bg-gold hover:text-charcoal transition-all duration-300" aria-label="Pinterest">
                  <Compass className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-cream/10 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-cream/40 text-[11px] font-medium tracking-wider">
          <p>© {new Date().getFullYear()} MATCHAMAN CO. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Accessibility Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
