import type { SecretMenuItem } from '../types';

export const secretMenu: SecretMenuItem[] = [
  {
    id: 'salted-vanilla',
    name: 'Matcha Kem Muối Vani',
    description: 'Mặn nhẹ, thơm vani, lớp kem mềm làm matcha đậm hơn.',
    tags: ['mặn ngọt', 'kem mịn'],
  },
  {
    id: 'coconut',
    name: 'Matcha Sữa Dừa',
    description: 'Béo thanh, mát và hợp những ngày cần một chút nhiệt đới.',
    tags: ['béo thơm', 'dịu mát'],
  },
  {
    id: 'honey',
    name: 'Matcha Latte Mật Ong',
    description: 'Ngọt tự nhiên, ấm cổ họng, hậu vị xanh rất mềm.',
    tags: ['mật ong', 'healing'],
  },
  {
    id: 'dirty-espresso',
    name: 'Dirty Matcha Espresso',
    description: 'Tầng espresso đánh thức nền matcha béo, đậm và tỉnh táo.',
    tags: ['đậm vị', 'caffeine'],
  },
];
