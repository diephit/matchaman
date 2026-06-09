import { useEffect, useMemo, useState } from 'react';
import { AsmrVideoSection } from './components/AsmrVideoSection';
import { GiftBox } from './components/GiftBox';
import { RewardSection } from './components/RewardSection';
import { SecretMenu } from './components/SecretMenu';
import { Toast } from './components/Toast';
import type { Reward } from './types';
import { generateReward } from './utils/rewardGenerator';
import { canClaimNewReward, getStoredReward, saveReward } from './utils/rewardStorage';

function App() {
  const [reward, setReward] = useState<Reward | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [toast, setToast] = useState('');

  const hasActiveReward = useMemo(() => reward !== null && reward.expiresAt > Date.now(), [reward]);

  useEffect(() => {
    const stored = getStoredReward();
    if (stored && !canClaimNewReward()) {
      setReward(stored);
    }
  }, []);

  function showToast(message: string) {
    setToast(message);
  }

  function handleOpenGift() {
    if (isOpening) {
      return;
    }

    const stored = getStoredReward();
    if (stored && !canClaimNewReward()) {
      setReward(stored);
      return;
    }

    setIsOpening(true);
    window.setTimeout(() => {
      const nextReward = generateReward();
      saveReward(nextReward);
      setReward(nextReward);
      setIsOpening(false);
    }, 980);
  }

  return (
    <main className="app-shell">
      <section className="hero-panel" aria-live="polite">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true" />
          <p>Matcha Latte Ritual</p>
        </div>

        {!hasActiveReward || !reward ? (
          <GiftBox isOpening={isOpening} onOpen={handleOpenGift} />
        ) : (
          <div className="reward-stack">
            <RewardSection reward={reward} onToast={showToast} />
            <AsmrVideoSection onToast={showToast} />
            <SecretMenu onToast={showToast} />
          </div>
        )}
      </section>

      <Toast message={toast} onDone={() => setToast('')} />
    </main>
  );
}

export default App;
