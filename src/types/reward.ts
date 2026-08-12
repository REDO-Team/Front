export type RewardHistoryType = 'EARN' | 'USE';

export type RewardProductType = 'PARTNER_BRAND' | 'COUPON_GIFTICON';

export type RewardFilterType = 'ALL' | RewardProductType;

export type RewardProductStatus = 'ACTIVE' | 'INACTIVE' | 'SOLD_OUT';

export type RewardAddressType = 'HOME' | 'COMPANY' | 'SCHOOL';


export interface RewardSummary {
    nickname: string;
    currentPoint: number;
    monthlyPoint: number;
}

export interface RewardPointResponse {
  totalPoint: number;
  monthlyEarnedPoint: number;
}

export interface RewardProductListParams {
  rewardProductType?: RewardProductType;
  cursor?: number;
  size?: number;
}

export interface RewardProductListItem {
  rewardProductId: number;
  rewardProductType: RewardProductType;
  name: string;
  imageUrl: string;
  pricePoint: number;
  stockQuantity: number;
  status: RewardProductStatus;
}

export interface RewardProductListResult {
  items: RewardProductListItem[];
  nextCursor: number;
  hasNext: boolean;
}

export interface RewardProductPreviewResult {
  items: RewardProductListItem[];
}

export interface RewardProductDetail extends RewardProductListItem {
  description: string;
  usageGuide: string;
  validityDays: number | null;
}

export interface RewardHistory {
  transactionId: number;
  title: string;
  transactionType: RewardHistoryType;
  amount: number;
  certificationId: number;
  rewardRedemptionId: number;
  createdAt: string;  
}

export interface RewardHistoryResult {
  items: RewardHistory[];
  nextCursor: number;
  hasNext: boolean;
}

export interface RewardHistoryParams {
  cursor?: number;
  size?: number;
}



export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T | null;
  errorDetail?: string | null;
}

export interface ShippingAddress {
    shippingAddressId: number;
    addressType: RewardAddressType;
    receiverName: string;
    phone: string;
    postalCode: string;
    address1: string;
    address2: string;
    isDefault: boolean;
}

export interface ShippingAddressRequest {
    addressType: RewardAddressType;
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

export interface AddressCandidates {
  roadAddress: string;
  jibunAddress: string;
  postalCode: string;
  buildingName: string | null;
}

export interface AddressSearchResult {
  addressCandidates: AddressCandidates[];
  page: number;
  size: number;
  totalCount: number;
  hasNext: boolean;
}

export interface AddressSearchResultParams {
  keyword: string;
  page?: number;
  size?: number;
}

export interface RewardPurchaseRequest {
  rewardProductId: number;
  shippingAddressId?: number;
  receiverName?: string;
  receiverPhone?: string;
}

export interface RewardPurchaseResult {
  rewardRedemptionId: number;
  rewardProductId: number;
  productName: string;
  usedPoint: number;
  remainingPoint: number;
}

export type FulfillmentType =
  | 'DELIVERY'
  | 'COUPON';

export type FulfillmentStatus =
  | 'READY'
  | 'SENT'
  | 'COMPLETED';

export interface RewardRedemptionItem {
  rewardRedemptionId: number;
  rewardProductId: number;
  productName: string;
  productImageUrl: string;
  usedPoint: number;
  fulfillmentType: FulfillmentType;
  fulfillmentStatus: FulfillmentStatus;
  redeemedAt: string;
}

export interface RewardRedemptionResult {
  content: RewardRedemptionItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface RewardRedemptionParams {
  cursor?: number;
  size?: number;
}
