import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = '/assets/asmr-matcha.mp4';
const PLACEHOLDER_SRC = '/assets/asmr-placeholder.svg';

type AsmrVideoSectionProps = {
  onToast: (message: string) => void;
};

export function AsmrVideoSection({ onToast }: AsmrVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch(VIDEO_SRC, { method: 'HEAD' })
      .then((response) => {
        if (isMounted && response.ok) {
          setHasVideo(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasVideo(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function toggleSound() {
    const video = videoRef.current;
    if (!video || !hasVideo) {
      onToast('Video ASMR thật sẽ được thêm vào /public/assets/asmr-matcha.mp4');
      return;
    }

    try {
      video.muted = soundOn;
      await video.play();
      setSoundOn(!soundOn);
    } catch {
      onToast('Chạm lại để trình duyệt cho phát video');
    }
  }

  return (
    <section className="asmr-section" aria-label="Video ASMR matcha">
      <div className="section-heading">
        <p className="eyebrow">ASMR Matcha</p>
        <h2>Nghe tiếng đá chạm ly, nhìn lớp xanh tan chậm</h2>
      </div>

      <div className="video-frame">
        {hasVideo ? (
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={PLACEHOLDER_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setHasVideo(false)}
          />
        ) : (
          <div className="video-placeholder" role="img" aria-label="Placeholder cho video ASMR matcha">
            <img src={PLACEHOLDER_SRC} alt="" loading="lazy" />
            <span className="steam one" />
            <span className="steam two" />
            <span className="steam three" />
          </div>
        )}
        <button className="sound-toggle" type="button" onClick={toggleSound} aria-pressed={soundOn}>
          {soundOn ? 'Tắt âm thanh' : 'Bật âm thanh ASMR'}
        </button>
      </div>
    </section>
  );
}
