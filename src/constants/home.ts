import type { HomeServiceMenuItem } from '../types/home';

// 홈 화면의 고정 서비스 메뉴입니다.
export const HOME_SERVICE_MENU_ITEMS: HomeServiceMenuItem[] = [
  {
    id: 'disposal-info',
    title: '배출 정보',
    path: '/disposal-info',
    icon: 'trash',
  },
  {
    id: 'disposal-auth',
    title: '배출 인증',
    path: '/certification',
    icon: 'camera',
  },
  {
    id: 'reward-save',
    title: '리워드 적립',
    path: '/reward',
    icon: 'reward',
  },
  {
    id: 'contribution',
    title: '실시간 기여도',
    path: '/my-contribution',
    icon: 'chart',
  },
];
