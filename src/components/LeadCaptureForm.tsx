import { FormEvent, useRef, useState } from 'react';
import { GOOGLE_LOGIN_PLACEHOLDER, saveLead, ZALO_OA_DEEPLINK_PLACEHOLDER } from '../services/leadService';
import type { Reward } from '../types';
import { isValidVietnamPhone } from '../utils/phone';

type LeadCaptureFormProps = {
  reward: Reward;
  onSaved: () => void;
};

export function LeadCaptureForm({ reward, onSaved }: LeadCaptureFormProps) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
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
      nameRef.current?.focus();
      return;
    }

    if (!isValidVietnamPhone(phone)) {
      setError('Số điện thoại Việt Nam chưa hợp lệ.');
      phoneRef.current?.focus();
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
      <label htmlFor="lead-name">
        <span>Tên</span>
        <input
          ref={nameRef}
          id="lead-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          aria-describedby={error ? 'lead-form-status' : undefined}
          aria-invalid={error === 'Vui lòng nhập tên.'}
        />
      </label>

      <label htmlFor="lead-phone">
        <span>Số điện thoại</span>
        <input
          ref={phoneRef}
          id="lead-phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          inputMode="tel"
          autoComplete="tel"
          placeholder="09xxxxxxxx"
          aria-describedby={error ? 'lead-form-status' : undefined}
          aria-invalid={error === 'Số điện thoại Việt Nam chưa hợp lệ.'}
        />
      </label>

      <label htmlFor="lead-zalo">
        <span>Zalo ID hoặc link Zalo</span>
        <input
          id="lead-zalo"
          value={zaloId}
          onChange={(event) => setZaloId(event.target.value)}
          placeholder="Không bắt buộc"
        />
      </label>

      <div className="placeholder-links" aria-label="Đăng nhập và chatbot placeholder">
        <span>{ZALO_OA_DEEPLINK_PLACEHOLDER}</span>
        <span>{GOOGLE_LOGIN_PLACEHOLDER}</span>
      </div>

      {error && (
        <p className="form-error" id="lead-form-status" role="alert">
          {error}
        </p>
      )}
      {saved && !error && (
        <p className="form-success" id="lead-form-status">
          Đã lưu mã thành công
        </p>
      )}

      <button className="primary-button" type="submit" disabled={isSaving}>
        {isSaving ? 'Đang lưu...' : 'Xác nhận lưu mã'}
      </button>
    </form>
  );
}
