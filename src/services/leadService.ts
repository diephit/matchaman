import type { LeadPayload } from '../types';

export const ZALO_OA_DEEPLINK_PLACEHOLDER = 'ZALO_OA_DEEPLINK_PLACEHOLDER';
export const GOOGLE_LOGIN_PLACEHOLDER = 'GOOGLE_LOGIN_PLACEHOLDER';

const LEADS_KEY = 'matchaman.leads.v1';

export async function saveLead(payload: LeadPayload): Promise<{ ok: true }> {
  // TODO: Replace this mock with POST /api/leads when the real backend is ready.
  const current = window.localStorage.getItem(LEADS_KEY);
  const leads = current ? (JSON.parse(current) as LeadPayload[]) : [];
  leads.push(payload);
  window.localStorage.setItem(LEADS_KEY, JSON.stringify(leads));

  await new Promise((resolve) => window.setTimeout(resolve, 350));
  return { ok: true };
}
