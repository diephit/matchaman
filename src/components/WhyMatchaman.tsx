"use client";

import { Award, Leaf, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyMatchaman() {
  const cards = [
    {
      icon: Award,
      title: "100% Ceremonial Grade",
      description: "Directly imported from the misty hills of Uji, Kyoto. Hand-picked shade-grown tencha leaves, slowly stone-ground to preserve their vibrant green color and rich umami flavor.",
      accent: "from-gold/20 to-gold/5",
      border: "hover:border-gold/30",
    },
    {
      icon: Leaf,
      title: "Ethically & Sustainably Sourced",
      description: "We partner directly with multi-generational family farms in Japan. By committing to fair trade standards, we support pesticide-free agriculture and local farming communities.",
      accent: "from-matcha/20 to-matcha/5",
      border: "hover:border-matcha/30",
    },
    {
      icon: Clock,
      title: "Whisked Fresh to Order",
      description: "No pre-mixes or artificial concentrates. Each tea shot is cold or warm whisked live in front of you at 80°C to activate the natural L-theanine and clean caffeine molecules.",
      accent: "from-cream/10 to-cream/0",
      border: "hover:border-cream/20",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  return (
    <section id="about" className="py-28 bg-charcoal text-cream relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-matcha/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] rounded-full bg-gold/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold font-medium text-xs tracking-widest mb-4 uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Our Philosophy
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl tracking-tight mb-4"
          >
            The Matchaman Commitment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-cream/70 text-base md:text-lg leading-relaxed"
          >
            Bridging age-old Japanese tea ceremonies with contemporary, high-performance daily rituals.
          </motion.p>
        </div>

        {/* Grid cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`glass-dark p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between items-start border border-cream/5 hover:-translate-y-2 transition-all duration-500 group ${card.border}`}
              >
                <div>
                  {/* Icon with custom background gradient */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.accent} flex items-center justify-center mb-8 border border-cream/10 transition-transform duration-500 group-hover:scale-110`}>
                    <IconComponent className="w-6 h-6 text-gold group-hover:text-cream transition-colors duration-300" />
                  </div>

                  <h3 className="font-serif text-2xl font-semibold mb-4 text-cream group-hover:text-gold transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-cream/60 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
                
                <div className="mt-8 text-xs font-bold tracking-widest text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  LEARN MORE →
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
