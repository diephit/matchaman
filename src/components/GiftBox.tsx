import type { CSSProperties } from 'react';

type GiftBoxProps = {
  isOpening: boolean;
  onOpen: () => void;
};

const confettiPieces = Array.from({ length: 20 }, (_, index) => index);

export function GiftBox({ isOpening, onOpen }: GiftBoxProps) {
  return (
    <div className={`gift-stage ${isOpening ? 'is-opening' : ''}`}>
      <div className="gift-copy">
        <p className="eyebrow">Quét QR, mở quà xanh</p>
        <h1>Chạm để nhận một tín hiệu dịu lành</h1>
        <p className="intro">Một quote tarot nhỏ, một mã ưu đãi, và một secret menu đang chờ bạn.</p>
      </div>

      <button className="gift-button" type="button" onPointerUp={onOpen} aria-label="Mở hộp quà matcha">
        <span className="gift-light" aria-hidden="true" />
        <span className="gift-lid" aria-hidden="true">
          <span className="gift-bow" />
        </span>
        <span className="gift-body" aria-hidden="true">
          <span className="gift-ribbon vertical" />
          <span className="gift-ribbon horizontal" />
        </span>
        <span className="tap-hint">Tap để mở</span>
      </button>

      <div className="confetti-field" aria-hidden="true">
        {confettiPieces.map((piece) => (
          <span key={piece} style={{ '--piece': piece } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}
