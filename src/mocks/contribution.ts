import type {
  ContributionItem,
  MyContributionData,
} from '../types/contribution';

/**
 * 나의 기여도 도감에 표시할 물품 목록입니다.
 * 현재 화면 예시인 누적 분리수거 인증 3회를 기준으로 달성 상태를 구성했습니다.
 */
export const CONTRIBUTION_ITEMS: ContributionItem[] = [
  {
    id: 'toilet-paper',
    name: '화장지',
    requiredCount: 3,
    isAchieved: true,
    iconKey: 'toilet-paper',
  },
  {
    id: 'note',
    name: '노트',
    requiredCount: 5,
    isAchieved: false,
    iconKey: 'note',
  },
  {
    id: 'glass-bottle',
    name: '물병',
    requiredCount: 7,
    isAchieved: false,
    iconKey: 'glass-bottle',
  },
  {
    id: 'trash-bag',
    name: '봉투',
    requiredCount: 10,
    isAchieved: false,
    iconKey: 'trash-bag',
  },
  {
    id: 'flowerpot',
    name: '화분',
    requiredCount: 15,
    isAchieved: false,
    iconKey: 'flowerpot',
  },
  {
    id: 'clothes',
    name: '의류',
    requiredCount: 30,
    isAchieved: false,
    iconKey: 'clothes',
  },
  {
    id: 'sneakers',
    name: '신발',
    requiredCount: 50,
    isAchieved: false,
    iconKey: 'sneakers',
  },
  {
    id: 'bench',
    name: '벤치',
    requiredCount: 100,
    isAchieved: false,
    iconKey: 'bench',
  },
];

/**
 * 나의 기여도 화면에서 사용할 임시 사용자 기여도 정보입니다.
 * 기여도 API가 연결되면 이 객체를 API 응답 데이터로 교체하면 됩니다.
 */
export const MY_CONTRIBUTION: MyContributionData = {
  nickname: '지구',
  recycleCount: 3,
  achievedItemName: '화장지',
  nextItemName: '노트',
  remainingCount: 2,
  items: CONTRIBUTION_ITEMS,
};
