import { useState } from 'react';
import { vouchers } from '../data/vouchers';
import type { Reward } from '../types';
import { shareReward } from '../utils/share';
import { LeadCaptureForm } from './LeadCaptureForm';

type RewardSectionProps = {
  reward: Reward;
  onToast: (message: string) => void;
};

export function RewardSection({ reward, onToast }: RewardSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [shareBoosted, setShareBoosted] = useState(false);
  const voucher = vouchers.find((item) => item.code === reward.voucherCode) ?? vouchers[0];

  async function handleShare() {
    try {
      const result = await shareReward(`Mình vừa mở quà Matcha Latte: ${reward.voucherCode}`);
      setShareBoosted(true);
      onToast(result === 'shared' ? 'Đã mở bảng chia sẻ' : 'Đã sao chép liên kết');
    } catch {
      onToast('Chưa thể chia sẻ lúc này');
    }
  }

  return (
    <section className="reward-section" aria-label="Phần thưởng của bạn">
      <p className="eyebrow">Phần thưởng hôm nay</p>
      <div className="quote-card">
        <span className="quote-mark" aria-hidden="true">
          “
        </span>
        <p>{reward.quote}</p>
      </div>

      <div className="voucher-card">
        <div>
          <p className="voucher-label">{voucher.label}</p>
          <h2>{voucher.code}</h2>
          <p>{voucher.detail}</p>
        </div>
        {shareBoosted && <span className="boost-badge">X2 ưu đãi đã kích hoạt</span>}
      </div>

      <div className="action-row">
        <button className="primary-button" type="button" onClick={() => setShowForm(true)}>
          Lưu mã giảm giá
        </button>
        <button className="secondary-button" type="button" onClick={handleShare}>
          Chia sẻ lên Story nhận X2
        </button>
      </div>

      {showForm && <LeadCaptureForm reward={reward} onSaved={() => onToast('Đã lưu mã thành công')} />}
    </section>
  );
}
