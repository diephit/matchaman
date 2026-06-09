export type Voucher = {
  code: string;
  label: string;
  detail: string;
};

export type Reward = {
  voucherCode: string;
  quote: string;
  claimedAt: number;
  expiresAt: number;
};

export type LeadPayload = {
  name: string;
  phone: string;
  zaloId?: string;
  voucherCode: string;
  quote: string;
  userAgent: string;
  createdAt: string;
};

export type SecretMenuItem = {
  id: string;
  name: string;
  description: string;
  tags: string[];
};
