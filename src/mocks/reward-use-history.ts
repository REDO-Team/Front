export type RewardUseStatus =
  | 'SHIPPING'
  | 'DELIVERED'
  | 'COMPLETED';

export interface RewardUseHistoryItem {
  id: number;
  productName: string;
  imageVariant: 'plant' | 'gift-card';
  usedPoint: number;
  exchangedAt: string;
  status: RewardUseStatus;
}

export const MOCK_REWARD_USE_HISTORY: RewardUseHistoryItem[] = [
  {
    id: 1,
    productName: '친환경 수세미 1개입',
    imageVariant: 'plant',
    usedPoint: 1000,
    exchangedAt: '06.24 03:30',
    status: 'SHIPPING',
  },
  {
    id: 2,
    productName: '친환경 수세미 1개입',
    imageVariant: 'plant',
    usedPoint: 1000,
    exchangedAt: '06.22 03:30',
    status: 'DELIVERED',
  },
  {
    id: 3,
    productName: '기프티콘 5,000원권',
    imageVariant: 'gift-card',
    usedPoint: 5000,
    exchangedAt: '06.20 03:30',
    status: 'COMPLETED',
  },
];