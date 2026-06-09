import { useEffect } from 'react';

type ToastProps = {
  message: string;
  onDone: () => void;
};

export function Toast({ message, onDone }: ToastProps) {
  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = window.setTimeout(onDone, 2800);
    return () => window.clearTimeout(timer);
  }, [message, onDone]);

  return (
    <div className={`toast ${message ? 'is-visible' : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
