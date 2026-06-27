"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#about" },
    { name: "Stores", href: "#stores" },
    { name: "Rewards", href: "#rewards" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-matcha flex items-center justify-between p-1.5 transition-transform duration-300 group-hover:rotate-12">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-cream" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12M12 18V6M6 12H18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-serif text-xl tracking-[0.2em] font-bold text-charcoal group-hover:text-matcha transition-colors duration-300">
              MATCHAMAN
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-charcoal hover:text-matcha tracking-wider transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-matcha hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#menu"
              className="px-6 py-2.5 rounded-full bg-matcha hover:bg-matcha-dark text-cream font-medium text-sm tracking-widest shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              ORDER NOW
            </a>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="#menu"
              className="p-2 rounded-full bg-matcha text-cream hover:bg-matcha-dark transition-colors shadow"
              aria-label="Order Now"
            >
              <ShoppingBag className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-charcoal hover:text-matcha transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-md lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-cream p-8 shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-8 mt-16">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-matcha flex items-center justify-center text-cream">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12M12 18V6M6 12H18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="font-serif text-lg tracking-[0.2em] font-bold text-charcoal">
                    MATCHAMAN
                  </span>
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-charcoal hover:text-matcha tracking-wider transition-colors duration-300"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="#menu"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 text-center rounded-full bg-matcha hover:bg-matcha-dark text-cream font-medium tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  ORDER ONLINE
                </a>
                <p className="text-center text-xs text-charcoal/50">
                  © {new Date().getFullYear()} Matchaman. All rights reserved.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
