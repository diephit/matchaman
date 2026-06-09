export type ShareResult = 'shared' | 'copied';

export async function shareReward(text: string): Promise<ShareResult> {
  const url = window.location.href;
  const title = 'Matcha Latte Gift';

  if (navigator.share) {
    await navigator.share({ title, text, url });
    return 'shared';
  }

  await navigator.clipboard.writeText(`${text} ${url}`);
  return 'copied';
}
