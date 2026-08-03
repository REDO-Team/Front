import type { CommonResponse } from './common';

export type Guides = {
  guideId: number;
  name: string;
  imageKey: string;
  tip: string;
  recycleCategory: string;
  guideSteps: string[];
};

export type DisposalGuideResponse = CommonResponse<Guides>;
