"use client";

import Image from "next/image";
import { Leaf, Award, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function BrandStory() {
  const highlights = [
    {
      icon: Leaf,
      title: "Direct Shaded Cultivation",
      desc: "Our leaves are shaded for exactly 30 days prior to harvest, stimulating maximum chlorophyll and amino acid production.",
    },
    {
      icon: Award,
      title: "Granular Stone-Milled Uji",
      desc: "Slowly ground using traditional granite wheels to prevent heat friction, keeping the delicate nutrients and flavor intact.",
    },
    {
      icon: Heart,
      title: "Jitter-Free Clean Energy",
      desc: "L-theanine rich tea profile ensures alpha brain wave promotion, bringing a state of calm alert alertness without coffee spikes.",
    },
  ];

  return (
    <section id="about-story" className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Gallery/Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full max-w-[480px] mx-auto rounded-[2.5rem] overflow-hidden shadow-xl border border-charcoal/5">
              <Image
                src="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800"
                alt="Traditional Japanese Matcha Preparation"
                fill
                sizes="(max-w-768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Small floating detail photo overlay */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-8 -left-4 md:-left-8 w-44 h-44 rounded-3xl overflow-hidden border-4 border-cream shadow-2xl hidden md:block"
            >
              <Image
                src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400"
                alt="Close-up of Bamboo Whisk"
                fill
                sizes="176px"
                className="object-cover"
              />
            </motion.div>

            {/* Decorative Gold Leaf Badge */}
            <div className="absolute -top-6 -right-4 glass px-5 py-4 rounded-3xl flex items-center justify-center shadow-lg border border-gold/20">
              <p className="font-serif text-center text-xs text-charcoal tracking-widest font-semibold">
                ESTABLISHED<br />
                <span className="text-base text-gold font-bold">2026</span>
              </p>
            </div>
          </div>

          {/* Right Column: Story Text and Highlights */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="font-serif text-sm italic tracking-widest text-matcha font-semibold block mb-3">
              Our Origin Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-charcoal leading-tight mb-6">
              Tuất Phú Quang. <br />
              dành cho 🌸
            </h2>
            <p className="text-charcoal-light/90 text-sm md:text-base leading-relaxed mb-8">
              Matchaman
            </p>

            {/* Highlights List */}
            <div className="flex flex-col gap-6 w-full">
              {highlights.map((item, idx) => {
                const HighlightIcon = item.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    key={idx}
                    className="flex gap-4 items-start"
                  >
                    <div className="p-3 rounded-xl bg-matcha/10 border border-matcha/20 text-matcha shrink-0">
                      <HighlightIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-charcoal mb-1">
                        {item.title}
                      </h4>
                      <p className="text-charcoal-light text-xs md:text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
