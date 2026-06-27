"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Store {
  id: number;
  name: string;
  location: string;
  address: string;
  hours: string;
  image: string;
}

export default function StoreExperience() {
  const stores: Store[] = [
    {
      id: 1,
      name: "Kyoto Higashiyama Atelier",
      location: "Kyoto, Japan",
      address: "2-chōme-211-1 Kiyomizu, Higashiyama Ward",
      hours: "09:00 AM - 06:00 PM Daily",
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      name: "Soho Matcha Sanctuary",
      location: "New York, USA",
      address: "134 Greene St, New York, NY 10012",
      hours: "07:30 AM - 07:00 PM Mon-Fri, 08:30 AM - 08:00 PM Sat-Sun",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      name: "Tokyo Daikanyama Oasis",
      location: "Tokyo, Japan",
      address: "19-4 Sarugakuchō, Shibuya City",
      hours: "08:00 AM - 08:00 PM Daily",
      image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const [activeStore, setActiveStore] = useState<number>(0);

  return (
    <section id="stores" className="py-24 bg-cream-dark/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="font-serif text-sm italic tracking-widest text-matcha font-semibold block mb-3">
              Physical Spaces
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-charcoal">
              Step Into Our Sanctuary
            </h2>
            <p className="text-charcoal-light/95 text-base md:text-lg mt-4 leading-relaxed">
              Our locations are designed as architectural escapes—featuring warm timber elements, clean off-white concrete, local green flora, and ambient acoustics.
            </p>
          </div>
          
          {/* Location tab selectors */}
          <div className="flex flex-wrap gap-2 lg:mb-2">
            {stores.map((store, idx) => (
              <button
                key={store.id}
                onClick={() => setActiveStore(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeStore === idx
                    ? "bg-matcha text-cream shadow-md"
                    : "bg-cream text-charcoal hover:bg-cream-dark border border-charcoal/10"
                }`}
              >
                {store.location}
              </button>
            ))}
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 md:p-12 rounded-[2.5rem] bg-cream border border-charcoal/5 shadow-sm">
            <div className="flex flex-col gap-6">
              <motion.div
                key={activeStore}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-xs font-bold text-matcha tracking-widest uppercase bg-matcha/10 px-3 py-1 rounded-full border border-matcha/20">
                  {stores[activeStore].location}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mt-6 mb-4">
                  {stores[activeStore].name}
                </h3>
                
                {/* Details list */}
                <div className="flex flex-col gap-4 text-charcoal-light mt-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <p className="text-sm font-medium leading-relaxed">
                      {stores[activeStore].address}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <p className="text-sm font-medium leading-relaxed">
                      {stores[activeStore].hours}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="pt-8 border-t border-charcoal/5 mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-matcha hover:text-matcha-dark transition-all duration-300 group"
              >
                GET DIRECTIONS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Big Zoomable Image Showcase */}
          <div className="lg:col-span-7 relative h-[350px] md:h-[500px] rounded-[2.5rem] overflow-hidden group shadow-lg border border-charcoal/5">
            <motion.div
              key={activeStore}
              initial={{ scale: 1.05, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={stores[activeStore].image}
                alt={stores[activeStore].name}
                fill
                sizes="(max-w-1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>
            
            {/* Visual Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-8 text-cream pointer-events-none">
              <p className="text-xs font-bold tracking-widest opacity-80 uppercase">Matchaman Atmosphere</p>
              <p className="font-serif text-lg font-bold">Zen Architecture & Cozy Interiors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
