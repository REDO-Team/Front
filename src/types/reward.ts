export type RewardHistoryType = 'EARN' | 'USE';

export type RewardProductType = 'PARTNER' | 'GIFTICON';

export type RewardFilterType = 'ALL' | RewardProductType;

export interface RewardSummary {
    nickname: string;
    currentPoint: number;
    monthlyPoint: number;
}

export interface RewardHistory {
    id: number;
    title: string;
    type: RewardHistoryType;
    point: number;
    createdAt: string;
}

export interface RewardProduct {
    id: number;
    name: string;
    type: RewardProductType;
    point: number;
    description?: string;
    usageGuide?: string;
    validityPeriod?: string;
}
