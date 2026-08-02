import api from './api';
import type {
  ApiResponse,
  RewardPointResponse,
  RewardProductDetail,
  RewardProductListParams,
  RewardProductListResult,
  RewardHistoryResult,
  RewardHistoryParams,
  ShippingAddress,
  ShippingAddressListResult,
  AddressSearchResult,
  AddressSearchResultParams,
  ShippingAddressRequest,
} from '../types/reward';

export const getRewardPoints = async (): Promise<RewardPointResponse> => {
  const response = await api.get<ApiResponse<RewardPointResponse>>(
    '/api/rewards/points',
  );

  if (!response.data.result) {
    throw new Error('포인트 조회 결과가 없습니다.');
  }

  return response.data.result;
};

export const getRewardProducts = async (
  params?: RewardProductListParams,
): Promise<RewardProductListResult> => {
  const response = await api.get<ApiResponse<RewardProductListResult>>(
    '/api/rewards/products',
    { params },
  );

  if (!response.data.result) {
    throw new Error('리워드 상품 목록 조회 결과가 없습니다.');
  }

  return response.data.result;
};

export const getRewardProductDetail = async (
  rewardProductId: number,
): Promise<RewardProductDetail> => {
  const response = await api.get<ApiResponse<RewardProductDetail>>(
    `/api/rewards/products/${rewardProductId}`,
  );

  if (!response.data.result) {
    throw new Error('리워드 상품 상세 조회 결과가 없습니다.');
  }

  return response.data.result;
};

export const getRewardHistory = async (
  params?: RewardHistoryParams,
): Promise<RewardHistoryResult> => {
  const response = await api.get<ApiResponse<RewardHistoryResult>>(
    '/api/rewards/points/transactions',
    { params },
  );

  if (!response.data.result) {
    throw new Error('리워드 내역 조회 결과가 없습니다.');
  }

  return response.data.result;
};

export const getRewardAddressList = async (): Promise<ShippingAddress[]> => {
  const response = await api.get<ApiResponse<ShippingAddressListResult>>(
    '/api/shipping-addresses',
  );

  if (!response.data.result) {
    throw new Error('배송지 목록 조회 결과가 없습니다.');
  }

  return response.data.result.shippingAddresses;
};

export const getRewardAddressSearchResult = async (
  params: AddressSearchResultParams,
): Promise<AddressSearchResult> => {
  const response = await api.get<ApiResponse<AddressSearchResult>>(
    '/api/shipping-addresses/search',
    { params },
  );

  if (!response.data.result) {
    throw new Error('배송지 검색 결과가 없습니다.');
  }

  return response.data.result;
};

export const createRewardAddress = async (
  request: ShippingAddressRequest
): Promise<ShippingAddress> => {
  const response = await api.post<ApiResponse<ShippingAddress>>(
    '/api/shipping-addresses',
    request
  );

  if (!response.data.result) {
    throw new Error('배송지 생성 결과가 없습니다.');
  }

  return response.data.result;
};

export const deleteRewardAddress = async (
  shippingAddressId: number,
): Promise<void> => {
  await api.delete(`/api/shipping-addresses/${shippingAddressId}`);
};

export const editRewardAddress = async (
  shippingAddressId: number,
  request: ShippingAddressRequest,
): Promise<ShippingAddress> => {
  const response = await api.patch<ApiResponse<ShippingAddress>>(
    `/api/shipping-addresses/${shippingAddressId}`,
    request,
  );

  if (!response.data.result) {
    throw new Error('배송지 수정 결과가 없습니다.');
  }

  return response.data.result;
};
