"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const currentProduct = products[index];
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-cream-dark/30 via-cream to-cream"
    >
      {/* Dynamic Background Accents */}
      <div className="absolute top-1/4 left-[-10%] w-[35rem] h-[35rem] rounded-full bg-matcha/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[35rem] h-[35rem] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full z-10">
        {/* Left Column: Premium Text */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-matcha/10 border border-matcha/20 text-matcha font-medium text-xs tracking-widest mb-6 uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Specialty Matcha Atelier
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-charcoal leading-[1.05] mb-6"
          >
            Experience Matcha, <br />
            <span className="text-matcha relative">
              Reimagined.
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-gold/30 -z-10 rounded-full" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-charcoal-light text-lg md:text-xl font-normal max-w-xl leading-relaxed mb-8"
          >
            Ceremonial-grade Japanese matcha crafted for modern lifestyles. Quietly harvested, stone-ground, and prepared fresh daily.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#menu"
              className="px-8 py-4 rounded-full bg-matcha hover:bg-matcha-dark text-cream font-medium tracking-widest transition-all duration-300 shadow-md hover:shadow-lg text-center flex items-center justify-center gap-2 group"
            >
              EXPLORE MENU
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#menu"
              className="px-8 py-4 rounded-full border-2 border-matcha/30 hover:border-matcha text-matcha hover:bg-matcha/5 font-medium tracking-widest transition-all duration-300 text-center"
            >
              ORDER ONLINE
            </a>
          </motion.div>
          
          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-charcoal/10 w-full"
          >
            <div>
              <p className="font-serif text-3xl font-bold text-matcha">100%</p>
              <p className="text-xs text-charcoal/60 tracking-wider mt-1">Uji Ceremonial</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-matcha">0g</p>
              <p className="text-xs text-charcoal/60 tracking-wider mt-1">Refined Sugar</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-matcha">Fresh</p>
              <p className="text-xs text-charcoal/60 tracking-wider mt-1">Whisked Daily</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Floating Premium Beverage Image */}
        <div
          className="lg:col-span-5 flex justify-center items-center relative min-h-[350px] md:min-h-[500px] w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Circular glow backdrop */}
          <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-tr from-matcha/20 to-gold/20 blur-[50px] -z-10" />
          
          {/* Geometric gold accent circle */}
          <div className="absolute w-[240px] h-[240px] md:w-[350px] md:h-[350px] rounded-full border border-gold/30 animate-spin-slow -z-10" />

          {/* Beverage container */}
          <div className="relative w-full max-w-[280px] md:max-w-[380px] flex justify-center h-[360px] md:h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute w-[280px] h-[360px] md:w-[380px] md:h-[480px] drop-shadow-[0_20px_35px_rgba(107,142,35,0.25)]"
              >
                {/* Floating motion wrapper */}
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    priority
                    sizes="(max-w-768px) 280px, 380px"
                    className="object-contain rounded-[2rem]"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Decorative Tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 right-2 md:bottom-12 md:right-0 glass px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg z-20"
            >
              <div className="w-3 h-3 rounded-full bg-gold animate-pulse" />
              <div>
                <p className="text-xs text-charcoal/50 font-medium">
                  {currentProduct.isNew ? "Seasonal Craft" : currentProduct.isPopular ? "Popular Choice" : "Signature Menu"}
                </p>
                <p className="text-sm text-charcoal font-bold font-serif">{currentProduct.name}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider controls (Arrows) */}
          <div className="absolute left-[-20px] lg:left-[-40px] top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <button
              onClick={() => setIndex((prev) => (prev - 1 + products.length) % products.length)}
              className="w-10 h-10 rounded-full glass border border-charcoal/10 flex items-center justify-center text-charcoal hover:bg-matcha hover:text-cream transition-all duration-300 hover:scale-105 cursor-pointer"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute right-[-20px] lg:right-[-40px] top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <button
              onClick={() => setIndex((prev) => (prev + 1) % products.length)}
              className="w-10 h-10 rounded-full glass border border-charcoal/10 flex items-center justify-center text-charcoal hover:bg-matcha hover:text-cream transition-all duration-300 hover:scale-105 cursor-pointer"
              aria-label="Next product"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === i ? "w-6 bg-matcha" : "w-2 bg-charcoal/20 hover:bg-charcoal/40"
                }`}
                aria-label={`Go to product ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
