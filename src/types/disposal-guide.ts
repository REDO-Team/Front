import type { CommonResponse } from './common';

export type Guides = {
  guideId: number | null;
  name: string;
  imageKey: string;
  tip: string;
  recycleCategory: string;
  guideSteps: string[];
};

// 배출 가이드 조회
export type DisposalGuideResponse = CommonResponse<Guides>;

// 가이드 이미지 검색
export type GuideImageSearchResponse = CommonResponse<{
  reason: string;
  guideDetail: Guides;
  identified: boolean;
}>;

// 가이드 즐겨찾기 추가
export type GuideFavoriteResponse = CommonResponse<{
  favoriteId: number;
  guideId: number;
}>;

// 가이드 텍스트 검색
export type GuideTextSearchResponse = CommonResponse<{
  reason: string;
  guideDetail: Guides;
  identified: boolean;
}>;
