import type { Reward } from '../types';

const REWARD_KEY = 'matchaman.reward.v1';

function isReward(value: unknown): value is Reward {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const reward = value as Reward;
  return (
    typeof reward.voucherCode === 'string' &&
    typeof reward.quote === 'string' &&
    typeof reward.claimedAt === 'number' &&
    typeof reward.expiresAt === 'number'
  );
}

export function getStoredReward(): Reward | null {
  try {
    const raw = window.localStorage.getItem(REWARD_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    return isReward(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function canClaimNewReward(now = Date.now()): boolean {
  const reward = getStoredReward();
  return !reward || reward.expiresAt <= now;
}

export function saveReward(reward: Reward): void {
  window.localStorage.setItem(REWARD_KEY, JSON.stringify(reward));
}
