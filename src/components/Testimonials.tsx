"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
  initials: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Elena Rostova",
      role: "Creative Director",
      rating: 5,
      text: "The Strawberry Matcha Cloud is an absolute masterpiece. I've tried matcha in Kyoto and Paris, but the layered sweet cream foam here is completely unmatched. It has become my daily morning ritual.",
      initials: "ER",
    },
    {
      id: 2,
      name: "Kaito Tanaka",
      role: "Software Engineer",
      rating: 5,
      text: "I love the clean, zen design of the cafe, but the matcha quality is what keeps me coming back. Whisking it fresh to order instead of pre-sweetening makes a massive difference. Highly authentic flavor profile.",
      initials: "KT",
    },
    {
      id: 3,
      name: "Chloe Martinez",
      role: "Wellness Blogger",
      rating: 5,
      text: "A serene sanctuary in the middle of Soho. The Matcha Coconut Fusion is incredibly refreshing post-workout, and their commitment to 100% direct-trade ceremonial matcha is something I truly appreciate.",
      initials: "CM",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-matcha/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-gold/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif text-sm italic tracking-widest text-matcha font-semibold block mb-3">
            Atelier Reviews
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-charcoal mb-4">
            Loved by Our Community
          </h2>
          <p className="text-charcoal-light text-base md:text-lg">
            Hear from our guests about their moments of calm and authentic taste experiences at Matchaman.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              key={t.id}
              className="p-8 md:p-10 rounded-[2.5rem] bg-cream border border-charcoal/5 hover:border-matcha/20 shadow-sm hover:shadow-[0_20px_40px_rgba(107,142,35,0.04)] flex flex-col justify-between items-start transition-all duration-500 relative group"
            >
              {/* Quote icon overlay */}
              <Quote className="absolute top-8 right-8 w-12 h-12 text-matcha/5 pointer-events-none group-hover:scale-110 transition-transform duration-500" />
              
              <div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-charcoal-light/95 italic text-sm md:text-base leading-relaxed mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* User Meta */}
              <div className="flex items-center gap-4 pt-6 border-t border-charcoal/5 w-full">
                {/* Avatar Initial Circle */}
                <div className="w-11 h-11 rounded-full bg-matcha/10 border border-matcha/20 flex items-center justify-center font-serif text-sm font-bold text-matcha uppercase select-none">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-charcoal leading-none mb-1">
                    {t.name}
                  </h4>
                  <p className="text-xs text-charcoal/50 font-medium">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
