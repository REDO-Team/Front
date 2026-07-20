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
  nickname: '지구',
};

// 사용자 누적 포인트 카드에 표시할 더미 데이터입니다.
// 실제 포인트 조회 API가 생기면 HomePage에서 이 값을 API 데이터로 교체할 예정입니다.
export const HOME_POINT_SUMMARY: HomePointSummary = {
  totalPoint: 5000,
};

// 홈 화면의 고정 서비스 메뉴입니다.
// 메뉴 이동 기능은 별도 이슈에서 실제 라우트와 연결할 예정입니다.
export const HOME_SERVICE_MENU_ITEMS: HomeServiceMenuItem[] = [
  { id: 'disposal-info', title: '배출 정보', path: '/guide', icon: 'trash' },
  {
    id: 'disposal-auth',
    title: '배출 인증',
    path: '/certification',
    icon: 'camera',
  },
  { id: 'reward-save', title: '리워드 적립', path: '/reward', icon: 'reward' },
  {
    id: 'contribution',
    title: '실시간 기여도',
    path: '/contribution',
    icon: 'chart',
  },
];

// 오늘의 커뮤니티 미리보기 카드에 사용할 더미 게시글입니다.
// 커뮤니티 목록 API가 준비되면 이 배열을 서버 데이터로 바꾸면 됩니다.
export const HOME_COMMUNITY_PREVIEWS: HomeCommunityPreview[] = [
  {
    id: 1,
    category: '환경실천',
    title: '오늘 한강에서 플로깅 했어요!',
    content: '산책하면서 작은 쓰레기부터 주웠더니 뿌듯했어요.',
    author: '리도07',
    createdAtText: '1시간 전',
    commentCount: 5,
  },
];

// 리워드 상점 미리보기 리스트에 사용할 더미 상품입니다.
// 리워드 상품 API 연동 전까지 홈 화면 구조 확인용으로 사용합니다.
export const HOME_REWARD_PREVIEWS: HomeRewardPreview[] = [
  {
    id: 1,
    name: '친환경 수세미 1개입',
    requiredPoint: 1000,
    category: '친환경 제품',
    imageAlt: '친환경 수세미 상품 이미지',
    imageVariant: 'plant',
  },
  {
    id: 2,
    name: '기프티콘 5,000원권',
    requiredPoint: 5000,
    category: '기프티콘',
    imageAlt: '기프티콘 상품 이미지',
    imageVariant: 'gift-card',
  },
];
