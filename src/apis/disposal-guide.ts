import type { DisposalGuideResponse, GuideFavoriteResponse, GuideImageSearchResponse, GuideTextSearchResponse } from '../types/disposal-guide';
import api from './api';

// 배출 가이드 조회
export const getDisposalGuide = async (name: string): Promise<DisposalGuideResponse> => {
  const response = await api.get(`/api/guides`, {
    params: { name },
  });

  return response.data;
};

// 배출 정보 이미지 검색
export const postGuideImageSearch = async (image: File): Promise<GuideImageSearchResponse> => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await api.post(`/api/guides/search-by-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// 가이드 즐겨찾기 추가
export const postGuideFavorite = async (guideId: number | null): Promise<GuideFavoriteResponse> => {
  const response = await api.post(`/api/guides/${guideId}/favorites`);

  return response.data;
};

// 가이드 텍스트 검색
export const postGuideTextSearch = async (query: string): Promise<GuideTextSearchResponse> => {
  const response = await api.post(`/api/guides/search-by-text`, { query });

  return response.data;
};
