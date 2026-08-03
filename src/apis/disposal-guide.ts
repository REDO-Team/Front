import type { DisposalGuideResponse, GuideImageSearchResponse } from '../types/disposal-guide';
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
