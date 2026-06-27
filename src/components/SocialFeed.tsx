"use client";

import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";

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

interface SocialPost {
  id: number;
  image: string;
  likes: string;
  comments: string;
}

export default function SocialFeed() {
  const posts: SocialPost[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=600",
      likes: "1.2k",
      comments: "84",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
      likes: "945",
      comments: "42",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600",
      likes: "2.1k",
      comments: "153",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=600",
      likes: "1.8k",
      comments: "98",
    },
  ];

  return (
    <section className="py-24 bg-cream-dark/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-serif text-sm italic tracking-widest text-matcha font-semibold block mb-3">
            Social Circle
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-charcoal mb-4">
            Moments of Calm
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-matcha hover:text-matcha-dark transition-all duration-300 group"
          >
            <InstagramIcon className="w-4 h-4" />
            @MATCHAMAN.CO
          </a>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square w-full rounded-[2rem] overflow-hidden group shadow-sm border border-charcoal/5 block"
            >
              <Image
                src={post.image}
                alt="Matchaman Instagram Social Post"
                fill
                sizes="(max-w-768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Interaction Overlay */}
              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-cream">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-cream" />
                  <span className="font-semibold text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 fill-cream" />
                  <span className="font-semibold text-sm">{post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
