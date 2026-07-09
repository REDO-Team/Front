import type {
  HomeCommunityPreview,
  HomePointSummary,
  HomeRewardPreview,
  HomeServiceMenuItem,
  HomeUser,
} from '../types/home';

// 홈 상단 인사말 영역에서 사용할 임시 사용자 정보입니다.
// 나중에 로그인 사용자 API가 연결되면 이 객체 대신 API 응답 데이터를 사용하면 됩니다.
export const HOME_USER: HomeUser = {
  nickname: '리두',
};

// 사용자 누적 포인트 카드에 표시할 더미 데이터입니다.
// 실제 포인트 조회 API가 생기면 HomePage에서 이 값을 API 데이터로 교체할 예정입니다.
export const HOME_POINT_SUMMARY: HomePointSummary = {
  totalPoint: 12800,
};

// 홈 화면의 고정 서비스 메뉴입니다.
// 메뉴 이동 기능은 별도 이슈에서 실제 라우트와 연결할 예정입니다.
export const HOME_SERVICE_MENU_ITEMS: HomeServiceMenuItem[] = [
  { id: 'disposal-info', title: '배출 정보', path: '/guide' },
  { id: 'disposal-auth', title: '배출 인증', path: '/certification' },
  { id: 'reward-save', title: '리워드 적립', path: '/reward' },
  { id: 'contribution', title: '실시간 기여도', path: '/contribution' },
];

// 오늘의 커뮤니티 미리보기 카드에 사용할 더미 게시글입니다.
// 커뮤니티 목록 API가 준비되면 이 배열을 서버 데이터로 바꾸면 됩니다.
export const HOME_COMMUNITY_PREVIEWS: HomeCommunityPreview[] = [
  {
    id: 1,
    title: '페트병 라벨은 어디까지 떼야 할까요?',
    content: '오늘 헷갈렸던 분리배출 방법을 같이 확인해봐요.',
    commentCount: 8,
  },
  {
    id: 2,
    title: '우리 동네 투명 페트병 수거일 공유',
    content: '지역마다 다른 수거일 정보를 댓글로 모아보고 있어요.',
    commentCount: 5,
  },
];

// 리워드 상점 미리보기 리스트에 사용할 더미 상품입니다.
// 리워드 상품 API 연동 전까지 홈 화면 구조 확인용으로 사용합니다.
export const HOME_REWARD_PREVIEWS: HomeRewardPreview[] = [
  {
    id: 1,
    name: '친환경 텀블러 할인권',
    requiredPoint: 5000,
    category: '쿠폰',
  },
  {
    id: 2,
    name: '재생지 노트',
    requiredPoint: 3200,
    category: '굿즈',
  },
  {
    id: 3,
    name: '제로웨이스트 샵 쿠폰',
    requiredPoint: 7000,
    category: '쿠폰',
  },
];
