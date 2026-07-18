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

export interface RewardShippingAddress {
    id: number;
    name: string;
    address: string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T | null;
}

export interface ShippingAddress {
    shippingAddressId: number;
    addressType: string;
    receiverName: string;
    phone: string;
    postalCode: string;
    address1: string;
    address2: string;
    isDefault: boolean;
}

export interface ShippingAddressListResult {
  shippingAddresses: ShippingAddress[];
}

export type ShippingAddressListResponse =
  ApiResponse<ShippingAddressListResult>;
