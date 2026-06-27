"use client";

import { motion } from "framer-motion";

interface LeafProps {
  delay: number;
  initialX: string;
  initialY: string;
  duration: number;
  scale: number;
  rotateDirection: number;
}

const Leaf = ({ delay, initialX, initialY, duration, scale, rotateDirection }: LeafProps) => {
  return (
    <motion.div
      className="absolute pointer-events-none select-none opacity-20 md:opacity-30 z-0"
      style={{
        left: initialX,
        top: initialY,
      }}
      initial={{ y: 0, rotate: 0, x: 0 }}
      animate={{
        y: [0, -120, -240, -360, -480],
        x: [0, 30, -30, 20, -20, 0].map((v) => v * (scale * 1.5)),
        rotate: [0, 90 * rotateDirection, 180 * rotateDirection, 270 * rotateDirection, 360 * rotateDirection],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
      }}
    >
      <svg
        width={36 * scale}
        height={36 * scale}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 22C2 22 6 18 12 18C18 18 22 22 22 22C22 22 20 14 16 8C12 2 12 2 12 2C12 2 12 2 8 8C4 14 2 22 2 22Z"
          fill="#6B8E23"
        />
        <path
          d="M12 2V18"
          stroke="#4F6B1A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 8C12 8 15 10 16 11"
          stroke="#4F6B1A"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M12 12C12 12 9 13 8 14"
          stroke="#4F6B1A"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

export default function LeafDecorations() {
  // Positioning them across different vertical sections (top values)
  const leaves = [
    { delay: 0, initialX: "10%", initialY: "20%", duration: 25, scale: 0.8, rotateDirection: 1 },
    { delay: 4, initialX: "85%", initialY: "35%", duration: 30, scale: 1.2, rotateDirection: -1 },
    { delay: 8, initialX: "25%", initialY: "50%", duration: 28, scale: 0.6, rotateDirection: 1 },
    { delay: 12, initialX: "75%", initialY: "65%", duration: 22, scale: 0.9, rotateDirection: -1 },
    { delay: 16, initialX: "45%", initialY: "80%", duration: 35, scale: 1.1, rotateDirection: 1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map((leaf, index) => (
        <Leaf key={index} {...leaf} />
      ))}
    </div>
  );
}
