/**
 * 나의 기여도 화면에서 물품 하나를 표현할 때 사용하는 타입입니다.
 * iconKey는 실제 아이콘을 연결하기 전까지 사용할 아이콘 식별자입니다.
 */
export interface ContributionItem {
  id: string;
  name: string;
  requiredCount: number;
  isAchieved: boolean;
  iconKey: string;
}

/**
 * 나의 기여도 화면에 필요한 사용자 진행 정보를 표현하는 타입입니다.
 * 첫 물품 달성 전이나 모든 물품 달성 후의 상태는 null로 표현합니다.
 */
export interface MyContributionData {
  nickname: string;
  recycleCount: number;
  achievedItemName: string | null;
  nextItemName: string | null;
  remainingCount: number | null;
  items: ContributionItem[];
}

export type ContributionActivityType =
  | 'PRODUCT_IN_PROGRESS'
  | 'PRODUCT_REMAINING'
  | 'RECYCLING_COMPLETED'
  | 'FIRST_RECYCLING';

export type ContributionProductType =
  | 'TOILET_PAPER'
  | 'NOTE'
  | 'BOTTLE'
  | 'BAG'
  | 'FLOWERPOT'
  | 'CLOTHES'
  | 'SNEAKERS'
  | 'BENCH';

/** 전체 기여도 화면에 표시할 사용자 활동 한 건을 표현합니다. */
export interface ContributionActivity {
  id: number;
  type: ContributionActivityType;
  nickname: string;
  productType?: ContributionProductType;
  productName?: string;
  remainingCount?: number;
  recyclingCount?: number;
}
