import { FormEvent, useState } from 'react';
import { GOOGLE_LOGIN_PLACEHOLDER, saveLead, ZALO_OA_DEEPLINK_PLACEHOLDER } from '../services/leadService';
import type { Reward } from '../types';
import { isValidVietnamPhone } from '../utils/phone';

type LeadCaptureFormProps = {
  reward: Reward;
  onSaved: () => void;
};

export function LeadCaptureForm({ reward, onSaved }: LeadCaptureFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zaloId, setZaloId] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Vui lòng nhập tên.');
      return;
    }

    if (!isValidVietnamPhone(phone)) {
      setError('Số điện thoại Việt Nam chưa hợp lệ.');
      return;
    }

    setIsSaving(true);
    try {
      await saveLead({
        name: name.trim(),
        phone: phone.trim(),
        zaloId: zaloId.trim() || undefined,
        voucherCode: reward.voucherCode,
        quote: reward.quote,
        userAgent: navigator.userAgent,
        createdAt: new Date().toISOString(),
      });
      setSaved(true);
      onSaved();
    } catch {
      setError('Chưa lưu được mã. Bạn thử lại nhé.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <label>
        <span>Tên</span>
        <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
      </label>
      <label>
        <span>Số điện thoại</span>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          inputMode="tel"
          autoComplete="tel"
          placeholder="09xxxxxxxx"
        />
      </label>
      <label>
        <span>Zalo ID hoặc link Zalo</span>
        <input value={zaloId} onChange={(event) => setZaloId(event.target.value)} placeholder="Không bắt buộc" />
      </label>

      <div className="placeholder-links" aria-label="Đăng nhập và chatbot placeholder">
        <span>{ZALO_OA_DEEPLINK_PLACEHOLDER}</span>
        <span>{GOOGLE_LOGIN_PLACEHOLDER}</span>
      </div>

      {error && <p className="form-error">{error}</p>}
      {saved && <p className="form-success">Đã lưu mã thành công</p>}

      <button className="primary-button" type="submit" disabled={isSaving}>
        {isSaving ? 'Đang lưu...' : 'Xác nhận lưu mã'}
      </button>
    </form>
  );
}
