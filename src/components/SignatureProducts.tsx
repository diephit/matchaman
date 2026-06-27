"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Flame, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { products, type Product } from "@/data/products";

export default function SignatureProducts() {
  const [filter, setFilter] = useState<"all" | "drinks" | "desserts">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) {
        setColumns(3);
      } else if (window.innerWidth >= 768) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const handleFilterChange = (cat: "all" | "drinks" | "desserts") => {
    setFilter(cat);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(
    (product) => filter === "all" || product.category === filter
  );

  const pageSize = columns * 2;
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const adjustedCurrentPage = Math.min(currentPage, totalPages || 1);

  const paginatedProducts = filteredProducts.slice(
    (adjustedCurrentPage - 1) * pageSize,
    adjustedCurrentPage * pageSize
  );

  return (
    <section id="menu" className="py-24 bg-cream-dark/10 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-matcha/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif text-sm italic tracking-widest text-matcha font-semibold block mb-3">
            Handcrafted Menu
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-charcoal mb-4">
            Our Signature Creations
          </h2>
          <p className="text-charcoal-light text-base md:text-lg">
            Meticulously prepared beverages and artisanal desserts made with single-origin, direct-trade ceremonial green tea.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center items-center gap-4 mb-16">
          {(["all", "drinks", "desserts"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                filter === cat
                  ? "bg-matcha text-cream shadow-md"
                  : "bg-cream border border-charcoal/10 hover:border-matcha text-charcoal hover:text-matcha"
              }`}
            >
              {cat === "all" ? "All Craft" : cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {paginatedProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={product.id}
                className="group bg-cream rounded-[2.25rem] border border-charcoal/5 hover:border-matcha/20 hover:shadow-[0_20px_40px_rgba(107,142,35,0.08)] overflow-hidden flex flex-col justify-between transition-all duration-500"
              >
                {/* Image section */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-dark/20">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Glassmorphic badging */}
                  {product.isPopular && (
                    <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                      <Flame className="w-3.5 h-3.5 text-gold" />
                      <span className="text-[10px] font-bold tracking-wider text-charcoal uppercase">Popular</span>
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-matcha px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                      <Sparkles className="w-3.5 h-3.5 text-cream" />
                      <span className="text-[10px] font-bold tracking-wider text-cream uppercase">Seasonal</span>
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-charcoal group-hover:text-matcha transition-colors duration-300 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-charcoal-light/80 text-xs md:text-sm leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-charcoal/5">
                    <span className="font-serif text-lg md:text-xl font-bold text-matcha">
                      {product.price}
                    </span>
                    <button
                      className="w-10 h-10 rounded-full bg-charcoal hover:bg-matcha text-cream flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-105 shadow-sm"
                      aria-label={`Add ${product.name} to order`}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Switch */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16">
            <div className="glass px-4 py-2.5 rounded-full flex items-center gap-4 shadow-md border border-matcha/10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={adjustedCurrentPage === 1}
                className="p-1.5 rounded-full hover:bg-cream-dark text-charcoal disabled:opacity-40 disabled:hover:bg-transparent transition-all duration-300 cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  const isActive = pageNum === adjustedCurrentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`relative px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                        isActive ? "text-cream" : "text-charcoal/70 hover:text-charcoal"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activePageBg"
                          className="absolute inset-0 bg-matcha rounded-full -z-10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={adjustedCurrentPage === totalPages}
                className="p-1.5 rounded-full hover:bg-cream-dark text-charcoal disabled:opacity-40 disabled:hover:bg-transparent transition-all duration-300 cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
