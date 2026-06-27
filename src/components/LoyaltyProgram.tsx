"use client";

import { Sparkles, Trophy, Calendar, Cake } from "lucide-react";
import { motion } from "framer-motion";

export default function LoyaltyProgram() {
  const perks = [
    {
      icon: Trophy,
      title: "10 Points Per $1",
      desc: "Earn points on every tea drink, dessert, or bag of ceremonial whisk tins. Redeem for free signature clouds or artisan plates.",
    },
    {
      icon: Sparkles,
      title: "Exclusive Seasonal Drops",
      desc: "Get first access to limited-run botanical matcha blends (like Lavender Rose Matcha or Yuzu Espresso fusions).",
    },
    {
      icon: Cake,
      title: "Birthday Rewards",
      desc: "Celebrate your day with a complimentary ceremonial drink of choice and a slice of our matcha double-layer cheesecake.",
    },
  ];

  return (
    <section id="rewards" className="py-24 bg-charcoal text-cream relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="glass-dark border border-gold/10 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Promo Info */}
          <div className="lg:w-1/2 flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/20 text-gold font-medium text-xs tracking-widest mb-6 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Circle of Calm
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-cream mb-6 leading-tight">
              Matchaman Rewards
            </h2>
            <p className="text-cream/70 text-sm md:text-base leading-relaxed mb-8">
              Become a member of our holistic tea community. Collect points with each purchase, unlock curated botanical benefits, and receive exclusive invitations to our seasonal tasting sessions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
              <button className="px-8 py-4 rounded-full bg-gold hover:bg-gold-dark text-charcoal font-bold tracking-widest transition-all duration-300 shadow-md hover:shadow-lg text-center text-sm">
                JOIN NOW
              </button>
              <button className="px-8 py-4 rounded-full border border-cream/20 hover:border-cream/40 text-cream font-medium tracking-widest transition-all duration-300 text-center text-sm">
                HOW IT WORKS
              </button>
            </div>
          </div>

          {/* Right Column: Perks List */}
          <div className="lg:w-1/2 flex flex-col gap-6 w-full">
            {perks.map((perk, idx) => {
              const PerkIcon = perk.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  key={idx}
                  className="flex gap-5 p-6 rounded-2xl bg-cream/5 border border-cream/5 hover:border-gold/15 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <PerkIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-cream group-hover:text-gold transition-colors duration-300 mb-1">
                      {perk.title}
                    </h3>
                    <p className="text-cream/60 text-xs md:text-sm leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
