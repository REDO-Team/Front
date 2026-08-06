import type { CommonResponse } from './common';

type Policy = {
  cooldownSeconds: number;
  sameGuideDailyLimit: number;
  liveCaptureOnly: boolean;
};

type RewardPolicy = {
  generalCertificationPoint: number;
  afterSearchCertificationPoint: number;
};

// 인증 홈
export type CertificationRuleResponse = CommonResponse<{
  dailyLimit: number;
  remainingCount: number;
  usedCount: number;
  canCertify: boolean;
  restriction: {
    type: 'NONE' | 'DAILY_LIMIT_EXCEEDED' | 'COOLDOWN' | 'PROCESSING_EXISTS';
    retryAvailableAt: Date;
    remainingSeconds: number;
    processingCertificationId: number;
    statusPath: string;
  };
  policy: Policy;
  rewardPolicy: RewardPolicy;
}>;

// 신규 인증
export type CertificationResponse = CommonResponse<{
  certificationId: number;
  status: string;
  failureType: string | undefined;
  recycleGuideId: number;
  itemName: string;
  categoryName: string;
  earnedPoint: number;
  failedReason: string;
  retryGuide: string[];
  retryAllowed: boolean;
  retryPath: string;
  judgedAt: Date;
}>;

export type CertificationRequest = {
  image: File;
  certificationSource: 'GENERAL' | 'AFTER_SEARCH';
  recycleGuideId: number | null;
};

// 인증 재시도
export type CertificationRetryResponse = CommonResponse<{
  certificationId: number;
  status: string;
  failureType: string;
  attemptCount: number;
  recycleGuideId: number;
  itemName: string;
  categoryName: string;
  earnedPoint: number;
  failedReason: string;
  retryGuide: string[];
  retryAllowed: boolean;
  retryPath: string;
  judgedAt: Date;
}>;
