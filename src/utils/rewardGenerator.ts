import { quotes } from '../data/quotes';
import { vouchers } from '../data/vouchers';
import type { Reward } from '../types';

const DAY_MS = 24 * 60 * 60 * 1000;

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function generateReward(now = Date.now()): Reward {
  return {
    voucherCode: pickRandom(vouchers).code,
    quote: pickRandom(quotes),
    claimedAt: now,
    expiresAt: now + DAY_MS,
  };
}
