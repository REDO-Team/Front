export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T | null;
  errorDetail?: string | null;
}

export type ContributionMilestoneType =
  | 'TOILET_PAPER'
  | 'NOTE'
  | 'GLASS_BOTTLE'
  | 'TRASH_BAG'
  | 'PLASTIC_FLOWER_POT'
  | 'T_SHIRT'
  | 'SNEAKERS'
  | 'BENCH';

export type ContributionMilestoneStatus =
  | 'ACHIEVED'
  | 'IN_PROGRESS'
  | 'LOCKED';

export interface ContributionMilestone {
  type: ContributionMilestoneType;
  name: string;
  requiredCertificationCount: number;
  status: ContributionMilestoneStatus;
}

export interface MyContributionResult {
  nickname: string;
  totalCertificationCount: number;
  summaryMessage: string;
  latestAchievedMilestone: ContributionMilestone | null;
  nextMilestone: ContributionMilestone | null;
  remainingCount: number;
  milestones: ContributionMilestone[];
}

export type ContributionProductType = ContributionMilestoneType;

export type ContributionEventType =
  | 'FIRST_CERTIFICATION'
  | 'DAILY_CERTIFICATION'
  | 'REWARD_PROGRESS';

export interface ContributionFeed {
  feedId: number;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  message: string;
  highlightText: string;
  eventType: ContributionEventType;
  targetName: string;
  remainingCount: number;
  createdAt: string;
}

export interface AllContributionResult {
  totalParticipantCount: number;
  summaryMessage: string;
  feeds: ContributionFeed[];
  nextCursor: number;
  hasNext: boolean;
}

export interface ContributionFeedParams {
  cursor?: number;
  size?: number;
}
