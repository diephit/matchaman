/**
 * Utility functions for the Matchaman First-Time Visitor Welcome Gift Experience
 */

export function generateVoucherCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `MATCHA-${code}`;
}

export function getRandomDiscount(): number {
  const discounts = [5, 10, 20];
  return discounts[Math.floor(Math.random() * discounts.length)];
}

const quotes = [
  "Every cup tells a story.",
  "Take a sip. Slow down. Enjoy.",
  "Freshly whisked happiness awaits.",
  "Matcha is not just a drink, it's a moment.",
  "Crafted with tradition, served with passion.",
  "Good days begin with good matcha.",
  "The perfect pause in a busy day.",
  "Where Japanese tradition meets modern taste."
];

export function getRandomQuote(): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function isFirstVisit(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("matchaman_first_visit_completed") !== "true";
}

export function completeFirstVisit(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("matchaman_first_visit_completed", "true");
  }
}
