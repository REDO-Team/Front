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
