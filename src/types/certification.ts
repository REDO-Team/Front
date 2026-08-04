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
